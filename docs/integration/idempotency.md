---
sidebar_position: 9
title: "Idempotency"
description: "Prevent duplicate payments and conversions with idempotency keys on the Fiatsend API."
---

# Idempotency

Idempotency is a critical safety mechanism for payment APIs. It ensures that if the same request is submitted more than once — whether due to a network timeout, client retry, or any other reason — the operation is only executed once. Without idempotency, a retried payout request could result in the recipient receiving double the intended amount.

Fiatsend supports idempotency keys on all payment-critical POST endpoints.

## How It Works

When you include an `X-Idempotency-Key` header in a POST request, Fiatsend stores the request body and response associated with that key. If a second request arrives with the same idempotency key:

1. Fiatsend compares the new request body to the original request body.
2. If they match, the **original response** is returned immediately — no new transaction is created.
3. If they differ, a `409 Conflict` error is returned (see [idempotency conflict](#idempotency-conflicts)).

```
First request (key: abc-123)     →  Processes normally  →  Returns result
Second request (key: abc-123)    →  Key found, body matches  →  Returns cached result (no duplicate)
Third request (key: abc-123, different body)  →  Key found, body differs  →  Returns 409 Conflict
```

## Header Format

| Header | Value | Description |
|---|---|---|
| `X-Idempotency-Key` | UUID v4 string | Unique identifier for this operation |

### Key Requirements

- **Format**: UUID v4 is recommended (e.g., `550e8400-e29b-41d4-a716-446655440000`), but any string up to 128 characters is accepted.
- **Uniqueness**: Each distinct operation must use a unique key. Do not reuse keys across different operations.
- **Expiry**: Keys expire after **24 hours**. After expiry, the same key can be used for a new operation.
- **Scope**: Keys are scoped to the authenticated user — two different users can use the same key without conflict.

## Supported Endpoints

Idempotency keys are supported on all POST endpoints that create transactions or trigger financial operations:

| Endpoint | Description |
|---|---|
| `POST /api/convert/usdt-to-ghs` | Initiate stablecoin-to-GHS conversion |
| `POST /api/convert/confirm` | Confirm a pending conversion |
| `POST /api/mobile-money/transfer` | Initiate mobile money payout |

:::note
GET, DELETE, and other read/delete endpoints are inherently idempotent and do not require an idempotency key. Sending one on these endpoints is harmless but has no effect.
:::

## Code Examples

### cURL

```bash
# Generate a UUID v4 for the idempotency key
IDEMPOTENCY_KEY=$(uuidgen)

# Initiate a payout with idempotency protection
curl -X POST https://api.fiatsend.com/api/mobile-money/transfer \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -H "X-Idempotency-Key: $IDEMPOTENCY_KEY" \
  -d '{
    "beneficiaryId": "ben_mtn_abc123",
    "amount": "100.00",
    "currency": "GHS",
    "reference": "invoice-2026-001"
  }'

# If the request times out or you're unsure if it succeeded,
# retry with the SAME idempotency key:
curl -X POST https://api.fiatsend.com/api/mobile-money/transfer \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -H "X-Idempotency-Key: $IDEMPOTENCY_KEY" \
  -d '{
    "beneficiaryId": "ben_mtn_abc123",
    "amount": "100.00",
    "currency": "GHS",
    "reference": "invoice-2026-001"
  }'
# ↑ Returns the original response — no duplicate payout
```

### JavaScript (fetch)

```javascript
/**
 * Initiate a payout with idempotency protection and automatic retry.
 */
async function initiatePayout(token, beneficiaryId, amount, currency, reference) {
  // Generate a unique idempotency key for this operation
  const idempotencyKey = crypto.randomUUID();

  const payload = {
    beneficiaryId,
    amount,
    currency,
    reference,
  };

  // Retry up to 3 times with the SAME idempotency key
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch("https://api.fiatsend.com/api/mobile-money/transfer", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "X-Idempotency-Key": idempotencyKey,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Payout initiated:", result.data.transactionId);
        return result;
      }

      // Don't retry client errors (except 429)
      if (response.status < 500 && response.status !== 429) {
        console.error("Payout failed:", result.message);
        return result;
      }

      // Server error or rate limit — retry
      const delay = Math.pow(2, attempt) * 1000;
      console.log(`Attempt ${attempt} failed (${response.status}). Retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));

    } catch (error) {
      // Network error — retry with same idempotency key
      if (attempt === 3) throw error;
      const delay = Math.pow(2, attempt) * 1000;
      console.log(`Network error on attempt ${attempt}. Retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

// Usage
const result = await initiatePayout(
  token,
  "ben_mtn_abc123",
  "100.00",
  "GHS",
  "invoice-2026-001"
);
```

### Conversion with Idempotency

```javascript
// Generate one key per conversion operation
const conversionKey = crypto.randomUUID();

// Step 1: Initiate conversion
const convertResponse = await fetch("https://api.fiatsend.com/api/convert/usdt-to-ghs", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
    "X-Idempotency-Key": conversionKey,
  },
  body: JSON.stringify({
    quoteId: "quote_abc123",
    amount: "100.00",
    from: "USDT",
  }),
});

const conversion = await convertResponse.json();
console.log("Conversion:", conversion.data.conversionId);

// Step 2: Confirm conversion (use a DIFFERENT idempotency key)
const confirmKey = crypto.randomUUID();

const confirmResponse = await fetch("https://api.fiatsend.com/api/convert/confirm", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
    "X-Idempotency-Key": confirmKey,
  },
  body: JSON.stringify({
    conversionId: conversion.data.conversionId,
  }),
});
```

:::tip
**Always use a unique idempotency key per distinct operation.** In the conversion flow above, the initiation and confirmation are two separate operations, so they each need their own key. Reusing the same key across different steps would cause an idempotency conflict.
:::

## Idempotency Conflicts

If you send a request with an idempotency key that was already used with a **different request body**, Fiatsend returns a `409 Conflict` error:

```json
{
  "status": 0,
  "code": "idempotency_conflict",
  "message": "This idempotency key was already used with a different request body. Use a new key for a new operation.",
  "data": {
    "existingKey": "550e8400-e29b-41d4-a716-446655440000",
    "originalEndpoint": "POST /api/mobile-money/transfer",
    "createdAt": "2026-03-17T08:32:00Z"
  }
}
```

This typically happens when:
- You accidentally reuse a key across different payout operations.
- Your key generation has a collision (extremely rare with UUID v4, but possible with shorter custom formats).

**Resolution**: Generate a new idempotency key and retry the request.

## Key Expiry

Idempotency keys expire after **24 hours** from the time of the original request. After expiry:

- The cached response is deleted.
- The same key can be reused for a completely new operation.
- There is no way to retrieve the cached response after expiry.

:::warning
Do not rely on idempotency key expiry as part of your retry logic. If a request fails and you need to retry after 24 hours, you should generate a new idempotency key and treat it as a fresh operation — but first check via `GET /api/transactions` whether the original operation actually completed.
:::

## Best Practices

1. **Always use idempotency keys for payment operations.** This is the single most important thing you can do to prevent double-spending in your integration.

2. **Generate keys client-side before the request.** This ensures you have the key even if the request fails mid-flight.

3. **Store the idempotency key alongside the operation in your database.** This lets you correlate retries with the original operation for debugging.

4. **Use UUID v4.** It provides sufficient uniqueness with zero coordination between distributed systems.

5. **Use one key per operation, not per request.** All retries for the same operation should use the same key. Different operations must use different keys.

6. **Never reuse keys across different endpoints or different request bodies.** This will result in `409 Conflict` errors.

## Related Pages

- [Operations](/docs/integration/operations) — Conversion and payout endpoints that support idempotency
- [Errors & Rate Limits](/docs/integration/errors-rate-limits) — Error handling and retry strategies
- [Webhooks](/docs/integration/webhooks) — Event-driven alternative that reduces the need for retries
