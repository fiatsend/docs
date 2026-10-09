---
sidebar_position: 1
title: Fiatsend Console
---

# Fiatsend Console

[Fiatsend Console](https://console.fiatsend.com) is the business workspace for teams that collect payments and send payouts with Fiatsend. Use it to manage your organization, connect a Stellar wallet, collect payments (payment links, invoices and website checkout), fund and hold balances, run single or batch payouts, and track settlement status.

:::info What this guide covers
This page is the operator guide for Console. API credentials, request formats, and webhooks live in the [Developer Documentation](https://developer.fiatsend.com).
:::

## Typical Uses

- Set up and manage your business account (sandbox → production).
- Connect a Stellar wallet and [collect payments](/docs/payments/overview): payment links and QR codes, branded invoices with automatic receipts, and checkout on your own website.
- Accept Fiatsend checkout, mobile money and bank transfer, and choose who pays the fee.
- Fund your balance with USDC or USDT and [see deposits credited automatically](#account-balances-and-deposits).
- Create single and bulk Stellar payouts (including mobile-money recipients).
- Review payout activity, on-chain references, and local settlement status.
- Manage team access, API keys, webhooks and notification preferences.

Exact features depend on your organization status, role, and corridor. If something expected is missing, contact [Support](/docs/resources/support).

---

## Get Started

### 1. Create Your Business Account

1. Open [console.fiatsend.com](https://console.fiatsend.com).
2. Register with a **company-managed email**, company name, and contact details.
3. After signup, your account starts in **pending** status while Fiatsend reviews the registration.
4. When sandbox access is granted, status becomes **verified** (sandbox). You can sign in and use testnet Stellar flows.

Use one account per teammate. Do not share passwords. Invite colleagues from **Team** once you can sign in.

### 2. Account Statuses

| Status | Meaning | What you can do |
|---|---|---|
| Pending | Registration received, not yet unlocked | Wait for activation; see pending screen |
| Verified / sandbox | Sandbox unlocked | Stellar testnet wallet, payment links, Stellar payouts, API sandbox keys |
| Active | Production approved (after KYB / Go live) | Live corridors, production keys, production payouts |
| Suspended | Access revoked | Contact Support |

### 3. Sandbox vs Production

| | Sandbox | Production |
|---|---|---|
| Console status | `verified` / sandbox | `active` |
| Stellar network | **Testnet** (default) | Mainnet (only when enabled for your org) |
| API keys | `fs_test_…` | `fs_live_…` |
| Local MoMo settlement | Simulated refs (`sim_momo_*`) unless a live rail is configured | Live provider refs after go-live |
| Payment links, invoices, website checkout | Test mode: buttons and checkouts are marked **Test mode** and use the Stellar test network | Real payments |
| Balances | Separate sandbox balances | Your live balances |
| How to upgrade | Complete **Go live / KYB** in Settings when ready | Fiatsend activates after KYB approval |

Sandbox and Live are kept apart: payment buttons, invoices and balances you create in one don't appear in the other. Switch between them with the toggle at the top of the sidebar (available once your account is active).

Sandbox Setup in Console walks through API health, rates, and webhook smoke tests. For Stellar operator flows, stay on this page.

---

## Find Your Way Around

The sidebar groups Console into four sections. Which items you see depends on your account status and your role.

| Section | Pages | What they're for |
|---|---|---|
| **Main** | Dashboard, Account balances, Linked accounts, Swap | Your overview, balances and deposits, your connected Stellar wallet, and converting stablecoins to cedi. |
| **Payments** | Receive payments, Invoices, Website checkout, Payouts, Payment settings | Everything about collecting and sending money. See [Accepting Payments](/docs/payments/overview). |
| **Developers** | Sandbox Setup, API Keys, Webhooks | Credentials and notifications for integrating by code. |
| **Account** | Team, Settings | People, sign-in email and notification preferences. |

---

## Stellar Wallet on Testnet

<a id="stellar-wallet-testnet"></a>

Connect a Stellar wallet so your business can receive USDC and fund / operate Stellar payouts on testnet.

### Prerequisites

- Console account in **verified**, **sandbox**, or **active** status.
- [Freighter](https://freighter.app/) (or another supported wallet such as xBull) installed in your browser.
- Freighter network set to **Testnet** (not Public / mainnet).

### Steps

1. In Console, open **Linked accounts**.
2. Choose **Connect Stellar wallet** and approve the connection in Freighter / xBull.
3. Sign the bind challenge when prompted. Console stores your Stellar **G-address** for your organization.
4. Add a **USDC trustline** for the Circle testnet issuer (the wallet panel shows the issuer and a Stellar Lab link).
5. Claim testnet USDC from the [Circle Stellar faucet](https://faucet.circle.com/) using your G-address.
6. Click **Refresh** in the wallet panel until the USDC balance appears.

### Checklist

| Step | Done when |
|---|---|
| Freighter installed | Extension available in browser |
| Network = Testnet | Freighter Settings → Network → Testnet |
| Wallet bound in Console | Linked accounts shows your G-address |
| USDC trustline | Balance panel can show USDC (even if 0) |
| Faucet funded | Non-zero testnet USDC balance |
| Balance refreshed | Panel matches Horizon / Freighter |

:::tip Troubleshooting wallet bind
- **Wrong network** — Freighter must be on Testnet while Console is in sandbox.
- **Signature failed** — Re-run connect; challenges expire quickly.
- **Balance still zero** — Confirm trustline + faucet address match the bound G-address, then refresh.
:::

---

## Collect Payments

Everything for getting paid lives under **Payments**. See [Accepting Payments](/docs/payments/overview) for how to choose, or go straight to:

| Page | Use it to |
|---|---|
| **Receive payments** | Create a [payment link or QR code](/docs/payments/payment-links) for a customer, or an in-person terminal QR. |
| **Invoices** | Create [branded invoices](/docs/payments/invoices), manage customers, and track payment and receipts. |
| **Website checkout** | Accept payments on your own site with a [payment button, embedded checkout or the API](/docs/payments/website-checkout). |
| **Payment settings** | Set your [default payment methods, who pays the fee and the payment deadline](/docs/payments/payment-settings). |

Fiatsend checkout needs a bound Stellar wallet (see above). On testnet, payers should use Stellar testnet wallets and USDC. Mobile money and bank transfer don't need a wallet; you save your account details in Payment settings and confirm each payment yourself.

---

## Recipients

For Stellar payouts you can:

- Enter a recipient inline (Stellar **G-address** and/or mobile-money details).
- Save recipients from the single-payout form for reuse.
- Upload a **CSV** for bulk payouts (see below).

CSV columns follow the sample file in Console (**Download sample CSV** on the Stellar payouts tab). Typical fields include amount, destination type, Stellar address and/or phone + network for MoMo.

---

## Send Payouts (Single and Batch)

Stellar disbursements run through Fiatsend’s integration with the **Stellar Disbursement Platform (SDP)** on testnet.

### Before You Send

- Wallet bound under **Linked accounts**.
- Account status allows payouts (`verified` / sandbox or `active`).
- KYB tier is not blocked (pending / rejected KYB cannot submit payouts).

### Single Payout

1. Open **Payouts** → **Stellar (USDC)**.
2. Choose a saved recipient or enter a Stellar G-address and/or MoMo destination.
3. Enter the USDC amount and submit.
4. Watch the batch/item status until on-chain and local settlement states complete.

### Bulk (Batch) Payout

1. On the Stellar payouts tab, download the **sample CSV**.
2. Add at least one row per recipient (for volume testing, use **20+** rows).
3. Upload the CSV and submit the batch.
4. Repeat as needed. Batch list and item table poll automatically (~5–10s).

### Status Meanings

| State (examples) | Meaning |
|---|---|
| Queued / pending | Accepted; waiting for SDP / chain work |
| On-chain pending / complete | Stellar payment in flight or confirmed |
| Local settlement pending | On-chain done; waiting for local MoMo / settlement step |
| Local settled | Terminal success; includes a local settlement reference |
| Failed | Terminal failure — inspect item error in Console |

Dual tracking: each item can show an **on-chain transaction hash** (link to [Stellar Expert](https://stellar.expert) when real) and a **local settlement reference**.

:::note Simulated vs real settlement
In sandbox, mobile-money local settlement commonly uses simulated refs such as `sim_momo_*`. Mock SDP hashes are labeled **(simulated)** and are not explorer-verifiable. Real SDP testnet hashes open on Stellar Expert.
:::

---

## SEP-24 and Local Off-Ramp (Testnet)

Tranche 2 testnet work includes SEP-24 interactive deposit/withdraw against a Stellar anchor.

| Path | Status in Fiatsend |
|---|---|
| SEP-10 / SEP-24 protocol (MoneyGram testnet) | Implemented and smoke-tested in the Fiatsend consumer stack |
| SeevCash mobile-money rail | Scaffolded; live keys optional — sandbox accepts `sim_momo_*` |
| Yellowcard | Not the current Console off-ramp path |

Businesses operating in Console primarily see **payout item status + local settlement refs**. Interactive SEP-24 hosted UI is part of the consumer / anchor integration, not a separate Console screen.

---

## Track Activity and Reconcile

1. **Payouts → Stellar** — batch dashboard and per-item table.
2. Open an item to copy the Stellar tx hash and local settlement reference.
3. For real testnet hashes, verify on [stellar.expert (testnet)](https://stellar.expert/explorer/testnet).
4. Keep CSV upload files and batch IDs for your internal ops log.

---

## Account Balances and Deposits

**Account balances** shows your balances and how to add money.

- **Stablecoin balances** hold USDC and USDT. Fund them on **Stellar**, **Polygon** or **BNB Chain**. Pick the network and asset, then send to the address shown.
- **USDC on Stellar** uses a shared Fiatsend address plus a **memo that is unique to your business**. You must include the memo; without it Fiatsend can't tell the deposit is yours and it can't be credited automatically. Copy the memo from the page every time rather than typing it.
- **Deposits are credited automatically**, usually within about a minute of the transaction landing. The page refreshes itself, and there's a button to check right now.
- **You're notified.** When a real deposit is credited you get an email, and a WhatsApp message if you've saved a phone number. You can turn these off under **Settings → Notifications**. Test deposits in Sandbox don't send notifications.
- **Swap.** Use **Swap** to convert stablecoins into your cedi (GHS) balance.

If a deposit hasn't appeared after a few minutes, check that you used the right network and included the memo, then contact [Support](/docs/resources/support) with the transaction hash.

---

## Settings and Notifications

Under **Settings** you can:

- **Change your sign-in email.** Enter your password and the new address. We send a one-time link to the new address, and your account switches only after you confirm it. Your old address is told both when you start the change and when it completes.
- **Choose which messages you get.** Deposit emails, deposit WhatsApp messages and product tips are optional. Security and account notices (sign-in alerts, password and email changes, account status, invites) are always sent. Team members can see these preferences, but only the account owner can change them.
- **Go live.** When you're ready for production, complete **Go live / KYB**.

---

## Team, Security, and Support

- Invite teammates from **Team** with least-privilege roles.
- Remove access when someone leaves.
- Report unexpected access via [Support](/docs/resources/support).
- Integrations and webhook signatures: the [Website Checkout guide](/docs/payments/website-checkout) for checkout, and [developer.fiatsend.com](https://developer.fiatsend.com) for the rest of the API.

### Common Issues

| Symptom | What to try |
|---|---|
| Cannot see Linked accounts / Stellar tab | Confirm account is verified/sandbox/active, not pending |
| Wallet connect fails | Freighter on Testnet; retry bind; clear expired challenge |
| CSV rejected | Match sample headers; valid G-addresses; amounts > 0 |
| Status stuck on local settlement | Wait for poll (~15s in mock MoMo); refresh batch detail |
| Explorer link missing | Hash may be simulated — labeled in UI |
| Production features locked | Complete Go live / KYB; wait for `active` status |

---

## Integrations

Console supports your integration lifecycle. Technical implementation details live in the [Developer Documentation](https://developer.fiatsend.com): API credentials, request formats, webhooks, sandbox testing, and production requirements.

## Access and Security

Use a company-managed email address, give each teammate their own account, and remove access when a teammate changes roles. Report unexpected access or account activity through [Support](/docs/resources/support).
