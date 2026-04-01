---
sidebar_position: 1
title: "API Overview"
---

# API Overview

Fiatsend exposes a set of RESTful API endpoints for authentication, user management, transactions, conversions, and mobile money operations. This page serves as the primary reference for integrating with the Fiatsend platform programmatically.

**Base URL:** `https://api.fiatsend.com`

All endpoints require HTTPS. HTTP requests are rejected.

## Authentication & Users

### Auth Endpoints

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Authenticate with wallet signature and obtain a JWT session token |
| `POST` | `/api/auth/logout` | Invalidate the current session token |
| `GET` | `/api/auth/me` | Return the authenticated user's account details and role |

### User Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/users/profile` | Retrieve the current user's profile |
| `PUT` | `/api/users/profile` | Update profile fields (name, business details, contact info) |
| `POST` | `/api/users/kyc-upload` | Upload KYC documents (ID image, selfie) for verification |
| `GET` | `/api/users/kyc-status` | Check the current KYC verification status and tier |

#### Example: Login

```bash
curl -X POST https://api.fiatsend.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "walletAddress": "0x1234...abcd",
    "signature": "0xsigned_message_here",
    "message": "Sign in to Fiatsend: 1710000000"
  }'
```

```javascript
const response = await fetch("https://api.fiatsend.com/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    walletAddress: "0x1234...abcd",
    signature: "0xsigned_message_here",
    message: "Sign in to Fiatsend: 1710000000",
  }),
});

const data = await response.json();
// data.token contains the JWT session token
```

#### Example: Get Profile

```bash
curl https://api.fiatsend.com/api/users/profile \
  -H "Authorization: Bearer <YOUR_JWT_TOKEN>"
```

```javascript
const response = await fetch("https://api.fiatsend.com/api/users/profile", {
  headers: { Authorization: "Bearer <YOUR_JWT_TOKEN>" },
});

const profile = await response.json();
```

## Transactions & Conversion

### Conversion Endpoints

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/convert/usdt-to-ghs` | Initiate a stablecoin-to-GHS conversion |
| `GET` | `/api/convert/rate` | Get the current conversion rate for a given stablecoin pair |
| `POST` | `/api/convert/confirm` | Confirm a pending conversion after reviewing rate and fees |

### Transaction Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/transactions` | List transactions with pagination, filtering by date, type, and status |
| `GET` | `/api/transactions/:id` | Get details of a specific transaction by ID |
| `POST` | `/api/transactions/webhook` | Register or update a webhook URL for transaction status notifications |

#### Example: Get Conversion Rate

```bash
curl "https://api.fiatsend.com/api/convert/rate?from=USDT&to=GHS&amount=100" \
  -H "Authorization: Bearer <YOUR_JWT_TOKEN>"
```

```javascript
const response = await fetch(
  "https://api.fiatsend.com/api/convert/rate?from=USDT&to=GHS&amount=100",
  {
    headers: { Authorization: "Bearer <YOUR_JWT_TOKEN>" },
  }
);

const rate = await response.json();
// rate.exchangeRate, rate.ghsAmount, rate.fee, rate.expiresAt
```

#### Example: Initiate Conversion

```bash
curl -X POST https://api.fiatsend.com/api/convert/usdt-to-ghs \
  -H "Authorization: Bearer <YOUR_JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -H "X-Idempotency-Key: unique-request-id-123" \
  -d '{
    "amount": "100.00",
    "sourceToken": "USDT",
    "beneficiaryPhone": "+233241234567",
    "provider": "mtn"
  }'
```

```javascript
const response = await fetch(
  "https://api.fiatsend.com/api/convert/usdt-to-ghs",
  {
    method: "POST",
    headers: {
      Authorization: "Bearer <YOUR_JWT_TOKEN>",
      "Content-Type": "application/json",
      "X-Idempotency-Key": "unique-request-id-123",
    },
    body: JSON.stringify({
      amount: "100.00",
      sourceToken: "USDT",
      beneficiaryPhone: "+233241234567",
      provider: "mtn",
    }),
  }
);

const conversion = await response.json();
// conversion.conversionId, conversion.status, conversion.ghsAmount
```

:::tip
Always include an `X-Idempotency-Key` header on `POST` requests that create or modify resources. This prevents duplicate transactions if a request is retried due to network issues.
:::

## Mobile Money

### Mobile Money Endpoints

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/mobile-money/transfer` | Initiate a payout to a mobile money account |
| `GET` | `/api/mobile-money/balance` | Check the balance available for mobile money payouts |
| `POST` | `/api/mobile-money/verify` | Verify a mobile money number and retrieve the account holder's name |
| `GET` | `/api/mobile-money/providers` | List available mobile money providers for a given country |

#### Example: Verify a Mobile Money Number

```bash
curl -X POST https://api.fiatsend.com/api/mobile-money/verify \
  -H "Authorization: Bearer <YOUR_JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "+233241234567",
    "provider": "mtn",
    "country": "GH"
  }'
```

```javascript
const response = await fetch(
  "https://api.fiatsend.com/api/mobile-money/verify",
  {
    method: "POST",
    headers: {
      Authorization: "Bearer <YOUR_JWT_TOKEN>",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phoneNumber: "+233241234567",
      provider: "mtn",
      country: "GH",
    }),
  }
);

const result = await response.json();
// result.verified, result.accountName, result.provider
```

#### Example: List Providers

```bash
curl "https://api.fiatsend.com/api/mobile-money/providers?country=GH" \
  -H "Authorization: Bearer <YOUR_JWT_TOKEN>"
```

```javascript
const response = await fetch(
  "https://api.fiatsend.com/api/mobile-money/providers?country=GH",
  {
    headers: { Authorization: "Bearer <YOUR_JWT_TOKEN>" },
  }
);

const providers = await response.json();
// providers.data = [{ id: "mtn", name: "MTN Mobile Money" }, ...]
```

## Common Headers

All API requests should include the following headers where applicable:

| Header | Required | Description |
|---|---|---|
| `Authorization` | Yes (except login) | Bearer token: `Bearer <JWT_TOKEN>` |
| `Content-Type` | Yes (for POST/PUT) | `application/json` |
| `X-Idempotency-Key` | Recommended (for POST) | Unique string per request to prevent duplicate operations. UUIDv4 recommended. |
| `Accept` | Optional | `application/json` (default) |

## Response Format

All API responses follow a consistent JSON structure.

### Success Response

```json
{
  "success": true,
  "data": {
    "id": "txn_abc123",
    "status": "completed",
    "amount": "100.00",
    "currency": "USDT"
  },
  "meta": {
    "requestId": "req_xyz789",
    "timestamp": "2026-03-17T10:30:00Z"
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "INVALID_BENEFICIARY",
    "message": "The provided phone number is not registered with the specified mobile money provider.",
    "details": {
      "field": "beneficiaryPhone",
      "value": "+233241234567"
    }
  },
  "meta": {
    "requestId": "req_xyz790",
    "timestamp": "2026-03-17T10:31:00Z"
  }
}
```

### Common Error Codes

| Code | HTTP Status | Description |
|---|---|---|
| `UNAUTHORIZED` | 401 | Missing or invalid JWT token |
| `FORBIDDEN` | 403 | Authenticated but insufficient permissions for this action |
| `NOT_FOUND` | 404 | Requested resource does not exist |
| `VALIDATION_ERROR` | 422 | Request body failed validation (check `error.details`) |
| `RATE_LIMITED` | 429 | Too many requests — slow down and retry after the `Retry-After` header value |
| `INVALID_BENEFICIARY` | 400 | The mobile money number or provider is invalid |
| `INSUFFICIENT_BALANCE` | 400 | Not enough stablecoin balance to complete the operation |
| `CONVERSION_EXPIRED` | 400 | The conversion quote expired — request a new rate |
| `INTERNAL_ERROR` | 500 | Unexpected server error — contact support if persistent |

## Pagination

List endpoints (e.g., `GET /api/transactions`) support cursor-based pagination:

| Parameter | Type | Description |
|---|---|---|
| `limit` | integer | Number of results per page (default: 20, max: 100) |
| `cursor` | string | Opaque cursor from the previous response's `meta.nextCursor` |
| `sort` | string | Sort field (e.g., `createdAt`) |
| `order` | string | Sort direction: `asc` or `desc` (default: `desc`) |

```json
{
  "success": true,
  "data": [ ... ],
  "meta": {
    "nextCursor": "eyJpZCI6InR4bl8xMjMifQ==",
    "hasMore": true,
    "total": 142
  }
}
```

## Webhooks

Register a webhook URL to receive real-time notifications about transaction status changes:

```bash
curl -X POST https://api.fiatsend.com/api/transactions/webhook \
  -H "Authorization: Bearer <YOUR_JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-server.com/fiatsend-webhook",
    "events": ["transaction.completed", "transaction.failed", "conversion.completed"]
  }'
```

Webhook payloads are signed with HMAC-SHA256. Verify the `X-Fiatsend-Signature` header against your webhook secret to ensure authenticity.

:::warning
Always verify webhook signatures before processing payloads. Unverified webhooks could be spoofed by malicious actors.
:::

## OpenAPI Specification

The Fiatsend OpenAPI spec is coming soon. It will provide machine-readable endpoint definitions for automatic client generation in any language.

For early access to the OpenAPI spec or for questions about specific endpoints, contact **dev@fiatsend.com**.

:::tip
Import the endpoint examples from this page into **Postman** or **Insomnia** for quick interactive testing. Use the [sandbox environment](/docs/resources/sandbox-and-testing) base URL (`https://sandbox.api.fiatsend.com`) during development.
:::

## Related Pages

- [Account & Access](/docs/account/access) — Authentication setup
- [Managing Funds](/docs/account/managing-funds) — Deposits, payouts, and bulk operations
- [Security & Compliance](/docs/security/overview) — Rate limiting, JWT details, and data protection
- [Sandbox & Testing](/docs/resources/sandbox-and-testing) — Test environment and sandbox credentials
- [Fees & Limits](/docs/platform/fees-and-limits) — Fee schedule and transaction limits
