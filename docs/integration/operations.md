---
sidebar_position: 6
title: "Operations"
description: "End-to-end conversion and payout operations on the Fiatsend API, including quoting, conversion, mobile money transfer, and transaction tracking."
---

# Operations

Operations are the core of the Fiatsend API — they cover the end-to-end flow of converting stablecoins to local currency and disbursing funds to mobile money wallets. This page walks through each step: fetching a quote, executing a conversion, initiating a payout, and tracking the transaction to completion.

## End-to-End Flow

Every payout follows this sequence:

```
Quote  →  Convert  →  Payout  →  Confirm
  │          │          │          │
  │          │          │          └─ Verify final status (webhook or poll)
  │          │          └─ Send GHS to mobile money beneficiary
  │          └─ Swap stablecoin to GHS via smart contract
  └─ Fetch indicative rate and fees
```

1. **Quote** — Get the current exchange rate and fee breakdown for a stablecoin-to-GHS conversion.
2. **Convert** — Execute the on-chain conversion through the FiatsendGatewayV2 smart contract on Lisk Mainnet.
3. **Payout** — Disburse the converted GHS to a verified [beneficiary's](/docs/integration/beneficiaries) mobile money wallet.
4. **Confirm** — Verify the transaction reached a terminal state (`completed` or `failed`) via [webhooks](/docs/integration/webhooks) or polling.

:::info
Steps 2 and 3 can be combined into a single API call using the transfer endpoint, which handles conversion and payout atomically. The separated flow is available for use cases where you need to convert and hold GHS before deciding on the payout.
:::

## Transaction Statuses

All conversion and payout operations go through the following statuses:

| Status | Description |
|---|---|
| `pending` | Transaction created but not yet processed |
| `processing` | Conversion or payout is in progress |
| `completed` | Transaction finished successfully — funds delivered |
| `failed` | Transaction failed — see `failureReason` for details |

---

## Quote & Convert

### Get Conversion Rate

Fetch the current indicative exchange rate and fee breakdown for a stablecoin-to-GHS conversion. Rates are indicative and may change slightly between the quote and the actual conversion.

**`GET /api/convert/rate`**

#### cURL Example

```bash
curl "https://api.fiatsend.com/api/convert/rate?from=USDT&to=GHS&amount=100" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### JavaScript (fetch) Example

```javascript
const params = new URLSearchParams({
  from: "USDT",
  to: "GHS",
  amount: "100",
});

const response = await fetch(
  `https://api.fiatsend.com/api/convert/rate?${params}`,
  {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  }
);

const result = await response.json();
console.log("Rate:", result.data.rate);
console.log("You receive:", result.data.receiveAmount, result.data.to);
console.log("Fee:", result.data.fee);
```

#### Query Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `from` | string | Yes | Source stablecoin: `USDT`, `USDC`, `USDC_E`, `DAI`, `GHSFIAT` |
| `to` | string | Yes | Target currency: `GHS` |
| `amount` | string | Yes | Amount of the source stablecoin to convert |

#### Response

```json
{
  "status": 1,
  "code": "success",
  "message": "Rate retrieved",
  "data": {
    "from": "USDT",
    "to": "GHS",
    "amount": "100.00",
    "rate": "14.85",
    "fee": "1.50",
    "feePercent": "1.5",
    "receiveAmount": "1483.50",
    "expiresAt": "2026-03-17T08:35:00Z",
    "quoteId": "quote_abc123"
  }
}
```

:::note
The `quoteId` is valid for 5 minutes (see `expiresAt`). Use this `quoteId` when initiating the conversion to lock in the quoted rate. If the quote expires, fetch a new one.
:::

---

### Initiate Conversion

Execute a stablecoin-to-GHS conversion using a valid quote. This triggers an on-chain transaction through the FiatsendGatewayV2 smart contract on Lisk Mainnet.

**`POST /api/convert/usdt-to-ghs`**

#### cURL Example

```bash
curl -X POST https://api.fiatsend.com/api/convert/usdt-to-ghs \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -H "X-Idempotency-Key: 550e8400-e29b-41d4-a716-446655440000" \
  -d '{
    "quoteId": "quote_abc123",
    "amount": "100.00",
    "from": "USDT"
  }'
```

#### JavaScript (fetch) Example

```javascript
const response = await fetch("https://api.fiatsend.com/api/convert/usdt-to-ghs", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
    "X-Idempotency-Key": crypto.randomUUID(),
  },
  body: JSON.stringify({
    quoteId: "quote_abc123",
    amount: "100.00",
    from: "USDT",
  }),
});

const result = await response.json();
console.log("Conversion ID:", result.data.conversionId);
console.log("Status:", result.data.status);
```

#### Request Body

| Field | Type | Required | Description |
|---|---|---|---|
| `quoteId` | string | Yes | Quote ID from the rate endpoint |
| `amount` | string | Yes | Amount of stablecoin to convert (must match the quote) |
| `from` | string | Yes | Source stablecoin (`USDT`, `USDC`, `USDC_E`, `DAI`) |

#### Response

```json
{
  "status": 1,
  "code": "success",
  "message": "Conversion initiated",
  "data": {
    "conversionId": "conv_xyz789",
    "from": "USDT",
    "to": "GHS",
    "amount": "100.00",
    "rate": "14.85",
    "fee": "1.50",
    "receiveAmount": "1483.50",
    "status": "processing",
    "txHash": "0xabc123def456789...",
    "createdAt": "2026-03-17T08:31:00Z"
  }
}
```

:::warning
Always use an [idempotency key](/docs/integration/idempotency) for conversion requests. This prevents duplicate conversions if your request is retried due to network issues or timeouts.
:::

---

### Confirm Conversion

After initiating a conversion, confirm it to finalize the on-chain transaction. This step exists as a safeguard — it gives the integrator a chance to abort if something went wrong between initiation and confirmation.

**`POST /api/convert/confirm`**

#### cURL Example

```bash
curl -X POST https://api.fiatsend.com/api/convert/confirm \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "conversionId": "conv_xyz789"
  }'
```

#### JavaScript (fetch) Example

```javascript
const response = await fetch("https://api.fiatsend.com/api/convert/confirm", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    conversionId: "conv_xyz789",
  }),
});

const result = await response.json();
console.log("Confirmed:", result.data.status);
```

#### Response

```json
{
  "status": 1,
  "code": "success",
  "message": "Conversion confirmed",
  "data": {
    "conversionId": "conv_xyz789",
    "status": "completed",
    "ghsBalance": "1483.50",
    "confirmedAt": "2026-03-17T08:31:15Z"
  }
}
```

---

## Payout

### Send to Mobile Money

Initiate a payout to a verified [beneficiary's](/docs/integration/beneficiaries) mobile money wallet. The payout is funded from your converted GHS balance.

**`POST /api/mobile-money/transfer`**

#### cURL Example

```bash
curl -X POST https://api.fiatsend.com/api/mobile-money/transfer \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -H "X-Idempotency-Key: 7c9e6679-7425-40de-944b-e07fc1f90ae7" \
  -d '{
    "beneficiaryId": "ben_mtn_abc123",
    "amount": "100.00",
    "currency": "GHS",
    "reference": "invoice-2026-001"
  }'
```

#### JavaScript (fetch) Example

```javascript
const response = await fetch("https://api.fiatsend.com/api/mobile-money/transfer", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
    "X-Idempotency-Key": crypto.randomUUID(),
  },
  body: JSON.stringify({
    beneficiaryId: "ben_mtn_abc123",
    amount: "100.00",
    currency: "GHS",
    reference: "invoice-2026-001",
  }),
});

const result = await response.json();
console.log("Payout ID:", result.data.transactionId);
console.log("Status:", result.data.status);
```

#### Request Body

| Field | Type | Required | Description |
|---|---|---|---|
| `beneficiaryId` | string | Yes | ID of the verified beneficiary |
| `amount` | string | Yes | Payout amount in local currency |
| `currency` | string | Yes | Payout currency code (e.g., `GHS`) |
| `reference` | string | No | Your internal reference for this payout (max 100 characters) |

#### Response

```json
{
  "status": 1,
  "code": "success",
  "message": "Payout initiated",
  "data": {
    "transactionId": "tx_payout_def456",
    "beneficiaryId": "ben_mtn_abc123",
    "provider": "MTN",
    "phone": "+233241234567",
    "amount": "100.00",
    "currency": "GHS",
    "fee": "0.50",
    "status": "processing",
    "reference": "invoice-2026-001",
    "createdAt": "2026-03-17T08:32:00Z",
    "estimatedArrival": "1-5 minutes"
  }
}
```

:::tip
Mobile money payouts to MTN Mobile Money, Telecel Cash, and AirtelTigo in Ghana typically arrive within **1–5 minutes**. The recipient receives an SMS confirmation from their mobile money provider.
:::

:::warning
Always use an [idempotency key](/docs/integration/idempotency) for payout requests. A duplicate payout to a beneficiary cannot be reversed automatically.
:::

---

## Transaction Tracking

### List Transactions

Retrieve a paginated list of all transactions (conversions and payouts) for the authenticated user. Supports [cursor-based pagination](/docs/integration/pagination).

**`GET /api/transactions`**

#### cURL Example

```bash
curl "https://api.fiatsend.com/api/transactions?limit=10&order=desc" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### JavaScript (fetch) Example

```javascript
const params = new URLSearchParams({
  limit: "10",
  order: "desc",
});

const response = await fetch(
  `https://api.fiatsend.com/api/transactions?${params}`,
  {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  }
);

const result = await response.json();

for (const tx of result.data) {
  console.log(`${tx.transactionId} — ${tx.type} — ${tx.status} — ${tx.amount} ${tx.currency}`);
}

if (result.pagination.hasMore) {
  console.log("Next cursor:", result.pagination.cursor);
}
```

#### Query Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `limit` | integer | `20` | Results per page (max 100) |
| `cursor` | string | — | Pagination cursor from a previous response |
| `order` | string | `desc` | Sort order: `asc` or `desc` by creation date |
| `type` | string | — | Filter by type: `conversion`, `payout` |
| `status` | string | — | Filter by status: `pending`, `processing`, `completed`, `failed` |

#### Response

```json
{
  "status": 1,
  "code": "success",
  "message": "Transactions retrieved",
  "data": [
    {
      "transactionId": "tx_payout_def456",
      "type": "payout",
      "status": "completed",
      "amount": "100.00",
      "currency": "GHS",
      "fee": "0.50",
      "beneficiaryId": "ben_mtn_abc123",
      "provider": "MTN",
      "phone": "+233241234567",
      "reference": "invoice-2026-001",
      "createdAt": "2026-03-17T08:32:00Z",
      "completedAt": "2026-03-17T08:34:30Z"
    },
    {
      "transactionId": "conv_xyz789",
      "type": "conversion",
      "status": "completed",
      "amount": "100.00",
      "from": "USDT",
      "to": "GHS",
      "rate": "14.85",
      "fee": "1.50",
      "receiveAmount": "1483.50",
      "txHash": "0xabc123def456789...",
      "createdAt": "2026-03-17T08:31:00Z",
      "completedAt": "2026-03-17T08:31:15Z"
    }
  ],
  "pagination": {
    "cursor": "eyJpZCI6ImNvbnZfeHl6Nzg5In0",
    "hasMore": true,
    "total": 47
  }
}
```

---

### Get Transaction Detail

Retrieve full details for a single transaction by ID.

**`GET /api/transactions/:id`**

#### cURL Example

```bash
curl https://api.fiatsend.com/api/transactions/tx_payout_def456 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### JavaScript (fetch) Example

```javascript
const transactionId = "tx_payout_def456";

const response = await fetch(
  `https://api.fiatsend.com/api/transactions/${transactionId}`,
  {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  }
);

const result = await response.json();
console.log("Transaction:", result.data);
console.log("Status:", result.data.status);
```

#### Response — Completed Payout

```json
{
  "status": 1,
  "code": "success",
  "message": "Transaction retrieved",
  "data": {
    "transactionId": "tx_payout_def456",
    "type": "payout",
    "status": "completed",
    "amount": "100.00",
    "currency": "GHS",
    "fee": "0.50",
    "beneficiaryId": "ben_mtn_abc123",
    "provider": "MTN",
    "providerName": "MTN Mobile Money",
    "phone": "+233241234567",
    "accountName": "Kwame Asante",
    "reference": "invoice-2026-001",
    "providerReference": "FT26077ABCDE",
    "createdAt": "2026-03-17T08:32:00Z",
    "processingAt": "2026-03-17T08:32:05Z",
    "completedAt": "2026-03-17T08:34:30Z",
    "failureReason": null
  }
}
```

#### Response — Failed Payout

```json
{
  "status": 1,
  "code": "success",
  "message": "Transaction retrieved",
  "data": {
    "transactionId": "tx_payout_ghi012",
    "type": "payout",
    "status": "failed",
    "amount": "500.00",
    "currency": "GHS",
    "fee": "0.50",
    "beneficiaryId": "ben_mtn_abc123",
    "provider": "MTN",
    "providerName": "MTN Mobile Money",
    "phone": "+233241234567",
    "accountName": "Kwame Asante",
    "reference": "invoice-2026-002",
    "providerReference": null,
    "createdAt": "2026-03-17T09:00:00Z",
    "processingAt": "2026-03-17T09:00:05Z",
    "completedAt": null,
    "failureReason": "Provider timeout — mobile money network unreachable. Funds have been returned to your GHS balance."
  }
}
```

:::note
When a payout fails, the funds are automatically returned to your GHS balance. The `failureReason` field explains what went wrong. Common reasons include provider timeouts, invalid accounts (if the account was deactivated after verification), and daily limits exceeded on the recipient's mobile money account.
:::

## Recommended Integration Pattern

For production integrations, use webhooks rather than polling to track transaction status:

1. **Initiate** the conversion and payout with an [idempotency key](/docs/integration/idempotency).
2. **Store** the `transactionId` in your database with status `processing`.
3. **Listen** for `payout.completed` or `payout.failed` [webhook events](/docs/integration/webhooks).
4. **Update** your internal records based on the webhook payload.
5. **Fall back** to the GET transaction endpoint only if you miss a webhook or need to reconcile.

```javascript
// Example: Initiate payout and track via webhook
const idempotencyKey = crypto.randomUUID();

// Step 1: Initiate payout
const payoutResponse = await fetch("https://api.fiatsend.com/api/mobile-money/transfer", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
    "X-Idempotency-Key": idempotencyKey,
  },
  body: JSON.stringify({
    beneficiaryId: "ben_mtn_abc123",
    amount: "100.00",
    currency: "GHS",
    reference: "invoice-2026-001",
  }),
});

const payout = await payoutResponse.json();

// Step 2: Store in your database
await db.transactions.create({
  fiatsendTxId: payout.data.transactionId,
  idempotencyKey,
  status: "processing",
  amount: "100.00",
  beneficiaryId: "ben_mtn_abc123",
});

// Step 3: Handle webhook (in your webhook handler)
// See Webhooks page for full implementation
```

## Related Pages

- [Start Here](/docs/integration/start-here) — Quickstart guide with end-to-end example
- [Beneficiaries](/docs/integration/beneficiaries) — Create and verify payout recipients
- [Webhooks](/docs/integration/webhooks) — Receive async status updates
- [Idempotency](/docs/integration/idempotency) — Prevent duplicate transactions
- [Fees & Limits](/docs/platform/fees-and-limits) — Conversion fees and transaction limits
- [Errors & Rate Limits](/docs/integration/errors-rate-limits) — Error codes and rate limiting
