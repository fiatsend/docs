---
sidebar_position: 3
title: "Authentication"
description: "Understand Fiatsend's wallet-based authentication flow using Privy and JWT sessions for secure API access."
---

# Authentication

Fiatsend uses **wallet-based authentication** powered by [Privy](https://privy.io/) combined with **JWT session tokens** for API access. This approach eliminates traditional username/password credentials in favor of cryptographic wallet signatures, providing a more secure and web3-native authentication experience.

This page explains the authentication flow, how to obtain and use JWT tokens, session lifecycle management, and security best practices.

## Authentication Flow

The Fiatsend authentication flow involves three parties: the client application, Privy (the wallet auth provider), and the Fiatsend backend.

```
┌──────────┐       ┌──────────┐       ┌──────────────────┐
│  Client   │       │  Privy   │       │ Fiatsend Backend │
│   App     │       │          │       │                  │
└────┬─────┘       └────┬─────┘       └────────┬─────────┘
     │                   │                      │
     │ 1. Connect Wallet │                      │
     │──────────────────>│                      │
     │                   │                      │
     │ 2. Sign Challenge │                      │
     │<──────────────────│                      │
     │                   │                      │
     │ 3. Return Signature                      │
     │──────────────────>│                      │
     │                   │                      │
     │ 4. Privy Token    │                      │
     │<──────────────────│                      │
     │                   │                      │
     │ 5. Exchange Privy Token for JWT          │
     │─────────────────────────────────────────>│
     │                   │                      │
     │ 6. JWT (httpOnly cookie)                 │
     │<─────────────────────────────────────────│
     │                   │                      │
     │ 7. Authenticated API calls with JWT      │
     │─────────────────────────────────────────>│
```

### Step-by-Step

1. **Connect Wallet** — The user connects their wallet (MetaMask, WalletConnect, or email login) through the Privy SDK embedded in the Fiatsend client.

2. **Sign Challenge** — Privy presents a challenge message for the user to sign with their wallet's private key. This proves ownership of the wallet address without exposing the private key.

3. **Return Signature** — The signed challenge is sent back to Privy for verification.

4. **Privy Token** — Upon successful verification, Privy issues an authentication token that represents the verified wallet session.

5. **Exchange for JWT** — The client sends the Privy token to the Fiatsend backend, which validates it and issues a Fiatsend-specific JWT.

6. **JWT Cookie** — The JWT is returned as an `httpOnly` cookie (not in the response body), ensuring it cannot be accessed by client-side JavaScript.

7. **Authenticated Requests** — All subsequent API calls include the JWT automatically via the cookie, or explicitly in the `Authorization` header for server-to-server calls.

## Making Authenticated Requests

Once you have a valid JWT, include it in the `Authorization` header for every API call.

### Required Headers

| Header | Value | Description |
|---|---|---|
| `Authorization` | `Bearer <token>` | JWT session token |
| `Content-Type` | `application/json` | Required for POST/PUT/PATCH requests |

### cURL Example

```bash
# Verify your current session
curl https://api.fiatsend.com/api/auth/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response:**

```json
{
  "status": 1,
  "code": "success",
  "message": "Authenticated",
  "data": {
    "userId": "user_abc123",
    "walletAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD68",
    "email": "user@example.com",
    "kycLevel": 1,
    "createdAt": "2026-01-15T10:30:00Z"
  }
}
```

### JavaScript (fetch) Example

```javascript
// Verify the current session
const response = await fetch("https://api.fiatsend.com/api/auth/me", {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${token}`,
  },
});

const result = await response.json();

if (result.status === 1) {
  console.log("Authenticated as:", result.data.walletAddress);
  console.log("KYC Level:", result.data.kycLevel);
} else {
  console.error("Authentication failed:", result.message);
}
```

### Browser-Based (Cookie) Example

If you are building a browser-based client that uses Fiatsend's Privy integration directly, the JWT is set as an `httpOnly` cookie and sent automatically with every request. You do not need to manually set the `Authorization` header:

```javascript
// Browser-based request — JWT cookie is sent automatically
const response = await fetch("https://api.fiatsend.com/api/auth/me", {
  method: "GET",
  credentials: "include", // Required to send cookies cross-origin
});

const result = await response.json();
console.log("User:", result.data);
```

## Token Lifecycle

Fiatsend JWT tokens have a defined lifecycle to balance security and user experience.

| Property | Value |
|---|---|
| **Token type** | JWT (JSON Web Token) |
| **Issued by** | Fiatsend backend |
| **Lifetime** | Short-lived (15–30 minutes) |
| **Refresh** | Automatic on activity — each authenticated request extends the session |
| **Storage** | `httpOnly` cookie (browser) or in-memory (server-side) |
| **Revocation** | On explicit logout or after inactivity timeout |

### Token Refresh

Tokens are refreshed automatically when the user makes authenticated API calls. If a token is nearing expiry and the user is still active, the backend issues a fresh token transparently. This means active users are never interrupted by token expiration.

If a token expires due to inactivity, the user must re-authenticate by connecting their wallet through Privy again.

### Logout

To explicitly end a session, call the logout endpoint:

```bash
curl -X POST https://api.fiatsend.com/api/auth/logout \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

```javascript
await fetch("https://api.fiatsend.com/api/auth/logout", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${token}`,
  },
});
```

This invalidates the session server-side and clears the `httpOnly` cookie.

## Session Security Best Practices

Fiatsend follows industry best practices for session management. If you are integrating the Fiatsend API into your own application, follow these guidelines:

### Cookie Configuration

When handling Fiatsend's JWT cookie in your proxy or middleware, ensure these attributes are preserved:

| Attribute | Value | Purpose |
|---|---|---|
| `httpOnly` | `true` | Prevents JavaScript access — mitigates XSS attacks |
| `Secure` | `true` | Cookie only sent over HTTPS |
| `SameSite` | `Strict` or `Lax` | Prevents CSRF attacks |
| `Path` | `/` | Cookie available for all API routes |
| `Max-Age` | Matches token lifetime | Cookie expires when token expires |

### Do's and Don'ts

:::warning
**Never expose JWT tokens in client-side code or URLs.**

- **Do not** store tokens in `localStorage` or `sessionStorage` — these are accessible to JavaScript and vulnerable to XSS.
- **Do not** include tokens in URL query parameters — these are logged in browser history, server logs, and referrer headers.
- **Do not** log full token values — if you need to log token usage, log only the last 6 characters for debugging.
- **Do** use `httpOnly` cookies for browser-based applications.
- **Do** store tokens in memory for server-to-server integrations.
- **Do** implement proper CORS headers to restrict which origins can make credentialed requests.
:::

### Server-to-Server Authentication

For backend integrations where there is no browser or wallet involved (e.g., automated payout systems), use a service account JWT issued by the Fiatsend team. Service account tokens are long-lived and scoped to specific API operations.

```bash
# Server-to-server request with service account token
curl https://api.fiatsend.com/api/transactions \
  -H "Authorization: Bearer SERVICE_ACCOUNT_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

:::info
To request a service account for server-to-server integration, contact **dev@fiatsend.com** with your use case and the API operations you need access to.
:::

## Error Responses

Authentication errors return standard HTTP status codes:

| Status | Code | Description |
|---|---|---|
| `401` | `unauthorized` | Missing or invalid JWT token |
| `401` | `token_expired` | JWT has expired — re-authenticate |
| `403` | `forbidden` | Valid token but insufficient permissions (e.g., KYC tier too low) |

```json
{
  "status": 0,
  "code": "token_expired",
  "message": "Your session has expired. Please log in again.",
  "data": null
}
```

See [Errors & Rate Limits](/docs/integration/errors-rate-limits) for the full error reference.

## Related Pages

- [Start Here](/docs/integration/start-here) — Quickstart guide
- [Environments](/docs/integration/environments) — Configure backend credentials per environment
- [KYC](/docs/integration/kyc) — Identity verification tiers that gate API access
- [Operations](/docs/integration/operations) — Authenticated API calls for conversions and payouts
