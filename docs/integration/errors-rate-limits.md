---
sidebar_position: 8
title: "Errors & Rate Limits"
description: "Understand Fiatsend API error responses, HTTP status codes, error codes, and rate limiting behavior."
---

# Errors & Rate Limits

This page documents the Fiatsend API's error response format, HTTP status codes, common error codes, and rate limiting behavior. Understanding these is essential for building resilient integrations that handle failures gracefully.

## Error Response Format

All Fiatsend API errors follow a consistent JSON structure:

```json
{
  "status": 0,
  "code": "validation_error",
  "message": "Phone number must be in E.164 format",
  "data": null
}
```

### Fields

| Field | Type | Description |
|---|---|---|
| `status` | integer | `0` for errors, `1` for success |
| `code` | string | Machine-readable error code for programmatic handling |
| `message` | string | Human-readable error description — safe to display to end users |
| `data` | object \| null | Additional error context (when available), otherwise `null` |

### Error with Additional Context

Some errors include additional data to help you diagnose the issue:

```json
{
  "status": 0,
  "code": "limit_exceeded",
  "message": "Daily payout limit exceeded",
  "data": {
    "limit": "5000.00",
    "used": "4800.00",
    "remaining": "200.00",
    "currency": "GHS",
    "resetsAt": "2026-03-18T00:00:00Z"
  }
}
```

## HTTP Status Codes

Fiatsend uses standard HTTP status codes to indicate the category of the error:

| Status Code | Meaning | Description |
|---|---|---|
| `200` | OK | Request succeeded |
| `201` | Created | Resource created successfully |
| `400` | Bad Request | Invalid request — missing fields, invalid format, or business rule violation |
| `401` | Unauthorized | Missing or invalid authentication token. See [Authentication](/docs/integration/authentication). |
| `403` | Forbidden | Valid token but insufficient permissions — usually a KYC tier restriction. See [KYC](/docs/integration/kyc). |
| `404` | Not Found | Resource does not exist (e.g., invalid beneficiary ID, transaction ID) |
| `409` | Conflict | Duplicate resource — e.g., trying to create a beneficiary that already exists |
| `429` | Too Many Requests | Rate limit exceeded. See [Rate Limits](#rate-limits) below. |
| `500` | Internal Server Error | Unexpected server error — retry with exponential backoff |
| `502` | Bad Gateway | Upstream service unavailable (e.g., mobile money provider down) |
| `503` | Service Unavailable | Fiatsend is temporarily unavailable — retry after delay |
| `504` | Gateway Timeout | Upstream service timed out — retry with exponential backoff |

## Error Codes

The `code` field in the error response identifies the specific error type. Use this for programmatic error handling rather than parsing the `message` string.

### Authentication Errors

| Code | HTTP Status | Description |
|---|---|---|
| `unauthorized` | 401 | No authentication token provided |
| `token_expired` | 401 | JWT has expired — re-authenticate via Privy |
| `token_invalid` | 401 | JWT is malformed or has been tampered with |
| `forbidden` | 403 | Authenticated but KYC tier is insufficient for this operation |

### Validation Errors

| Code | HTTP Status | Description |
|---|---|---|
| `validation_error` | 400 | One or more request fields are missing or invalid |
| `invalid_phone_format` | 400 | Phone number is not in E.164 format (e.g., must be `+233XXXXXXXXX`) |
| `invalid_provider` | 400 | Unrecognized mobile money provider code for the specified country |
| `invalid_amount` | 400 | Amount is not a valid positive number or has too many decimal places |
| `invalid_currency` | 400 | Unsupported currency code |
| `invalid_stablecoin` | 400 | Unsupported stablecoin symbol |

### Beneficiary Errors

| Code | HTTP Status | Description |
|---|---|---|
| `verification_failed` | 400 | Account name does not match provider records |
| `duplicate_beneficiary` | 409 | A beneficiary with this phone and provider already exists |
| `beneficiary_not_found` | 404 | No beneficiary found with the specified ID |
| `provider_not_found` | 404 | The specified provider is not available in the target country |

### Conversion & Payout Errors

| Code | HTTP Status | Description |
|---|---|---|
| `quote_expired` | 400 | The conversion quote has expired — fetch a new rate |
| `insufficient_balance` | 400 | Wallet does not have enough stablecoin or GHS balance for this operation |
| `limit_exceeded` | 400 | Daily or monthly transaction limit exceeded for the user's KYC tier |
| `conversion_failed` | 500 | On-chain conversion failed — check the transaction hash for details |
| `payout_failed` | 502 | Mobile money provider could not process the payout |
| `provider_unavailable` | 503 | Mobile money provider is temporarily unreachable |
| `provider_timeout` | 504 | Mobile money provider did not respond in time |

### Idempotency Errors

| Code | HTTP Status | Description |
|---|---|---|
| `idempotency_conflict` | 409 | The idempotency key was already used with a different request body |

## Rate Limits

Fiatsend enforces rate limits to protect the platform and ensure fair usage. Limits vary by endpoint category and are applied per authenticated user.

### Limit Tiers

| Endpoint Category | Rate Limit | Window | Notes |
|---|---|---|---|
| **Conversion (quotes)** | 30 requests | Per hour | `GET /api/convert/rate` |
| **Conversion (execute)** | 10 requests | Per hour | `POST /api/convert/usdt-to-ghs`, `POST /api/convert/confirm` |
| **Payouts** | 5 requests | Per day | `POST /api/mobile-money/transfer` |
| **Beneficiaries** | 20 requests | Per hour | `POST /api/mobile-money/verify` |
| **General API calls** | 1,000 requests | Per hour | All other endpoints |
| **KYC submissions** | 3 requests | Per day | `POST /api/users/kyc-upload` |

:::info
Rate limits are per authenticated user, not per API key. If multiple services share the same user credentials, they share the same rate limit pool. For high-volume integrations, contact **dev@fiatsend.com** to discuss enterprise rate limits.
:::

### Rate Limit Headers

When you approach or hit a rate limit, the API response includes these headers:

| Header | Description | Example |
|---|---|---|
| `X-RateLimit-Limit` | Maximum requests allowed in the current window | `1000` |
| `X-RateLimit-Remaining` | Requests remaining in the current window | `847` |
| `X-RateLimit-Reset` | Unix timestamp when the current window resets | `1742212800` |
| `Retry-After` | Seconds to wait before retrying (only on `429` responses) | `120` |

### Example `429` Response

```bash
HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1742212800
Retry-After: 3600
Content-Type: application/json
```

```json
{
  "status": 0,
  "code": "rate_limit_exceeded",
  "message": "Conversion rate limit exceeded. Please try again in 60 minutes.",
  "data": {
    "limit": 10,
    "window": "1 hour",
    "retryAfter": 3600,
    "resetsAt": "2026-03-17T10:00:00Z"
  }
}
```

## Best Practices

### Exponential Backoff

When you receive a `429`, `500`, `502`, `503`, or `504` response, retry with exponential backoff rather than immediately retrying:

```javascript
/**
 * Fetch with automatic retry and exponential backoff.
 */
async function fetchWithRetry(url, options, maxRetries = 3) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const response = await fetch(url, options);

    // Success — return immediately
    if (response.ok) {
      return response;
    }

    // Rate limited — use Retry-After header
    if (response.status === 429) {
      const retryAfter = parseInt(response.headers.get("Retry-After") || "60", 10);
      console.log(`Rate limited. Retrying in ${retryAfter} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
      continue;
    }

    // Server error — retry with exponential backoff
    if (response.status >= 500 && attempt < maxRetries) {
      const delay = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s
      console.log(`Server error ${response.status}. Retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      continue;
    }

    // Client error or max retries exhausted — return the error response
    return response;
  }
}

// Usage
const response = await fetchWithRetry(
  "https://api.fiatsend.com/api/convert/rate?from=USDT&to=GHS&amount=100",
  {
    headers: { "Authorization": `Bearer ${token}` },
  }
);
```

```bash
# cURL with manual retry (example)
# First attempt
curl -s -o response.json -w "%{http_code}" \
  "https://api.fiatsend.com/api/convert/rate?from=USDT&to=GHS&amount=100" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# If 429, read Retry-After header and wait
```

### Cache Rate Responses

Conversion rate quotes are valid for 5 minutes. Cache the response and reuse it within that window instead of fetching a new rate for every user interaction. This reduces your rate limit consumption significantly.

### Use Webhooks Instead of Polling

Instead of repeatedly calling `GET /api/transactions/:id` to check if a payout has completed, configure [webhooks](/docs/integration/webhooks) to receive push notifications. This eliminates unnecessary API calls and gives you faster status updates.

### Monitor Rate Limit Headers

Track the `X-RateLimit-Remaining` header in your application and slow down proactively before hitting the limit. This prevents disruptive `429` errors in the middle of critical payment flows.

:::tip
For production integrations, log all API responses that include `X-RateLimit-Remaining` below 20% of the limit. This gives you early warning before your integration starts getting throttled.
:::

## Related Pages

- [Authentication](/docs/integration/authentication) — Token lifecycle and auth errors
- [Operations](/docs/integration/operations) — API endpoints that are subject to rate limits
- [Webhooks](/docs/integration/webhooks) — Event-driven alternative to polling
- [Idempotency](/docs/integration/idempotency) — Safely retry without duplicate payments
- [Fees & Limits](/docs/platform/fees-and-limits) — Transaction limits by KYC tier (separate from rate limits)
