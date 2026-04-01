---
sidebar_position: 2
title: "Use Cases"
---

# Use Cases

Fiatsend is built around **reliable local payments** as its core use case. While the platform supports cross-border transfers as an add-on capability, the primary value proposition is making everyday payments — between merchants and customers, businesses and suppliers, employers and employees — faster, cheaper, and more transparent using stablecoin rails on Lisk Mainnet.

This page outlines how different participant types use the Fiatsend platform through the [FiatsendOne app](https://app.fiatsend.com).

## Merchants

### Accept QR / Scan-to-Pay

Merchants display a payment QR code at their point of sale — either printed or shown on a screen from the FiatsendOne app. When a customer scans the code, the payment is initiated instantly on-chain. The merchant receives a real-time notification confirming the payment, and the funds appear in their Fiatsend wallet within seconds. This eliminates the delays and reconciliation headaches common with traditional mobile money merchant payments, where confirmation can take minutes and disputes are difficult to resolve.

### Settle Payouts to Mobile Money

At the end of the business day — or at any time — merchants can convert their accumulated stablecoin or [GHSFIAT](/docs/platform/ghsfiat) balance to GHS and withdraw it directly to their mobile money wallet (MTN Mobile Money, Telecel Cash, or AirtelTigo). Settlement typically completes within 1–5 minutes, and the amount, fees, and exchange rate are all displayed upfront before the merchant confirms the payout. This gives merchants full control over when and how they access their earnings. See [Fees & Limits](/docs/platform/fees-and-limits) for payout fee details.

### Bulk Disbursements

Merchants and small businesses that need to pay multiple recipients — such as part-time staff, delivery riders, or suppliers — can use Fiatsend's bulk disbursement feature. Instead of initiating individual transactions, the merchant uploads a list of recipients and amounts, and Fiatsend processes the payments in a single batch. Each recipient receives their funds via mobile money, and the merchant gets a consolidated settlement report for bookkeeping.

:::tip
Merchants benefit most from **Level 2 KYC** verification, which unlocks the highest transaction limits and priority settlement. See [MobileNumber NFT](/docs/platform/mobilenumber-nft) for tier details.
:::

## Agents

### Cash-In / Cash-Out Facilitation

Agents are the physical bridge between cash and the digital Fiatsend ecosystem. A customer who wants to load funds onto the platform visits an agent, hands over cash, and the agent credits the equivalent stablecoin or GHSFIAT to the customer's Fiatsend wallet. Conversely, a customer who wants to withdraw funds gives the agent stablecoins or GHSFIAT from their wallet, and the agent hands over cash. Agents earn a commission on each transaction they facilitate, creating a sustainable incentive model for growing the network's physical presence.

### Merchant Onboarding

Agents play a key role in expanding the Fiatsend merchant network. When a local shop, market vendor, or service provider wants to accept Fiatsend payments, an agent walks them through the setup process — from downloading the app and creating an account, to generating their first payment QR code and completing KYC verification. This hands-on onboarding model is critical in markets like Ghana where in-person trust and guidance significantly accelerate adoption.

### Day-End Reconciliation

At the end of each operating day, agents reconcile their cash-on-hand with their digital balance in the FiatsendOne app. The app provides a transaction log showing every cash-in and cash-out facilitated during the day, along with commissions earned. Agents can then settle their digital balance to mobile money or hold it in [GHSFIAT](/docs/platform/ghsfiat) for the next day's operations. This reconciliation flow ensures agents maintain accurate books and can quickly identify any discrepancies.

:::info
Agents are vetted and onboarded by the Fiatsend team. If you're interested in becoming an agent, visit [fiatsend.com](https://fiatsend.com) to learn more about the agent program.
:::

## Consumers

### Pay Merchants

Consumers pay merchants by scanning the merchant's QR code in the FiatsendOne app. The payment flow is simple: scan, confirm the amount, and tap to pay. The transaction settles on-chain in seconds, and both the consumer and merchant receive instant confirmation. Consumers can pay from their stablecoin balance (USDC, USDT, DAI) or from their [GHSFIAT](/docs/platform/ghsfiat) balance — the app handles the conversion automatically if needed.

### Send to Contacts

Peer-to-peer transfers are straightforward. Consumers can send stablecoins or GHSFIAT to any other Fiatsend user by entering their phone number or selecting them from their saved beneficiaries. The recipient receives the funds in their Fiatsend wallet instantly. This is particularly useful for splitting bills, repaying friends, or sending money to family members who are also on the platform.

### Withdraw to Mobile Money

When consumers need their funds in local currency, they can convert stablecoins or GHSFIAT to GHS and withdraw to their mobile money wallet. The conversion rate and fees are shown upfront, and the payout typically arrives within 1–5 minutes. Supported providers in Ghana include MTN Mobile Money, Telecel Cash, and AirtelTigo. See [Coverage](/docs/platform/coverage) for the full provider list.

### Track Transaction History

Every transaction a consumer makes — payments, transfers, conversions, and withdrawals — is recorded in their transaction history within the FiatsendOne app. Each entry includes the amount, counterparty, timestamp, fees, status, and the on-chain transaction hash for verification. This complete audit trail makes it easy to track spending, resolve disputes, and maintain personal financial records.

:::note
Consumers start at **Level 0** (no KYC) with limited functionality. Completing **Level 1** phone verification unlocks standard transaction limits — enough for most everyday payment needs. See [MobileNumber NFT](/docs/platform/mobilenumber-nft) for details.
:::

## Businesses (B2B)

### Payroll Disbursements

Businesses can use Fiatsend to disburse salaries and wages to employees across Ghana. By uploading a payroll list to the platform, the business triggers bulk payments that are settled to each employee's mobile money wallet. This is faster and more reliable than traditional bank-to-mobile-money transfers, which can take hours or even days to clear. Employees receive their pay directly in their mobile money account, and the business gets a downloadable settlement report for accounting.

### Supplier Payments

Paying suppliers — especially small and medium-sized vendors who operate primarily on mobile money — is a natural fit for Fiatsend. Businesses load stablecoins into their Fiatsend account and initiate payments to supplier mobile money numbers. The supplier receives GHS in their mobile money wallet within minutes, and the on-chain settlement record provides both parties with a verifiable proof of payment. This reduces the back-and-forth of manual bank transfers and eliminates the ambiguity of "pending" payments.

### Reliable Settlement

One of the core challenges for businesses operating in emerging markets is unreliable settlement. Payments get stuck, reconciliation is manual, and disputes are common. Fiatsend addresses this by anchoring every transaction to an on-chain record on Lisk Mainnet. The stablecoin leg of the transaction settles in seconds with cryptographic finality, and the mobile money payout is tracked end-to-end with status updates visible in the FiatsendOne app. This dual-layer approach — on-chain settlement plus mobile money delivery confirmation — gives businesses the confidence that payments actually arrive.

:::tip
Businesses with high-volume payment needs should contact the Fiatsend team to discuss **enterprise tier** access, which includes custom transaction limits, dedicated support, and API integration for automated disbursements.
:::

## Summary

| Role | Primary Use Case | Key Benefit |
|---|---|---|
| **Merchant** | Accept payments, settle to mobile money | Instant confirmation, transparent fees |
| **Agent** | Cash-in/out, merchant onboarding | Earn commissions, expand the network |
| **Consumer** | Pay, send, withdraw | Simple UX, fast settlement |
| **Business** | Payroll, supplier payments, settlement | Reliable, auditable, bulk-capable |

## Related Pages

- [FiatsendOne](/docs/products/fiatsend-one) — The app where all these use cases come to life
- [Coverage](/docs/platform/coverage) — Supported countries and mobile money providers
- [Fees & Limits](/docs/platform/fees-and-limits) — Transaction fees and limits by KYC tier
- [GHSFIAT Stablecoin](/docs/platform/ghsfiat) — The local currency stablecoin used for GHS settlement
- [MobileNumber NFT](/docs/platform/mobilenumber-nft) — Identity tiers that gate transaction access
