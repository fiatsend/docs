---
sidebar_position: 3
title: "Managing Funds"
---

# Managing Funds

Fiatsend provides a complete set of tools for moving money into, within, and out of the platform. This page covers how to deposit stablecoins, initiate payouts to mobile money, accept payments via QR codes, process bulk disbursements, and track your transaction history.

## Deposits

Depositing funds into your Fiatsend account means transferring stablecoins into your Fiatsend wallet on Lisk Mainnet. Once credited, these stablecoins are available for conversion, transfer, or payout.

### Stablecoin Deposit

The most direct way to fund your account is to send supported stablecoins to your Fiatsend wallet address.

1. Open the FiatsendOne app at [app.fiatsend.com](https://app.fiatsend.com).
2. Navigate to **Wallet → Deposit**.
3. Copy your Lisk Mainnet wallet address or scan the displayed QR code.
4. From your external wallet, send any [supported stablecoin](/docs/platform/stablecoins) (USDC, USDC.e, USDT, DAI, or [GHSFIAT](/docs/platform/ghsfiat)) to that address.
5. The deposit is credited once the transaction is confirmed on Lisk Mainnet — typically within seconds.

:::warning
Only send tokens on **Lisk Mainnet**. Tokens sent on other networks (Ethereum, Arbitrum, Base, etc.) will not be credited and may be permanently lost. Always double-check the network before sending.
:::

### Bank-to-Stablecoin (via Partners)

For users who don't already hold stablecoins, Fiatsend provides on-ramp options through partner services. These allow you to purchase stablecoins using bank transfers or card payments, which are then deposited directly into your Fiatsend wallet. Available on-ramp partners vary by country — check the FiatsendOne app for current options.

## Payouts

A **payout** is the process of converting stablecoins to local currency and sending them to a mobile money account. Fiatsend uses the term "payout" rather than "withdrawal" to reflect that funds are being delivered to an external beneficiary account.

### Initiating a Payout

1. Navigate to **Wallet → Payout** in the FiatsendOne app.
2. Select the stablecoin you want to convert (e.g., USDT, USDC).
3. Enter the amount.
4. Select or add a **beneficiary** — a verified mobile money account. Supported providers in Ghana include:
   - MTN Mobile Money
   - Telecel Cash
   - AirtelTigo
5. Review the conversion rate, fees, and the GHS amount the beneficiary will receive. All costs are shown **before** you confirm.
6. Confirm the payout.

The stablecoin is converted to [GHSFIAT](/docs/platform/ghsfiat) on-chain, then settled to the beneficiary's mobile money account. See [Fees & Limits](/docs/platform/fees-and-limits) for current rates and limits.

:::tip
Always verify the beneficiary's phone number and mobile money provider before initiating a payout. Once confirmed, payouts cannot be reversed.
:::

### Payout Statuses

| Status | Meaning |
|---|---|
| **Pending** | Payout initiated, awaiting on-chain confirmation |
| **Processing** | On-chain leg complete, mobile money transfer in progress |
| **Completed** | Funds delivered to the beneficiary's mobile money account |
| **Failed** | Payout could not be completed — funds returned to your Fiatsend wallet |

### Failed Payouts

If a payout fails (e.g., due to an invalid phone number, provider downtime, or exceeding the recipient's mobile money limit), the stablecoin amount is **automatically returned to your Fiatsend wallet**. No fees are charged for failed payouts. You can reattempt the payout after resolving the issue.

## QR & Scan-to-Pay

Merchants can accept payments by generating QR codes that customers scan with the FiatsendOne app. This is the fastest way to accept in-person payments.

### Static QR Codes

A static QR code is tied to the merchant's account but does not include a specific amount. The customer scans the code, enters the payment amount, and confirms. Static QR codes are ideal for:

- Physical storefronts (printed QR code at the register)
- Market vendors with variable pricing
- Service providers who quote prices verbally

### Dynamic QR Codes

A dynamic QR code includes a pre-set amount and optional reference/description. The customer scans and confirms — no manual entry needed. Dynamic QR codes are ideal for:

- Online invoices with a specific total
- Fixed-price goods or services
- Event tickets or admission fees

To generate either type, navigate to **Payments → QR Code** in the FiatsendOne app.

:::info
QR/scan-to-pay is available to accounts with the **Merchant** or **Admin** role. See [Subaccounts & Roles](/docs/account/subaccounts-and-roles) for role details.
:::

## Bulk Disbursements

Merchants and businesses can process multiple payouts in a single operation using bulk disbursements. This is designed for payroll, supplier payments, and any scenario where you need to pay many recipients at once.

### CSV Upload

1. Navigate to **Payments → Bulk Disbursement** in the FiatsendOne app.
2. Download the CSV template.
3. Fill in recipient details: phone number, mobile money provider, amount (GHS), and an optional reference.
4. Upload the completed CSV.
5. Review the summary: total amount, total fees, number of recipients, and any validation errors.
6. Submit for processing.

Example CSV format:

```csv
phone_number,provider,amount_ghs,reference
+233241234567,mtn,50.00,January salary
+233551234567,telecel,75.00,January salary
+233261234567,airteltigo,60.00,January salary
```

### API-Based Disbursements

For automated or recurring bulk payments, use the [Fiatsend API](/docs/api/overview) to submit disbursement batches programmatically. This is ideal for integrating Fiatsend into your payroll or ERP system.

### Approval Workflow

For organizations with the Admin role configured, bulk disbursements can require approval before processing:

1. A Merchant or subaccount submits the bulk disbursement.
2. The Admin receives a notification to review.
3. The Admin approves or rejects the batch.
4. Upon approval, payouts are processed.

This adds a layer of oversight for high-value or high-volume operations.

## Transaction History & Reports

Every transaction on Fiatsend — deposits, payouts, conversions, peer-to-peer transfers, and QR payments — is recorded in your transaction history.

### Viewing History

Navigate to **Transactions** in the FiatsendOne app. Each transaction entry includes:

| Field | Description |
|---|---|
| **Date & time** | When the transaction occurred |
| **Type** | Deposit, payout, conversion, transfer, or payment |
| **Amount** | Value in the original currency/token |
| **Counterparty** | Recipient or sender (phone number or wallet address) |
| **Status** | Pending, processing, completed, or failed |
| **Fees** | Fees charged for the transaction |
| **TX hash** | On-chain transaction hash for verification on Lisk block explorer |

### Filtering & Export

You can filter transactions by:

- **Date range** — Custom start and end dates
- **Asset** — Filter by specific stablecoin (USDT, USDC, GHSFIAT, etc.)
- **Status** — Show only completed, pending, or failed transactions
- **Type** — Filter by transaction type

Filtered results can be exported as a **CSV file** for accounting, reconciliation, or reporting purposes. Navigate to **Transactions → Export** and select your filters before downloading.

### Analytics

Merchant and Admin accounts have access to analytics dashboards that include:

- Daily, weekly, and monthly transaction volume
- Revenue breakdown by payment method
- Payout success rates
- Top beneficiaries by volume

## Settlement Timing

| Leg | Timing |
|---|---|
| **On-chain (stablecoin)** | Instant — confirmed on Lisk Mainnet within seconds |
| **Mobile money payout** | 1–5 minutes — depends on the mobile money provider and network conditions |
| **End-to-end** | Typically under 5 minutes from initiation to mobile money delivery |

:::note
During peak hours or provider maintenance windows, mobile money payouts may experience delays beyond the typical 1–5 minute range. The FiatsendOne app shows real-time payout status so you can track delivery.
:::

## Related Pages

- [Account & Access](/docs/account/access) — Account creation and authentication
- [Subaccounts & Roles](/docs/account/subaccounts-and-roles) — Roles and permissions for team use
- [Fees & Limits](/docs/platform/fees-and-limits) — Current fee schedule and transaction limits
- [Coverage](/docs/platform/coverage) — Supported countries and mobile money providers
- [API Overview](/docs/api/overview) — Programmatic access for automated operations
