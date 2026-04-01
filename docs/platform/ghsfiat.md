---
sidebar_position: 4
title: "GHSFIAT Stablecoin"
---

# GHSFIAT Stablecoin

GHSFIAT is Fiatsend's native Ghanaian Cedi (GHS) pegged stablecoin, deployed on Lisk Mainnet. It brings the Ghanaian Cedi on-chain, enabling local currency settlement, merchant payments, and internal platform operations without requiring an off-chain fiat leg for every transaction. GHSFIAT is a core building block of the Fiatsend ecosystem, bridging the gap between global stablecoins (like USDC and USDT) and local mobile money rails.

## What Is GHSFIAT?

GHSFIAT is an ERC-20 token on Lisk Mainnet that represents a claim on one Ghanaian Cedi. It is minted and redeemed through the `FiatsendGatewayV2` smart contract, which manages the lifecycle of GHSFIAT tokens — from issuance when users convert stablecoins to GHS, to burning when users redeem GHSFIAT for mobile money payouts.

Unlike global stablecoins that are pegged to the US Dollar, GHSFIAT is pegged to the **Ghanaian Cedi (GHS)**, making it ideal for:

- Local merchant payments denominated in GHS
- On-chain settlement between Fiatsend users in Ghana
- Reducing the need for repeated fiat on/off-ramp transactions within the ecosystem
- Enabling GHS-denominated smart contract interactions

:::info
GHSFIAT is designed for use within the Fiatsend ecosystem. While it is a standard ERC-20 token on Lisk Mainnet and can be held in any compatible wallet, its primary utility and liquidity are within the Fiatsend platform.
:::

## How the GHS Peg Works

GHSFIAT maintains its peg to the Ghanaian Cedi through a mint-and-burn mechanism managed by the `FiatsendGatewayV2` contract:

1. **Minting** — When a user converts a USD-denominated stablecoin (e.g., USDC) to GHS on Fiatsend, the contract calculates the GHS equivalent using the current USD/GHS exchange rate, then mints the corresponding amount of GHSFIAT.

2. **Redemption (Burning)** — When a user redeems GHSFIAT for a mobile money payout, the tokens are burned on-chain and the equivalent GHS is disbursed to the user's mobile money wallet via the connected provider (MTN Mobile Money, Telecel Cash, or AirtelTigo).

3. **Rate Oracle** — The USD/GHS exchange rate is sourced from a rate feed and applied at the time of each conversion. The rate is locked for a short confirmation window to protect both the user and the platform from slippage.

```
Mint Flow:
  User sends 100 USDC → FiatsendGatewayV2 → Mints ~1,500 GHSFIAT (at rate 1 USD = 15 GHS)

Redeem Flow:
  User sends 1,500 GHSFIAT → FiatsendGatewayV2 → Burns GHSFIAT → Sends GHS 1,500 to mobile money
```

:::note
The exchange rate in the example above is illustrative. The actual rate is determined in real-time and displayed in the [FiatsendOne app](https://app.fiatsend.com) before confirmation. See [Fees & Limits](/docs/platform/fees-and-limits) for details on conversion spreads.
:::

## Minting and Redemption Flow

### Minting (Stablecoin → GHSFIAT)

The minting flow is triggered when a user converts a supported stablecoin to GHS within the Fiatsend platform:

1. The user initiates a conversion in the [FiatsendOne app](https://app.fiatsend.com), selecting the source stablecoin and the GHS amount.
2. The app displays the current exchange rate, fees, and the amount of GHSFIAT to be minted.
3. Upon confirmation, the user's stablecoin is transferred to the `FiatsendGatewayV2` contract on Lisk Mainnet.
4. The contract verifies the transfer, applies the locked exchange rate, and mints the corresponding GHSFIAT to the user's wallet.
5. The user now holds GHSFIAT, which can be used for payments, held, or redeemed for mobile money.

### Redemption (GHSFIAT → Mobile Money)

The redemption flow converts GHSFIAT back into fiat GHS and delivers it to a mobile money wallet:

1. The user initiates a payout in FiatsendOne, selecting GHSFIAT as the source and their mobile money account as the destination.
2. The app displays the payout amount and any applicable fees.
3. Upon confirmation, the GHSFIAT is sent to the `FiatsendGatewayV2` contract and burned.
4. The Fiatsend backend triggers a mobile money disbursement to the user's selected provider.
5. The user receives GHS in their mobile money wallet, typically within 1–5 minutes.

:::tip
GHSFIAT can also be transferred between Fiatsend users on-chain without redemption. This is useful for merchant payments and peer-to-peer transfers where both parties operate within the Fiatsend ecosystem.
:::

## Use Within the Fiatsend Ecosystem

GHSFIAT serves several critical roles in the platform:

### Local Payments
Merchants and agents in Ghana can price goods and services in GHS and settle on-chain in GHSFIAT. This eliminates the need to convert to USD-denominated stablecoins for local transactions, reducing friction and FX exposure.

### Internal Settlement
When Fiatsend processes a conversion from USDC to mobile money, GHSFIAT is used as the intermediate settlement layer on-chain. This provides a transparent, auditable record of every GHS-denominated transaction on Lisk Mainnet.

### Agent Operations
Agents who facilitate cash-in and cash-out operations hold GHSFIAT as their working balance. This allows them to serve customers instantly without waiting for fiat settlement cycles.

### Merchant Payouts
Merchants can accumulate GHSFIAT from customer payments and redeem it to mobile money at the end of the day, or hold it on-chain for future use.

## Smart Contract Details

GHSFIAT is managed by the `FiatsendGatewayV2` smart contract, which is deployed on Lisk Mainnet and built with the following architecture:

| Property | Detail |
|---|---|
| **Contract** | FiatsendGatewayV2 |
| **Standard** | ERC-20 |
| **Network** | Lisk Mainnet |
| **Upgradeability** | UUPS (Universal Upgradeable Proxy Standard) |
| **Framework** | Hardhat |
| **Key Functions** | `mint()`, `burn()`, `convert()`, `redeem()` |

The UUPS proxy pattern allows the Fiatsend team to upgrade the contract logic (e.g., adding new stablecoin pairs or adjusting rate mechanisms) without changing the token address or disrupting existing balances.

:::warning
Do not send GHSFIAT to the contract address directly outside of the Fiatsend app. Always use the FiatsendOne app or the official API to initiate conversions and redemptions. Direct transfers to the contract may result in loss of funds.
:::

## Related Pages

- [Supported Stablecoins](/docs/platform/stablecoins) — See all stablecoins available on Fiatsend
- [Fees & Limits](/docs/platform/fees-and-limits) — Conversion spreads, payout fees, and tier-based limits
- [MobileNumber NFT](/docs/platform/mobilenumber-nft) — How identity tiers affect transaction limits for GHSFIAT operations
- [Coverage](/docs/platform/coverage) — Mobile money providers and country support for GHSFIAT payouts
