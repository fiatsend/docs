---
sidebar_position: 3
title: "Fees & Limits"
---

# Fees & Limits

Fiatsend is designed to be transparent about costs. All fees are displayed upfront in the [FiatsendOne app](https://app.fiatsend.com) before a user confirms any transaction. This page outlines the fee structure, transaction limits by KYC tier, and settlement timing so you know exactly what to expect.

## Conversion Fees

When converting stablecoins to local currency (GHS) or vice versa, the following fees apply:

| Fee Type | Description | Amount |
|---|---|---|
| Conversion Spread | The difference between the mid-market rate and the rate offered to the user. This covers FX risk and liquidity costs. | ~1–2% |
| Payout Fee | A flat fee charged when funds are disbursed to a mobile money wallet. Covers provider settlement costs. | [TBD] |
| Network Gas Fee | On-chain transaction fee on Lisk Mainnet. Typically very low due to Lisk's L2 architecture. | < $0.01 |

:::note
Conversion fees are applied as a spread — you will not see a separate line item for the conversion fee. The rate shown in-app already includes the spread. The payout fee, if applicable, is shown as a separate charge before confirmation.
:::

### Fee Breakdown Example

For a conversion of 100 USDC to GHS mobile money:

| Step | Amount |
|---|---|
| Stablecoin sent | 100.00 USDC |
| Conversion spread (~1.5%) | −1.50 USD equivalent |
| Payout fee | −[TBD] |
| Network gas | −< $0.01 |
| **GHS received (approx.)** | **~98.50 USD equivalent in GHS** |

:::info
The exact GHS amount depends on the live USD/GHS exchange rate at the time of conversion. Rates are fetched in real-time and locked for a short window after you initiate the transaction.
:::

## Transaction Limits by KYC Tier

Transaction limits on Fiatsend are tied to the user's [MobileNumber NFT](/docs/platform/mobilenumber-nft) tier, which corresponds to their KYC (Know Your Customer) verification level. Higher tiers unlock greater transaction volumes.

| Tier | KYC Level | Daily Limit | Monthly Limit | Single Transaction Limit |
|---|---|---|---|---|
| **Level 0** | No KYC — NFT minted at signup | [TBD] | [TBD] | [TBD] |
| **Level 1** | Phone number verified | [TBD] | [TBD] | [TBD] |
| **Level 2** | Full KYC — government-issued ID verified | [TBD] | [TBD] | [TBD] |

:::warning
Users at **Level 0** have significantly restricted limits. To access standard transaction volumes, complete at least Level 1 verification (phone verification) in the [FiatsendOne app](https://app.fiatsend.com). See the [MobileNumber NFT](/docs/platform/mobilenumber-nft) page for details on how tiers work and how to upgrade.
:::

### How Limits Work

- **Daily limits** reset at midnight UTC each day.
- **Monthly limits** reset on the first day of each calendar month at midnight UTC.
- **Single transaction limits** cap the maximum value of any individual transaction.
- Limits apply to the USD-equivalent value of the transaction at the time it is initiated, regardless of which stablecoin is used.
- If a transaction would cause you to exceed your remaining daily or monthly limit, it will be rejected with an error message indicating the remaining available amount.

## Caps by Operation

Different operations may have different caps, even within the same KYC tier:

| Operation | Description | Limit Basis |
|---|---|---|
| **Send** | Peer-to-peer or merchant payment in stablecoins | Per-transaction + daily + monthly |
| **Receive** | Incoming stablecoin transfers | No cap (subject to sender's limits) |
| **Convert (Off-Ramp)** | Stablecoin → GHS mobile money payout | Per-transaction + daily + monthly |
| **Convert (On-Ramp)** | GHS mobile money → stablecoin | Per-transaction + daily + monthly |

:::tip
If you are a business with higher volume requirements, contact the Fiatsend team to discuss custom limits and enterprise tier access.
:::

## Settlement Timing

How quickly funds arrive depends on the type of transaction:

| Transaction Type | Expected Settlement Time | Notes |
|---|---|---|
| On-chain stablecoin transfer | Near-instant (~2–5 seconds) | Lisk Mainnet block times are fast. Finality is typically achieved within seconds. |
| Stablecoin → GHS mobile money | 1–5 minutes | After on-chain confirmation, the payout to mobile money is initiated. Actual delivery depends on the mobile money provider's processing time. |
| GHS mobile money → stablecoin | 1–5 minutes | Once the mobile money collection is confirmed by the provider, the stablecoin is released on-chain. |
| QR / scan-to-pay (merchant) | Near-instant | On-chain settlement between Fiatsend wallets. Merchant sees payment confirmation in real-time. |

:::note
Settlement times for mobile money payouts depend on the provider (MTN Mobile Money, Telecel Cash, AirtelTigo). In rare cases, provider-side delays may extend settlement beyond 5 minutes. The transaction status is always trackable in the [FiatsendOne app](https://app.fiatsend.com).
:::

## Fee Changes and Transparency

Fiatsend reserves the right to adjust fees and limits as market conditions, provider costs, and regulatory requirements change. Any changes will be:

1. **Reflected in-app** — The FiatsendOne app always shows the current fee before you confirm a transaction.
2. **Communicated in advance** — Material changes to the fee structure will be announced through official Fiatsend channels.
3. **Documented here** — This page will be updated to reflect the latest fee schedule.

For the most current rates, always refer to the in-app confirmation screen before completing a transaction.
