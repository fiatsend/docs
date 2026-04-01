---
sidebar_position: 5
title: "Beneficiaries"
description: "Create, verify, and manage mobile money beneficiaries for Fiatsend payouts, including provider listing and verification flows."
---

# Beneficiaries

A **beneficiary** in Fiatsend is a verified mobile money account that can receive payouts. Before you can send funds to a mobile money wallet, the recipient account must be added as a beneficiary and verified to confirm that the phone number and account name match a real mobile money account.

This verification step protects both senders and recipients by ensuring payouts go to the correct account and reducing the risk of misdirected transfers.

## Beneficiary Fields

Each beneficiary record requires the following fields:

| Field | Type | Required | Description |
|---|---|---|---|
| `provider` | string | Yes | Mobile money provider code (see [providers list](#list-available-providers)) |
| `phone` | string | Yes | Recipient phone number in E.164 format |
| `accountName` | string | Yes | Name registered on the mobile money account |
| `country` | string | Yes | ISO 3166-1 alpha-2 country code (e.g., `GH` for Ghana) |
| `currency` | string | Yes | Payout currency code (e.g., `GHS` for Ghanaian Cedi) |

:::note
**E.164 Format** — Phone numbers must include the country code prefix with a `+` sign and no spaces or dashes. For Ghana, the format is `+233XXXXXXXXX` (12 digits total including the country code). Examples:
- MTN: `+233241234567`
- Telecel: `+233201234567`
- AirtelTigo: `+233271234567`
:::

## Verification Flow

Beneficiary verification confirms that the phone number corresponds to an active mobile money account and that the account name matches. The verification method depends on the provider:

| Provider | Verification Method | Typical Duration |
|---|---|---|
| **MTN Mobile Money** | Name lookup (instant) | < 5 seconds |
| **Telecel Cash** | Name lookup (instant) | < 5 seconds |
| **AirtelTigo** | Name lookup (instant) | < 10 seconds |

The verification flow is:

1. **Submit verification request** — Provide the provider, phone number, account name, country, and currency.
2. **Provider lookup** — Fiatsend queries the mobile money provider to confirm the account exists and the name matches.
3. **Beneficiary created** — If verification succeeds, the beneficiary is saved to your account and is immediately available for payouts.

If the name does not match the provider's records, the verification fails and the beneficiary is not created. The response will include the reason for the failure.

:::info
Beneficiary verification is required before the first payout to a given mobile money account. Once a beneficiary is verified, you can send multiple payouts to that account without re-verifying.
:::

## API Endpoints

### List Available Providers

Retrieve the list of mobile money providers available for the specified country. Use this to populate provider selection UI or validate provider codes before submitting a beneficiary.

**`GET /api/mobile-money/providers`**

#### cURL Example

```bash
curl "https://api.fiatsend.com/api/mobile-money/providers?country=GH" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### JavaScript (fetch) Example

```javascript
const response = await fetch(
  "https://api.fiatsend.com/api/mobile-money/providers?country=GH",
  {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  }
);

const result = await response.json();
console.log("Available providers:", result.data);
```

#### Query Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `country` | string | Yes | ISO 3166-1 alpha-2 country code |

#### Response

```json
{
  "status": 1,
  "code": "success",
  "message": "Providers retrieved",
  "data": [
    {
      "code": "MTN",
      "name": "MTN Mobile Money",
      "country": "GH",
      "currency": "GHS",
      "active": true
    },
    {
      "code": "TELECEL",
      "name": "Telecel Cash",
      "country": "GH",
      "currency": "GHS",
      "active": true
    },
    {
      "code": "AIRTELTIGO",
      "name": "AirtelTigo",
      "country": "GH",
      "currency": "GHS",
      "active": true
    }
  ]
}
```

---

### Verify a Mobile Money Account

Submit a mobile money account for verification. If the account is valid and the name matches, a beneficiary record is created.

**`POST /api/mobile-money/verify`**

#### cURL Example

```bash
curl -X POST https://api.fiatsend.com/api/mobile-money/verify \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "provider": "MTN",
    "phone": "+233241234567",
    "accountName": "Kwame Asante",
    "country": "GH",
    "currency": "GHS"
  }'
```

#### JavaScript (fetch) Example

```javascript
const response = await fetch("https://api.fiatsend.com/api/mobile-money/verify", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    provider: "MTN",
    phone: "+233241234567",
    accountName: "Kwame Asante",
    country: "GH",
    currency: "GHS",
  }),
});

const result = await response.json();

if (result.status === 1) {
  console.log("Beneficiary verified:", result.data.beneficiaryId);
} else {
  console.error("Verification failed:", result.message);
}
```

#### Request Body

| Field | Type | Required | Description |
|---|---|---|---|
| `provider` | string | Yes | Provider code from the providers list (e.g., `MTN`, `TELECEL`, `AIRTELTIGO`) |
| `phone` | string | Yes | Phone number in E.164 format (e.g., `+233241234567`) |
| `accountName` | string | Yes | Full name on the mobile money account |
| `country` | string | Yes | ISO 3166-1 alpha-2 country code (e.g., `GH`) |
| `currency` | string | Yes | Payout currency code (e.g., `GHS`) |

#### Response — Success

```json
{
  "status": 1,
  "code": "success",
  "message": "Mobile money account verified and beneficiary created",
  "data": {
    "beneficiaryId": "ben_mtn_abc123",
    "provider": "MTN",
    "providerName": "MTN Mobile Money",
    "phone": "+233241234567",
    "accountName": "Kwame Asante",
    "country": "GH",
    "currency": "GHS",
    "verified": true,
    "createdAt": "2026-03-17T08:00:00Z"
  }
}
```

#### Response — Failed Verification

```json
{
  "status": 0,
  "code": "verification_failed",
  "message": "Account name does not match provider records. Expected: KWAME ASANTE MENSAH",
  "data": null
}
```

:::tip
If verification fails due to a name mismatch, check the exact name registered with the mobile money provider. The `accountName` must match the provider's records — some providers store names in uppercase or include middle names. The error message may include the expected name format.
:::

---

### List Beneficiaries

Retrieve all verified beneficiaries for the authenticated user. Supports [pagination](/docs/integration/pagination).

**`GET /api/beneficiaries`**

#### cURL Example

```bash
curl "https://api.fiatsend.com/api/beneficiaries?limit=20" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### JavaScript (fetch) Example

```javascript
const response = await fetch(
  "https://api.fiatsend.com/api/beneficiaries?limit=20",
  {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  }
);

const result = await response.json();
console.log("Beneficiaries:", result.data);
console.log("Has more:", result.pagination.hasMore);
```

#### Query Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `limit` | integer | `20` | Number of results per page (max 100) |
| `cursor` | string | — | Pagination cursor from a previous response |
| `country` | string | — | Filter by country code |
| `provider` | string | — | Filter by provider code |

#### Response

```json
{
  "status": 1,
  "code": "success",
  "message": "Beneficiaries retrieved",
  "data": [
    {
      "beneficiaryId": "ben_mtn_abc123",
      "provider": "MTN",
      "providerName": "MTN Mobile Money",
      "phone": "+233241234567",
      "accountName": "Kwame Asante",
      "country": "GH",
      "currency": "GHS",
      "verified": true,
      "createdAt": "2026-03-17T08:00:00Z",
      "lastPayoutAt": "2026-03-17T09:30:00Z"
    },
    {
      "beneficiaryId": "ben_tel_def456",
      "provider": "TELECEL",
      "providerName": "Telecel Cash",
      "phone": "+233201234567",
      "accountName": "Ama Serwaa",
      "country": "GH",
      "currency": "GHS",
      "verified": true,
      "createdAt": "2026-03-15T14:00:00Z",
      "lastPayoutAt": null
    }
  ],
  "pagination": {
    "cursor": "eyJpZCI6ImJlbl90ZWxfZGVmNDU2In0",
    "hasMore": false,
    "total": 2
  }
}
```

---

### Remove a Beneficiary

Delete a verified beneficiary. This does not reverse any previous payouts — it only removes the beneficiary from your account so you can no longer initiate new payouts to that account.

**`DELETE /api/beneficiaries/:id`**

#### cURL Example

```bash
curl -X DELETE https://api.fiatsend.com/api/beneficiaries/ben_mtn_abc123 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### JavaScript (fetch) Example

```javascript
const beneficiaryId = "ben_mtn_abc123";

const response = await fetch(
  `https://api.fiatsend.com/api/beneficiaries/${beneficiaryId}`,
  {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  }
);

const result = await response.json();

if (result.status === 1) {
  console.log("Beneficiary removed");
} else {
  console.error("Failed to remove:", result.message);
}
```

#### Response

```json
{
  "status": 1,
  "code": "success",
  "message": "Beneficiary removed",
  "data": {
    "beneficiaryId": "ben_mtn_abc123",
    "removedAt": "2026-03-17T12:00:00Z"
  }
}
```

:::warning
Removing a beneficiary is permanent. If you need to send payouts to the same account in the future, you will need to re-verify it.
:::

## Error Handling

Common errors when working with beneficiaries:

| HTTP Status | Error Code | Description |
|---|---|---|
| `400` | `validation_error` | Missing or invalid fields (e.g., phone not in E.164 format) |
| `400` | `verification_failed` | Account name does not match provider records |
| `404` | `provider_not_found` | Invalid provider code for the specified country |
| `404` | `beneficiary_not_found` | Beneficiary ID does not exist |
| `409` | `duplicate_beneficiary` | A beneficiary with this phone number and provider already exists |
| `503` | `provider_unavailable` | Mobile money provider is temporarily unreachable |

See [Errors & Rate Limits](/docs/integration/errors-rate-limits) for the full error reference.

## Related Pages

- [Coverage](/docs/platform/coverage) — Supported countries and mobile money providers
- [Operations](/docs/integration/operations) — Initiate payouts to verified beneficiaries
- [Pagination](/docs/integration/pagination) — Paginating through beneficiary lists
- [Start Here](/docs/integration/start-here) — Quickstart guide including beneficiary setup
