---
sidebar_position: 1
title: "Start Here"
description: "Get started integrating with the Fiatsend API to build payment experiences powered by stablecoins and mobile money."
---

# Start Here

Welcome to the Fiatsend Integration Guide. Fiatsend provides a payments API that lets you convert stablecoins to local currency and disburse funds directly to mobile money wallets across Ghana and other supported markets. Whether you are building a remittance product, a merchant payout system, a payroll platform, or an embedded finance feature, the Fiatsend API gives you the building blocks to move money reliably from on-chain stablecoins to real-world mobile money accounts on [Lisk Mainnet](https://lisk.com/).

This guide walks you through everything you need to go from zero to a working integration — from setting up your sandbox environment to processing your first live payout.

## What You Can Build

The Fiatsend API supports a range of payment workflows:

| Capability | Description |
|---|---|
| **Stablecoin-to-fiat conversion** | Convert USDT, USDC, USDC.e, DAI, or [GHSFIAT](/docs/platform/ghsfiat) to local currency at competitive rates |
| **Mobile money payouts** | Disburse GHS directly to MTN Mobile Money, Telecel Cash, and AirtelTigo wallets |
| **Beneficiary management** | Create, verify, and manage recipient mobile money accounts |
| **KYC verification** | Submit and track identity verification for compliance |
| **Transaction tracking** | Monitor conversion and payout status in real time via API or [webhooks](/docs/integration/webhooks) |
| **Idempotent payments** | Prevent duplicate disbursements with [idempotency keys](/docs/integration/idempotency) |

## Prerequisites

Before you begin, make sure you have the following:

1. **A Fiatsend account** — Sign up at [app.fiatsend.com](https://app.fiatsend.com) using a compatible wallet (MetaMask, WalletConnect, or email via Privy).
2. **API credentials** — Your backend project ID and API key, plus your Privy app ID. These are issued when you register for developer access.
3. **Sandbox access** — A sandbox environment is available for testing without real funds or real mobile money transfers. Contact the Fiatsend team to get sandbox credentials.
4. **Basic familiarity with REST APIs** — The Fiatsend API uses standard HTTP methods, JSON payloads, and Bearer token authentication.

:::tip
To request sandbox access and developer credentials, email **dev@fiatsend.com** with your company name, use case, and expected volume. The team typically responds within 1–2 business days.
:::

## Quickstart

Follow these five steps to complete your first integration end-to-end:

### Step 1: Get Sandbox Access

Contact **dev@fiatsend.com** to receive your sandbox credentials. You will get:

- A backend project ID and API key for the sandbox environment
- A Privy app ID configured for the sandbox
- A sandbox smart contract address on Lisk Testnet
- Test mobile money provider credentials

### Step 2: Configure Your Environment

Set up your environment variables as described in the [Environments](/docs/integration/environments) page. Create a `.env.local` file with your sandbox credentials:

```bash
NEXT_PUBLIC_BACKEND_ENDPOINT=https://sandbox-backend.fiatsend.com
NEXT_PUBLIC_BACKEND_PROJECT_ID=your_sandbox_project_id
BACKEND_API_KEY=your_sandbox_api_key
NEXT_PUBLIC_PRIVY_APP_ID=your_sandbox_privy_app_id
CONTRACT_ADDRESS=0xSandboxContractAddress
```

### Step 3: Authenticate and Create a Beneficiary

Authenticate using wallet-based login (see [Authentication](/docs/integration/authentication)), then create a verified beneficiary — a mobile money account that can receive payouts:

```bash
curl -X POST https://sandbox-api.fiatsend.com/api/mobile-money/verify \
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

See [Beneficiaries](/docs/integration/beneficiaries) for the full verification flow.

### Step 4: Initiate a Payout

Fetch a conversion rate, confirm the conversion, and then trigger a payout to your verified beneficiary:

```bash
# Get a quote
curl https://sandbox-api.fiatsend.com/api/convert/rate?from=USDT&to=GHS&amount=10 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Initiate conversion and payout
curl -X POST https://sandbox-api.fiatsend.com/api/mobile-money/transfer \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -H "X-Idempotency-Key: 550e8400-e29b-41d4-a716-446655440000" \
  -d '{
    "beneficiaryId": "ben_abc123",
    "amount": "100.00",
    "currency": "GHS",
    "reference": "test-payout-001"
  }'
```

See [Operations](/docs/integration/operations) for the complete conversion and payout flow.

### Step 5: Receive a Webhook

Configure a webhook URL in your Fiatsend dashboard to receive real-time status updates. When the payout completes, you will receive a `payout.completed` event:

```json
{
  "event": "payout.completed",
  "id": "evt_abc123",
  "timestamp": "2026-03-17T08:30:00Z",
  "data": {
    "transactionId": "tx_def456",
    "status": "completed",
    "amount": "100.00",
    "currency": "GHS",
    "beneficiary": "+233241234567"
  },
  "signature": "sha256=..."
}
```

See [Webhooks](/docs/integration/webhooks) for event types, signature verification, and retry behavior.

## Integration Pages

| Page | Description |
|---|---|
| [Environments](/docs/integration/environments) | Sandbox and production configuration |
| [Authentication](/docs/integration/authentication) | Wallet login, JWT sessions, and token lifecycle |
| [KYC](/docs/integration/kyc) | Identity verification tiers and endpoints |
| [Beneficiaries](/docs/integration/beneficiaries) | Create and verify mobile money recipients |
| [Operations](/docs/integration/operations) | Conversion, payout, and transaction tracking |
| [Webhooks](/docs/integration/webhooks) | Async event delivery and signature verification |
| [Errors & Rate Limits](/docs/integration/errors-rate-limits) | Error codes, HTTP statuses, and throttling |
| [Idempotency](/docs/integration/idempotency) | Prevent duplicate payments |
| [Pagination](/docs/integration/pagination) | Cursor-based pagination for list endpoints |

## Related Pages

- [Fiatsend Overview](/docs/intro) — Platform overview and architecture
- [Coverage](/docs/platform/coverage) — Supported countries and mobile money providers
- [Fees & Limits](/docs/platform/fees-and-limits) — Transaction fees and limits by KYC tier
- [Supported Stablecoins](/docs/platform/stablecoins) — Stablecoins available on the platform
