---
sidebar_position: 1
title: Glossary
---

# Glossary

### Auto-Settlement

A recipient preference that sends an incoming wallet payment to an available local settlement method automatically. Availability depends on the recipient's location and account.

### Checkout Session

One customer's payment through [Website Checkout](/docs/payments/website-checkout): created by a payment button or by your server through the API, with a hosted page the customer pays on. A session is `open`, `complete` or `cancelled`.

### Corridor

A supported payment route, typically defined by the destination country and its available delivery methods.

### Fiatsend Checkout

The online way for a customer to pay a business: USDC on Stellar from their own wallet, or from a Fiatsend balance. Confirmed automatically. Compare with manual payments (mobile money and bank transfer).

### Fiatsend Console

The business workspace at [console.fiatsend.com](https://console.fiatsend.com) for organizations using Fiatsend. See the [Console guide](/docs/products/fiatsend-console).

### Stellar Disbursement Platform (SDP)

Stellar infrastructure Fiatsend uses to send single and batch USDC payouts from Console on testnet and (when enabled) mainnet.

### Stellar Wallet Binding

A business-linked Stellar account (G-address) connected in Console under Linked accounts, used for receiving USDC and operating Stellar payouts.

### Local Settlement Reference

An identifier for the off-chain / mobile-money leg of a payout (for example `sim_momo_*` in sandbox). Shown alongside the on-chain transaction hash in Console.

### Fiatsend Wallet

The recipient balance and activity experience in the Fiatsend app. Payouts sent through Fiatsend arrive here before a recipient manages or settles them.

### Invoice

A bill sent to a customer from Console, with items, a due date, and options for how to pay. Invoices have a public page, track their status through to paid, and send a receipt automatically. See [Invoices](/docs/payments/invoices).

### Manual Payment

A mobile money or bank transfer payment. The customer sends money to the business's own account and tells the business they've sent it; the business checks its account and confirms. See [Accepting Payments](/docs/payments/overview#how-manual-payments-work).

### Payment Button

A reusable checkout for one product or price, created in Console and added to a website as a button or link. See [Website Checkout](/docs/payments/website-checkout).

### Payment Link

A link or QR code that asks one customer to pay a set amount. See [Payment links](/docs/payments/payment-links).

### Payout

A payment initiated by a business to a recipient through Fiatsend.

### Recipient

The individual who receives a Fiatsend payout in their wallet.

### Settlement

Moving funds from a Fiatsend wallet through an available local delivery option. Methods, availability, and timing vary by corridor.

### Verification

Account or identity checks required for a product feature, payment amount, corridor, or risk profile.

### Webhook

An automated event notification delivered to a business system, signed so the business can verify it came from Fiatsend. For example, `checkout.session.completed` is sent when a website checkout is paid. See [Website Checkout](/docs/payments/website-checkout#get-notified-with-webhooks).

