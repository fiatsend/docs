---
sidebar_position: 2
title: "Environments"
description: "Configure sandbox and production environments for the Fiatsend API, including environment variables and blockchain networks."
---

# Environments

Fiatsend provides two environments for integration: **Sandbox** for development and testing, and **Production** for live transactions with real funds. Both environments expose the same API surface, so code written against the sandbox works in production with only a configuration change.

This page covers the differences between environments, the required environment variables, and how to configure your application for each.

## Sandbox

The sandbox environment is a complete replica of the Fiatsend platform running against test infrastructure. No real money moves, no real mobile money transfers are initiated, and all blockchain transactions occur on Lisk Testnet.

| Property | Value |
|---|---|
| **API Base URL** | `https://sandbox-api.fiatsend.com` |
| **Blockchain** | Lisk Testnet |
| **Smart Contract** | Sandbox-specific `FiatsendGatewayV2` deployment |
| **Mobile Money** | Simulated providers (MTN, Telecel, AirtelTigo) — no real disbursements |
| **KYC** | Test profiles available for all tiers (Level 0, 1, 2) |
| **Stablecoins** | Testnet USDT, USDC, USDC.e, DAI, GHSFIAT (faucet available) |
| **Rate Limits** | Relaxed — higher thresholds for development |
| **Webhooks** | Fully functional with simulated events |

### Test KYC Profiles

The sandbox includes pre-configured test profiles that let you simulate different KYC outcomes without submitting real documents:

| Phone Number | KYC Outcome | Tier |
|---|---|---|
| `+233200000001` | Instantly verified | Level 1 |
| `+233200000002` | Instantly verified | Level 2 |
| `+233200000003` | Rejected (invalid document) | Level 0 |
| `+233200000004` | Pending (manual review) | Level 0 |

### Test Mobile Money Numbers

Use these sandbox phone numbers to simulate different payout outcomes:

| Phone Number | Provider | Outcome |
|---|---|---|
| `+233241000001` | MTN | Successful payout |
| `+233201000001` | Telecel | Successful payout |
| `+233271000001` | AirtelTigo | Successful payout |
| `+233241000002` | MTN | Failed — insufficient balance |
| `+233241000003` | MTN | Failed — invalid account |
| `+233241000004` | MTN | Timeout — delayed response |

:::info
Sandbox test stablecoins can be obtained from the Fiatsend testnet faucet. Contact **dev@fiatsend.com** for faucet access and testnet tokens.
:::

## Production

The production environment processes real transactions with real funds on Lisk Mainnet. Mobile money payouts are delivered to actual recipient wallets, and all blockchain transactions are final.

| Property | Value |
|---|---|
| **API Base URL** | `https://api.fiatsend.com` |
| **Blockchain** | Lisk Mainnet |
| **Smart Contract** | Production `FiatsendGatewayV2` (UUPS upgradeable) |
| **Mobile Money** | Live providers — MTN Mobile Money, Telecel Cash, AirtelTigo |
| **KYC** | Real identity verification with document review |
| **Stablecoins** | USDT, USDC, USDC.e, DAI, GHSFIAT (real assets) |
| **Rate Limits** | Strict — see [Errors & Rate Limits](/docs/integration/errors-rate-limits) |
| **Webhooks** | Live event delivery with retry and signature verification |

:::warning
Production transactions involve real funds and are irreversible. Always test your integration thoroughly in the sandbox before switching to production. Ensure your webhook signature verification is working correctly before going live.
:::

## Environment Variables

The following environment variables are required to configure your Fiatsend integration. Values differ between sandbox and production.

| Variable | Description | Sandbox Example | Production Example |
|---|---|---|---|
| `NEXT_PUBLIC_BACKEND_ENDPOINT` | Backend API endpoint | `https://sandbox-backend.fiatsend.com` | `https://backend.fiatsend.com` |
| `NEXT_PUBLIC_BACKEND_PROJECT_ID` | Backend project identifier | `sandbox_project_abc123` | `prod_project_xyz789` |
| `BACKEND_API_KEY` | Server-side backend API key | `sandbox_key_...` | `prod_key_...` |
| `NEXT_PUBLIC_PRIVY_APP_ID` | Privy application ID for wallet auth | `clsandbox123...` | `clprod789...` |
| `CONTRACT_ADDRESS` | FiatsendGatewayV2 smart contract address | `0x1234...abcd` (Lisk Testnet) | `0x5678...efgh` (Lisk Mainnet) |
| `MOBILE_MONEY_API_KEY` | API key for mobile money provider gateway | `mm_sandbox_key_...` | `mm_prod_key_...` |
| `WEBHOOK_SECRET` | HMAC secret for verifying webhook signatures | `whsec_sandbox_...` | `whsec_prod_...` |
| `NEXT_PUBLIC_API_BASE_URL` | Base URL for Fiatsend API calls | `https://sandbox-api.fiatsend.com` | `https://api.fiatsend.com` |

## Example `.env.local`

Create a `.env.local` file in your project root with the appropriate values for your target environment:

```bash title=".env.local"
# Fiatsend Environment Configuration
# Switch between sandbox and production by changing these values

# Backend
NEXT_PUBLIC_BACKEND_ENDPOINT=https://sandbox-backend.fiatsend.com
NEXT_PUBLIC_BACKEND_PROJECT_ID=sandbox_project_abc123
BACKEND_API_KEY=sandbox_key_your_secret_key_here

# Privy (wallet authentication)
NEXT_PUBLIC_PRIVY_APP_ID=clsandbox123your_privy_app_id

# Smart Contract
CONTRACT_ADDRESS=0x1234567890abcdef1234567890abcdef12345678

# Mobile Money Provider Gateway
MOBILE_MONEY_API_KEY=mm_sandbox_key_your_key_here

# Webhooks
WEBHOOK_SECRET=whsec_sandbox_your_webhook_secret

# API Base URL
NEXT_PUBLIC_API_BASE_URL=https://sandbox-api.fiatsend.com
```

:::warning
**Never commit secrets to version control.** Add `.env.local` to your `.gitignore` file. Use a secrets manager (such as AWS Secrets Manager, Doppler, or Vercel Environment Variables) for production deployments. Never expose `BACKEND_API_KEY`, `MOBILE_MONEY_API_KEY`, or `WEBHOOK_SECRET` in client-side code.
**Never commit secrets to version control.** Add `.env.local` to your `.gitignore` file. Use a secrets manager (such as AWS Secrets Manager, Doppler, or Vercel Environment Variables) for production deployments. Never expose `BACKEND_API_KEY`, `MOBILE_MONEY_API_KEY`, or `WEBHOOK_SECRET` in client-side code.
:::

## Switching Between Environments

To move from sandbox to production:

1. **Replace all environment variable values** with your production credentials.
2. **Update the API base URL** from `https://sandbox-api.fiatsend.com` to `https://api.fiatsend.com`.
3. **Update the contract address** to the production `FiatsendGatewayV2` deployment on Lisk Mainnet.
4. **Update your webhook URL** in the Fiatsend dashboard to point to your production webhook endpoint.
5. **Verify webhook signature verification** is correctly configured with your production `WEBHOOK_SECRET`.

:::tip
Use environment-specific configuration files (e.g., `.env.sandbox` and `.env.production`) and load the appropriate one based on your deployment target. Most frameworks (Next.js, Vite, etc.) support environment-specific `.env` files out of the box.
:::

## Related Pages

- [Start Here](/docs/integration/start-here) — Quickstart guide for your first integration
- [Authentication](/docs/integration/authentication) — How to authenticate API requests
- [Errors & Rate Limits](/docs/integration/errors-rate-limits) — Rate limits per environment
