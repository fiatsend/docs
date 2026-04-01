---
sidebar_position: 2
title: "Supported Stablecoins"
---

# Supported Stablecoins

Fiatsend supports a curated set of stablecoins on Lisk Mainnet, chosen for their reliability, liquidity, and relevance to the corridors and use cases the platform serves. All stablecoin operations — transfers, conversions, and settlements — happen on-chain via the `FiatsendGatewayV2` smart contract.

## Stablecoin Directory

| Name | Symbol | Peg | Description | Network |
|---|---|---|---|---|
| Bridged USDC | USDC.e | USD | Bridged version of USD Coin, commonly found on Layer 2 networks. USDC.e represents USDC that has been bridged from Ethereum to Lisk Mainnet, maintaining a 1:1 peg to the US Dollar. | Lisk Mainnet |
| USD Coin | USDC | USD | Native USD-pegged stablecoin issued by Circle. USDC is fully backed by cash and short-term US Treasury bonds, with regular third-party attestations. | Lisk Mainnet |
| GHSFIAT | GHSFIAT | GHS | Fiatsend's native Ghanaian Cedi-pegged stablecoin. Designed for on-chain local currency settlement within the Fiatsend ecosystem. [Learn more →](/docs/platform/ghsfiat) | Lisk Mainnet |
| Tether | USDT | USD | The most widely adopted USD-pegged stablecoin by market capitalization. USDT is issued by Tether Limited and is commonly used for trading, remittances, and cross-border settlement. | Lisk Mainnet |
| Dai | DAI | USD | A decentralized, overcollateralized stablecoin backed by crypto assets and governed by Sky (formerly MakerDAO). DAI maintains its USD peg through a system of collateralized debt positions and autonomous feedback mechanisms — it is **not** algorithmic. | Lisk Mainnet |

## Why These Stablecoins?

Fiatsend selected this set of stablecoins based on several key criteria:

### Liquidity and Adoption
USDC and USDT are the two most liquid stablecoins globally, ensuring that users always have access to deep markets when converting to and from fiat. USDC.e provides additional flexibility for users bridging assets from Ethereum and other Layer 2 networks to Lisk.

### Decentralized Options
DAI offers a decentralized alternative for users who prefer a stablecoin that is not controlled by a single issuing entity. As an overcollateralized stablecoin governed by Sky (formerly MakerDAO), DAI provides resilience through its multi-collateral design and on-chain governance.

### Local Currency Representation
GHSFIAT is unique to the Fiatsend platform. It represents the Ghanaian Cedi on-chain, enabling local currency settlement without requiring off-chain fiat rails for every internal transaction. This is particularly powerful for merchant payments and agent settlements within Ghana. See the [GHSFIAT deep dive](/docs/platform/ghsfiat) for details on minting, redemption, and the peg mechanism.

### Network Consistency
All supported stablecoins operate on **Lisk Mainnet**, ensuring a consistent transaction experience, unified gas fee structure, and simplified integration for developers building on Fiatsend.

:::warning
**USDC vs USDC.e** — These are different tokens. USDC is the native Circle-issued token, while USDC.e is the bridged version from Ethereum. Make sure you are using the correct token address when integrating. Both are supported on Fiatsend, but they are not interchangeable on-chain without bridging.
:::

## Using Stablecoins on Fiatsend

Stablecoins on the Fiatsend platform can be used for:

1. **Conversion to Mobile Money** — Convert any supported stablecoin to GHS and receive the payout directly in your mobile money wallet (MTN Mobile Money, Telecel Cash, or AirtelTigo). See [Coverage](/docs/platform/coverage) for supported providers.

2. **Peer-to-Peer Transfers** — Send stablecoins directly to other Fiatsend users on Lisk Mainnet with near-instant settlement.

3. **Merchant Payments** — Pay merchants who accept Fiatsend via QR/scan-to-pay. The merchant can choose to settle in stablecoins or convert to mobile money.

4. **On-Chain Settlement** — Businesses can settle invoices and payroll in stablecoins, with recipients choosing their preferred off-ramp.

:::tip
When converting stablecoins to GHS, the exchange rate and fees are shown upfront in the [FiatsendOne app](https://app.fiatsend.com) before you confirm the transaction. Review the [Fees & Limits](/docs/platform/fees-and-limits) page for details on conversion spreads and payout fees.
:::

## Conversion Flow

Here's a simplified view of how a stablecoin-to-mobile-money conversion works:

```
User sends USDC          Fiatsend converts         GHS is sent to
to FiatsendGatewayV2  →  USDC → GHSFIAT on-chain  →  user's mobile money
(Lisk Mainnet)           (smart contract)              (MTN, Telecel, AirtelTigo)
```

The `FiatsendGatewayV2` contract handles the on-chain portion of this flow, including stablecoin escrow, rate calculation, and GHSFIAT minting. The off-chain payout to mobile money is orchestrated by the Fiatsend backend.

:::info Adding New Stablecoins
Fiatsend evaluates new stablecoins based on liquidity, security audits, regulatory standing, and availability on Lisk Mainnet. If you'd like to request support for a specific stablecoin, reach out to the Fiatsend team at [fiatsend.com](https://fiatsend.com).
:::
