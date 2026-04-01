---
sidebar_position: 1
title: "FiatsendOne"
---

# FiatsendOne

FiatsendOne is the primary application for interacting with the Fiatsend platform. It is the single interface where consumers make payments, merchants accept them, and agents facilitate cash-in/cash-out operations. Built as a progressive web app with an Android APK on the way, FiatsendOne provides a unified experience for all participant types in the Fiatsend ecosystem.

## What Is FiatsendOne?

FiatsendOne is the app that brings together everything on the Fiatsend platform — wallet management, stablecoin conversion, mobile money payouts, QR-based payments, beneficiary management, and transaction history. Rather than building separate apps for consumers, merchants, and agents, Fiatsend consolidates all roles into a single application with role-specific features and views.

The app is available today on the web and will be available as a native Android APK soon:

| Platform | Access |
|---|---|
| **Web** | [app.fiatsend.com](https://app.fiatsend.com) |
| **Android** | APK coming soon |
| **iOS** | Planned |

:::tip
You can use FiatsendOne right now by visiting [app.fiatsend.com](https://app.fiatsend.com) in any modern browser on desktop or mobile. No installation required.
:::

## Key Features

### Pay and Get Paid
FiatsendOne supports instant payments via QR code scanning. Merchants generate a payment QR code, and customers scan it to pay — directly from their stablecoin balance or by converting on the fly. Payments settle on-chain on Lisk Mainnet, giving both parties a transparent, verifiable record of every transaction.

### Payout to Mobile Money
Users can convert their stablecoin balance to GHS and receive the funds directly in their mobile money wallet. Supported providers in Ghana include MTN Mobile Money, Telecel Cash, and AirtelTigo. Payouts typically arrive within 1–5 minutes. See [Coverage](/docs/platform/coverage) for the full list of supported providers by country.

### Manage Beneficiaries
Save frequently used recipients (mobile money numbers, wallet addresses) as beneficiaries for faster repeat payments. Beneficiaries are stored securely and can be organized by name or phone number for quick lookup.

### Track Transaction History
Every transaction — sends, receives, conversions, and payouts — is logged in your transaction history with full details: amount, fee, status, timestamp, and on-chain transaction hash. This provides a complete audit trail for personal use or business reconciliation.

### Stablecoin Wallet
FiatsendOne includes a built-in wallet for holding and managing supported stablecoins (USDC, USDC.e, USDT, DAI, and [GHSFIAT](/docs/platform/ghsfiat)) on Lisk Mainnet. Users can view balances, send tokens, and initiate conversions — all from within the app.

### Identity and KYC Management
Users manage their [MobileNumber NFT](/docs/platform/mobilenumber-nft) and KYC verification status directly in the app. Upgrade from Level 0 to Level 1 (phone verification) or Level 2 (full KYC) to unlock higher transaction limits.

## Authentication

FiatsendOne uses **wallet-based login via Privy** with JWT sessions. This means:

- Users authenticate by connecting or creating a wallet — no traditional username/password.
- Privy handles the wallet connection flow, supporting both existing crypto wallets and embedded wallets for users new to web3.
- After authentication, a JWT session is established with the Fiatsend backend, enabling secure API access without repeated wallet signatures.

:::info
Users do not need prior crypto experience to use FiatsendOne. Privy's embedded wallet feature creates a wallet for the user behind the scenes, so the experience feels like a standard mobile money app.
:::

## User Roles

FiatsendOne serves three primary user roles, each with tailored features:

### Consumer
The default role for individual users. Consumers can send payments to other users or merchants, receive funds, convert stablecoins to mobile money, and manage their beneficiaries. This is the role most users start with when they sign up for Fiatsend.

**Key actions:**
- Send stablecoins to other Fiatsend users
- Pay merchants via QR scan
- Convert stablecoins to GHS and withdraw to mobile money
- View transaction history and manage beneficiaries

### Agent
Agents are trusted intermediaries who facilitate cash-in and cash-out operations in the Fiatsend network. They serve customers who want to load funds onto the platform or withdraw funds to cash. Agents hold a [GHSFIAT](/docs/platform/ghsfiat) working balance and earn commissions on transactions they facilitate.

**Key actions:**
- Process cash-in (customer gives cash, agent credits stablecoins/GHSFIAT)
- Process cash-out (customer redeems stablecoins/GHSFIAT, agent gives cash)
- Onboard new merchants to the Fiatsend network
- Perform day-end reconciliation of cash and digital balances

### Merchant
Merchants use FiatsendOne to accept payments from customers, manage their incoming transaction flow, and settle earnings to mobile money. Merchants can display a payment QR code at their point of sale and receive near-instant confirmation when a customer pays.

**Key actions:**
- Generate and display payment QR codes
- Receive payments in stablecoins or GHSFIAT
- Settle accumulated balances to mobile money
- View sales and transaction reports

:::note
Role-specific features are enabled based on your account configuration. Contact the Fiatsend team or your onboarding agent to set up a merchant or agent account.
:::

## Getting Started

1. **Visit** [app.fiatsend.com](https://app.fiatsend.com) in your browser.
2. **Authenticate** using Privy — connect an existing wallet or let Privy create one for you.
3. **Complete onboarding** — provide your phone number to mint your [MobileNumber NFT](/docs/platform/mobilenumber-nft).
4. **Verify your phone** (Level 1 KYC) to unlock standard transaction limits.
5. **Fund your wallet** with supported stablecoins or receive funds from another user.
6. **Start transacting** — send, receive, convert, or pay.

## Related Pages

- [Use Cases](/docs/products/use-cases) — Detailed scenarios for merchants, agents, consumers, and businesses
- [Coverage](/docs/platform/coverage) — Supported countries and mobile money providers
- [Fees & Limits](/docs/platform/fees-and-limits) — Transaction fees and tier-based limits
- [MobileNumber NFT](/docs/platform/mobilenumber-nft) — Identity, tiers, and verification
- [Supported Stablecoins](/docs/platform/stablecoins) — All tokens available in FiatsendOne
