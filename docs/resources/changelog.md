---
sidebar_position: 4
title: "Changelog"
---

# Changelog

This page tracks significant updates to the Fiatsend platform, including new features, improvements, and important changes. Entries are listed in reverse chronological order (newest first).

:::note
Subscribe to updates via the [Fiatsend community channels](/docs/resources/rewards-and-community) to get notified about new releases and upcoming features.
:::

---

## March 2026

### Domain Migration & Documentation Overhaul

- **Domain migration**: Fiatsend has fully migrated from the legacy domain `fiatsend.network` to **fiatsend.com**. All URLs, API endpoints, and references now use the new domain. Old domain links redirect automatically but should be updated in any integrations.
- **Mobile money provider names updated**: Vodafone Cash references have been updated to **Telecel Cash** across all documentation and in-app UI, reflecting Vodafone Ghana's rebrand to Telecel Ghana (originally completed March 2024).
- **Documentation overhaul**: Complete rewrite of the Fiatsend developer and user documentation, covering platform overview, account management, security, smart contracts, API reference, and resources.

---

## February 2026

### Enhanced KYC Flow & DAI Support

- **Streamlined KYC verification**: The in-app identity verification flow has been redesigned for faster completion. Users can now upload ID documents directly from their device camera with real-time quality checks, reducing rejection rates due to blurry or cropped images.
- **DAI stablecoin support**: DAI has been added as a [supported stablecoin](/docs/platform/stablecoins) on the platform. Users can now convert DAI to GHS and receive payouts to mobile money, alongside USDT, USDC, and USDC.e.
- **KYC status API**: A new `GET /api/users/kyc-status` endpoint allows programmatic checking of KYC verification progress and tier. See [API Overview](/docs/api/overview).

---

## January 2026

### FiatsendGatewayV2 Mainnet Deployment

- **FiatsendGatewayV2 on Lisk Mainnet**: The upgraded gateway contract has been deployed to Lisk Mainnet, replacing the V1 contract. V2 includes improved token management via the `TokenManager` library, decimal-aware calculations for multi-token support, and enhanced access control roles. See [Smart Contracts Architecture](/docs/contracts/architecture).
- **UUPS upgrade mechanism**: The contract now uses the UUPS (Universal Upgradeable Proxy Standard) pattern, enabling future upgrades without changing the contract address or disrupting user balances.
- **GHSFIAT token contract**: The [GHSFIAT](/docs/platform/ghsfiat) stablecoin contract has been deployed alongside the gateway, enabling on-chain GHS-pegged settlement.

---

## December 2025

### QR / Scan-to-Pay for Merchants

- **Static and dynamic QR codes**: Merchants can now generate QR codes for in-person and remote payments. Static QR codes are tied to the merchant's account (customer enters amount), while dynamic QR codes embed a specific amount and reference. See [Use Cases](/docs/products/use-cases) for details.
- **Merchant onboarding flow**: A guided onboarding flow for new merchants has been added to the FiatsendOne app, including business verification document upload, QR code generation, and payout setup.
- **Real-time payment notifications**: Merchants receive instant push notifications when a QR payment is completed, with transaction details visible immediately in the app.

---

## November 2025

### Bulk Disbursements & Webhook Improvements

- **Bulk disbursement feature**: Merchants and businesses can now process multiple payouts in a single batch via CSV upload or the API. The feature includes validation checks, summary previews, and approval workflows for organizations with Admin roles. See [Managing Funds](/docs/account/managing-funds).
- **Webhook system improvements**: The webhook delivery system has been rebuilt for reliability. Improvements include automatic retries with exponential backoff (up to 5 attempts), HMAC-SHA256 signature verification, and a webhook delivery log accessible from the developer settings page.
- **Transaction filtering and export**: The transaction history view now supports filtering by date range, asset type, and status, with CSV export for accounting and reconciliation purposes.

---

## October 2025 [Historical]

### Agent Network Launch

- **Agent role and commissions**: The Agent role has been introduced, allowing vetted individuals to facilitate cash-in and cash-out transactions for other users. Agents earn commissions on each transaction and can access day-end reconciliation reports.
- **Agent onboarding**: A dedicated onboarding path for agents includes identity verification, training materials, and operational guidelines.

---

## September 2025 [Historical]

### MobileNumber NFT & Tiered KYC

- **MobileNumber NFT**: The encrypted, non-transferable NFT identity system has been launched on Lisk Mainnet. Every new user receives a MobileNumber NFT at signup, serving as their identity pass on the Fiatsend network. See [MobileNumber NFT](/docs/platform/mobilenumber-nft).
- **Tiered KYC system**: Three verification tiers (Level 0, Level 1, Level 2) have been implemented, with transaction limits scaling based on the completed verification level. See [Fees & Limits](/docs/platform/fees-and-limits).

---

## August 2025 [Historical]

### Platform Beta Launch

- **FiatsendOne beta**: The FiatsendOne web application launched in beta at [app.fiatsend.com](https://app.fiatsend.com), enabling stablecoin-to-GHS conversions and mobile money payouts for users in Ghana.
- **Supported providers**: Initial mobile money support for MTN Mobile Money, Telecel Cash, and AirtelTigo.
- **Privy wallet integration**: Wallet-based authentication via Privy, supporting both embedded wallets and external wallet connections.

---

## July 2025 [Historical]

### Lisk Grant Award

- **AyaHQ x Lisk grant**: Fiatsend received a **$20K grant** from the AyaHQ x Lisk program to build payment infrastructure on the Lisk blockchain. This grant supports the development of the FiatsendGateway contract system and the GHSFIAT stablecoin.

---

## Related Pages

- [Fiatsend Overview](/docs/intro) — Platform introduction and architecture
- [Rewards & Community](/docs/resources/rewards-and-community) — Community channels for updates
- [Support](/docs/resources/support) — Help and contact information
