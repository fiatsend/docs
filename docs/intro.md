---
sidebar_position: 1
slug: /intro
title: "Fiatsend Overview"
---

# Fiatsend Overview

Fiatsend is a payments-first mobile money platform powered by web3 rails. Built on stablecoins running on [Lisk Mainnet](https://lisk.com/), Fiatsend enables businesses and individuals to send, receive, and convert digital currency to and from mobile money — with Ghana as the primary market. The platform operates on a B2B2C model: businesses integrate Fiatsend to power reliable local payments for their customers, agents, and merchants.

Whether you are an engineer building on the Fiatsend API, a compliance officer evaluating the platform's KYC tiers, or a partner exploring integration, these docs will walk you through everything you need to get started.

## Core Capabilities

| Capability | Description |
|---|---|
| **Local Payments** | Send and receive payments via mobile money providers like MTN Mobile Money, Telecel Cash, and AirtelTigo in Ghana. |
| **Stablecoin Conversion** | Convert between stablecoins (USDC, USDT, DAI, and more) and local currency (GHS) with transparent fees. |
| **GHSFIAT Stablecoin** | Fiatsend's native GHS-pegged stablecoin for on-chain local currency settlement. [Learn more →](/docs/platform/ghsfiat) |
| **MobileNumber NFT** | An encrypted, privacy-preserving NFT tied to the user's phone number, used for identity and tiered access control. [Learn more →](/docs/platform/mobilenumber-nft) |
| **QR / Scan-to-Pay** | Merchants and agents accept payments instantly through QR code scanning in the FiatsendOne app. |
| **Payout to Mobile Money** | Settle funds directly to mobile money wallets across supported providers and countries. |
| **Bulk Disbursements** | Businesses can send payments to multiple recipients in a single batch — ideal for payroll and supplier payments. |

## Who These Docs Are For

- **Engineers** — Integrate the Fiatsend API into your application, understand the smart contract architecture, or build on top of Fiatsend's infrastructure.
- **Compliance & Operations** — Review KYC tier requirements, transaction limits, fee structures, and supported corridors.
- **Partners & Businesses** — Evaluate Fiatsend's coverage, use cases, and B2B2C integration model for your payment needs.

## Architecture Overview

At a high level, the Fiatsend platform follows this flow:

```
┌──────────────┐     ┌──────────────┐     ┌─────────────────────────┐     ┌──────────────────────┐
│ FiatsendOne  │────▶│  Fiatsend    │────▶│  Lisk Mainnet Smart     │────▶│  Mobile Money         │
│  App / API   │     │  Backend     │     │  Contracts              │     │  Providers            │
│              │     │             │     │  (FiatsendGatewayV2)    │     │  (MTN, Telecel, etc.) │
└──────────────┘     └──────────────┘     └─────────────────────────┘     └──────────────────────┘
```

1. **FiatsendOne App** — The primary user-facing application available at [app.fiatsend.com](https://app.fiatsend.com). Users authenticate via wallet-based login (Privy) with JWT sessions.
2. **Fiatsend Backend** — The backend handles authentication, transaction orchestration, KYC management, and API routing.
3. **Lisk Mainnet Smart Contracts** — The `FiatsendGatewayV2` contract (UUPS upgradeable, built with Hardhat) manages on-chain stablecoin operations including conversions, GHSFIAT minting/redemption, and MobileNumber NFT issuance.
4. **Mobile Money Providers** — Final settlement happens through local mobile money networks (MTN Mobile Money, Telecel Cash, AirtelTigo in Ghana).

:::info
Fiatsend uses **Lisk Mainnet** as its blockchain layer. All on-chain operations — stablecoin transfers, GHSFIAT minting, and MobileNumber NFT issuance — happen on Lisk.
:::

## Quick Links

| Section | What You'll Find |
|---|---|
| [Coverage](/docs/platform/coverage) | Supported countries, mobile money providers, and operation status |
| [Supported Stablecoins](/docs/platform/stablecoins) | All stablecoins available on the platform |
| [Fees & Limits](/docs/platform/fees-and-limits) | Transaction fees, KYC tier limits, and settlement timing |
| [GHSFIAT Stablecoin](/docs/platform/ghsfiat) | Deep dive into Fiatsend's native GHS-pegged stablecoin |
| [MobileNumber NFT](/docs/platform/mobilenumber-nft) | Identity, tiers, and privacy-preserving NFT design |
| [FiatsendOne](/docs/products/fiatsend-one) | The primary app for users, agents, and merchants |
| [Use Cases](/docs/products/use-cases) | How merchants, agents, consumers, and businesses use Fiatsend |

:::tip Getting Started
If you're a developer, start with the [FiatsendOne](/docs/products/fiatsend-one) product overview, then explore [Supported Stablecoins](/docs/platform/stablecoins) and [Fees & Limits](/docs/platform/fees-and-limits) to understand the platform mechanics.
:::
