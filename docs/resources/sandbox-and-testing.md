---
sidebar_position: 1
title: "Sandbox & Testing"
---

# Sandbox & Testing

Fiatsend provides a full sandbox environment for development and integration testing. The sandbox mirrors the production platform but uses test networks, simulated mobile money providers, and synthetic data — so you can build and validate your integration without moving real money or affecting live accounts.

## Sandbox Environment

| Property | Value |
|---|---|
| **API Base URL** | `https://sandbox.api.fiatsend.com` |
| **App URL** | `https://sandbox.app.fiatsend.com` |
| **Blockchain** | Lisk Testnet (Sepolia) |
| **Mobile Money** | Simulated providers (no real disbursements) |
| **KYC** | Test profiles auto-approved |
| **Data retention** | Periodically reset (see warning below) |

All sandbox endpoints accept the same request format as production. The only difference is the base URL and the fact that no real funds or mobile money transactions are processed.

:::warning
**Sandbox data is periodically reset.** Test accounts, transactions, and KYC records may be cleared without notice during maintenance windows. Do not rely on sandbox data for long-term storage. Always design your integration to handle fresh state.
:::

## Test Phone Numbers

The sandbox includes pre-configured test phone numbers that simulate different outcomes:

| Phone Number | Provider | Behavior |
|---|---|---|
| `+233200000001` | MTN Mobile Money | **Success** — payout completes normally |
| `+233200000002` | MTN Mobile Money | **Failure** — payout fails with `INVALID_BENEFICIARY` |
| `+233200000003` | Telecel Cash | **Success** — payout completes normally |
| `+233200000004` | Telecel Cash | **Timeout** — payout hangs for 30 seconds, then fails |
| `+233200000005` | AirtelTigo | **Success** — payout completes normally |
| `+233200000006` | AirtelTigo | **Insufficient funds** — returns `PROVIDER_LIMIT_EXCEEDED` |
| `+233200000007` | MTN Mobile Money | **Delayed success** — payout completes after 60-second delay |
| `+233200000008` | MTN Mobile Money | **KYC required** — returns `KYC_UPGRADE_REQUIRED` |

Use these numbers to test your integration's handling of success, failure, timeout, and edge cases. Any phone number not in this list will return a generic success response in the sandbox.

## Sandbox Setup

### Step 1: Get Sandbox Credentials

1. Sign up at [sandbox.app.fiatsend.com](https://sandbox.app.fiatsend.com) using a test phone number.
2. Your account is automatically provisioned with test stablecoins on Lisk Testnet.
3. Navigate to **Settings → Developer** to find your sandbox API key.

### Step 2: Fund Your Test Wallet

Sandbox accounts are pre-funded with test tokens, but if you need additional funds:

- Use the Lisk Testnet faucet to get test ETH for gas.
- Use the in-app **Faucet** button (sandbox only) to mint test USDT, USDC, and GHSFIAT to your wallet.

### Step 3: Make Your First API Call

Verify your sandbox setup by calling the auth endpoint:

```bash
curl -X POST https://sandbox.api.fiatsend.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "walletAddress": "0xYourTestWallet",
    "signature": "0xYourSignature",
    "message": "Sign in to Fiatsend: 1710000000"
  }'
```

```javascript
const response = await fetch(
  "https://sandbox.api.fiatsend.com/api/auth/login",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      walletAddress: "0xYourTestWallet",
      signature: "0xYourSignature",
      message: "Sign in to Fiatsend: 1710000000",
    }),
  }
);

const data = await response.json();
console.log(data.token); // Your sandbox JWT
```

### Step 4: Test a Payout

```bash
curl -X POST https://sandbox.api.fiatsend.com/api/convert/usdt-to-ghs \
  -H "Authorization: Bearer <SANDBOX_JWT>" \
  -H "Content-Type: application/json" \
  -H "X-Idempotency-Key: test-$(date +%s)" \
  -d '{
    "amount": "10.00",
    "sourceToken": "USDT",
    "beneficiaryPhone": "+233200000001",
    "provider": "mtn"
  }'
```

You should receive a success response with a conversion ID. The payout to `+233200000001` will simulate a completed mobile money transfer.

:::tip
Test all the [test phone numbers](#test-phone-numbers) above to ensure your integration handles every possible outcome — not just the happy path.
:::

## Test KYC Profiles

In the sandbox, KYC verification is simulated. Upload any image file as your ID document, and the verification will be auto-approved within seconds. You can test different KYC tiers by uploading different file names:

| File Name Pattern | Result |
|---|---|
| `*_approve.*` (e.g., `id_approve.jpg`) | KYC approved — upgrades to Level 2 |
| `*_reject.*` (e.g., `id_reject.png`) | KYC rejected — remains at current level |
| `*_pending.*` (e.g., `id_pending.jpg`) | KYC stays in pending state indefinitely |
| Any other file name | KYC approved (default sandbox behavior) |

## Developer Local Setup

To run the Fiatsend documentation site locally for development:

```bash
# Clone the docs repository
git clone https://github.com/fiatsend/fiatsend-docs.git
cd fiatsend-docs

# Install dependencies
yarn install

# Start the local development server
yarn start
```

The site will be available at `http://localhost:3000`. Changes to markdown files will hot-reload in the browser.

### Building for Production

```bash
# Build the static site
yarn build

# Serve the production build locally
yarn serve
```

### Running Checks

```bash
# Check for broken links
yarn build  # broken links fail the build

# Type check (if TypeScript is configured)
yarn typecheck
```

## Issue Reporting

If you encounter a bug, unexpected behavior, or have a question about the API:

### What to Include in a Bug Report

1. **Reproduction steps** — Exact sequence of API calls or app actions that trigger the issue.
2. **Request and response** — Full request (with sensitive data redacted) and the response you received, including headers.
3. **Environment** — Sandbox or production, timestamps, and your account's KYC tier.
4. **Screenshots** — If the issue is in the FiatsendOne app, include screenshots of the error state.
5. **Expected vs. actual behavior** — What you expected to happen and what actually happened.

### Where to Report

| Channel | Use Case |
|---|---|
| **In-app support** | Fastest response for account or transaction issues |
| **dev@fiatsend.com** | Technical API questions and integration support |
| **GitHub Issues** | Documentation bugs, feature requests, and open-source contributions |

:::info
For urgent payout issues in production, always use in-app support. The support team has direct access to transaction monitoring tools and can investigate immediately.
:::

## Sandbox vs. Production Checklist

Before going live, verify that you've addressed all items in this checklist:

| Item | Sandbox | Production |
|---|---|---|
| Base URL | `sandbox.api.fiatsend.com` | `api.fiatsend.com` |
| API key | Sandbox key | Production key |
| Blockchain | Lisk Testnet | Lisk Mainnet |
| Phone numbers | Test numbers (`+233200000xxx`) | Real mobile money numbers |
| Webhook URL | Your staging endpoint | Your production endpoint |
| Idempotency keys | Test values | Unique UUIDv4 per request |
| Error handling | Tested all [test phone numbers](#test-phone-numbers) | ✅ |
| Webhook verification | Signature validation implemented | ✅ |
| Rate limiting | Handled `429` responses | ✅ |

:::warning
Never use sandbox API keys in production or production API keys in sandbox. Keep credentials strictly separated between environments. See [Security & Compliance](/docs/security/overview) for credential management best practices.
:::

## Related Pages

- [API Overview](/docs/api/overview) — Full API endpoint reference
- [Security & Compliance](/docs/security/overview) — Environment separation guidance
- [Fees & Limits](/docs/platform/fees-and-limits) — Production fee schedule
- [Coverage](/docs/platform/coverage) — Supported countries and providers
- [Support](/docs/resources/support) — Help channels and FAQ
