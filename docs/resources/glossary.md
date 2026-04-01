---
sidebar_position: 3
title: "Glossary"
---

# Glossary

This glossary defines key terms used throughout the Fiatsend documentation and platform. Terms are listed alphabetically for quick reference.

---

### Agent

A Fiatsend account role for individuals or businesses that facilitate cash-in and cash-out transactions for other users. Agents serve as the physical bridge between cash and the digital Fiatsend ecosystem, earn commissions on transactions, and can onboard new merchants. See [Subaccounts & Roles](/docs/account/subaccounts-and-roles) for full role details.

### AirtelTigo

A mobile money provider in Ghana supported by Fiatsend for payouts and transfers. AirtelTigo is one of three major mobile money networks in the country alongside MTN Mobile Money and Telecel Cash.

### Backend

The server-side component of the Fiatsend platform used for user data management, authentication support, and orchestration logic. The backend provides database, storage, and function execution capabilities that complement the on-chain smart contract layer.

### Beneficiary

A verified mobile money account registered in a user's Fiatsend profile as a payout destination. Before sending funds to a mobile money account, the account must be added as a beneficiary with a verified phone number and provider. See [Managing Funds](/docs/account/managing-funds) for details on adding and managing beneficiaries.

### Bulk Disbursement

The process of sending payouts to multiple mobile money recipients in a single batch operation. Businesses use bulk disbursements for payroll, supplier payments, and other scenarios requiring many simultaneous payouts. Available via CSV upload or the [Fiatsend API](/docs/api/overview).

### Conversion (Offramp)

The process of converting stablecoins (e.g., USDT, USDC) to local fiat currency (e.g., GHS) for payout to a mobile money account. The conversion involves an on-chain swap to [GHSFIAT](#ghsfiat) followed by a mobile money transfer. Also referred to as "offramping" in web3 terminology. See [Fees & Limits](/docs/platform/fees-and-limits) for conversion rates.

### DAI

A decentralized, overcollateralized stablecoin backed by crypto assets and governed by Sky (formerly MakerDAO). DAI is pegged to the US dollar and is one of the [supported stablecoins](/docs/platform/stablecoins) on Fiatsend. Unlike algorithmic stablecoins, DAI maintains its peg through excess collateral locked in smart contracts.

### FiatsendGatewayV2

The primary smart contract deployed on Lisk Mainnet that handles stablecoin conversions, token management, and gateway operations for the Fiatsend platform. It uses the UUPS upgradeable proxy pattern and OpenZeppelin access control. See [Smart Contracts Architecture](/docs/contracts/architecture) for technical details.

### FiatsendOne

The primary Fiatsend application accessible at [app.fiatsend.com](https://app.fiatsend.com). FiatsendOne is used by consumers, agents, and merchants to send and receive payments, manage payouts, track transaction history, and access platform features. See [FiatsendOne](/docs/products/fiatsend-one) for a feature overview.

### GHSFIAT

Fiatsend's native Ghanaian Cedi stablecoin, pegged to the GHS and deployed on Lisk Mainnet. GHSFIAT is used as the settlement token for local currency operations within the Fiatsend ecosystem — when a user converts USDT to GHS, the intermediate on-chain representation is GHSFIAT. See [GHSFIAT Stablecoin](/docs/platform/ghsfiat) for details.

### JWT (JSON Web Token)

A compact, URL-safe token format used by Fiatsend for session authentication. After wallet-based login via Privy, the server issues a JWT that the client includes in the `Authorization` header of subsequent API requests. JWTs are signed with RS256 and have a configurable expiration period.

### KYC (Know Your Customer)

The identity verification process required to access higher transaction limits and platform features. Fiatsend implements tiered KYC: Level 0 (registration only), Level 1 (phone verified), and Level 2 (government ID + selfie). KYC tier is reflected in the user's [MobileNumber NFT](#mobilenumber-nft). See [Fees & Limits](/docs/platform/fees-and-limits) for limits by tier.

### Lisk

The Layer 1 blockchain network where Fiatsend's smart contracts are deployed and all on-chain transactions are settled. Lisk Mainnet provides the transparency, immutability, and cryptographic finality that underpin Fiatsend's payment rails. Fiatsend is a recipient of a $20K grant from AyaHQ x Lisk.

### MobileNumber NFT

An encrypted, non-transferable NFT minted on Lisk Mainnet at the time of user signup. The MobileNumber NFT is tied to the user's phone number and serves as a privacy-preserving identity pass on the Fiatsend network. The phone number is stored as an encrypted hash — never in plaintext on-chain. The NFT's tier (Level 0, 1, or 2) determines the user's transaction limits. See [MobileNumber NFT](/docs/platform/mobilenumber-nft) for full details.

### MTN Mobile Money

The largest mobile money provider in Ghana, widely known as "MoMo." MTN Mobile Money is supported by Fiatsend for payouts, cash-in, and cash-out operations. It is one of the most commonly used mobile money services across West Africa.

### Payout

The process of sending funds from a user's Fiatsend wallet to an external mobile money account. Fiatsend uses the term "payout" (rather than "withdrawal") to reflect that funds are being delivered to a beneficiary's mobile money account. Payouts involve stablecoin-to-fiat conversion and typically complete within 1–5 minutes. See [Managing Funds](/docs/account/managing-funds).

### Privy

The wallet infrastructure provider used by Fiatsend for user authentication. Privy supports embedded wallets (created automatically for users without existing wallets), external wallet connections (MetaMask, WalletConnect), and social login bridges for account recovery.

### QR / Scan-to-Pay

A payment method where a merchant displays a QR code (static or dynamic) that customers scan with the FiatsendOne app to initiate a payment. Static QR codes require the customer to enter the amount; dynamic QR codes include a pre-set amount. Available to accounts with the Merchant or Admin role.

### Sandbox

The test environment for Fiatsend development and integration testing. The sandbox mirrors the production platform but uses Lisk Testnet, simulated mobile money providers, and test data. Sandbox data is periodically reset. See [Sandbox & Testing](/docs/resources/sandbox-and-testing) for setup instructions.

### Stablecoin

A cryptocurrency designed to maintain a stable value relative to a reference asset, typically a fiat currency like the US dollar or Ghanaian cedi. Fiatsend supports multiple stablecoins including USDT, USDC, USDC.e, DAI, and [GHSFIAT](#ghsfiat). See [Supported Stablecoins](/docs/platform/stablecoins) for the full list.

### Telecel Cash

A mobile money provider in Ghana supported by Fiatsend. Telecel Cash is operated by Telecel Ghana, which was formerly known as Vodafone Ghana prior to the rebrand in March 2024. It is one of three major mobile money providers in Ghana.

### USDC (USD Coin)

A native USD-pegged stablecoin issued by Circle. USDC is fully backed by US dollar reserves and is one of the most widely used stablecoins in the ecosystem. Fiatsend supports USDC on Lisk Mainnet. See [Supported Stablecoins](/docs/platform/stablecoins).

### USDC.e (Bridged USDC)

A bridged version of USDC that has been transferred from Ethereum or another L1 to the Lisk network via a bridge contract. USDC.e is functionally equivalent to USDC for payment purposes but is a wrapped representation rather than a natively issued token.

### USDT (Tether)

The most widely adopted USD-pegged stablecoin by market capitalization. USDT is issued by Tether Limited and supported on Fiatsend for conversions and payouts. See [Supported Stablecoins](/docs/platform/stablecoins).

### UUPS (Universal Upgradeable Proxy Standard)

The smart contract upgrade pattern used by the FiatsendGatewayV2 contract. UUPS allows the contract logic to be upgraded without changing the contract address or losing state, enabling bug fixes and feature additions while preserving user balances and transaction history.

### Wallet

A blockchain address used to hold and transact stablecoins and other digital assets on Lisk Mainnet. Every Fiatsend user has a wallet — either an embedded wallet created by Privy during signup or an external wallet connected during onboarding. The wallet is the user's on-chain identity and holds their stablecoin balances.

### Webhook

An HTTP callback mechanism where Fiatsend sends real-time notifications to a registered URL when transaction events occur (e.g., `transaction.completed`, `transaction.failed`). Webhooks are signed with HMAC-SHA256 for authenticity verification. See [API Overview](/docs/api/overview) for webhook setup.

---

:::tip
Can't find a term? Check the [Fiatsend Overview](/docs/intro) for a high-level platform introduction, or contact **dev@fiatsend.com** for technical clarifications.
:::
