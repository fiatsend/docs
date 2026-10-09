---
sidebar_position: 1
title: Accepting Payments
description: The ways a business can collect payments with Fiatsend, and how to choose.
---

# Accepting Payments

Fiatsend gives businesses several ways to get paid. All of them live under **Payments** in [Fiatsend Console](/docs/products/fiatsend-console), share the same [payment settings](/docs/payments/payment-settings), and report their status in one place.

## Choose How You'll Collect

| I want to… | Use | How it works |
|---|---|---|
| Ask one customer to pay a specific amount, right now | [Payment links](/docs/payments/payment-links) | Create a link or QR code for an amount and send it by WhatsApp, SMS or any chat. |
| Bill a customer with itemised details and track whether they've paid | [Invoices](/docs/payments/invoices) | Build a branded invoice, send it by email or WhatsApp, and follow it from sent to paid. Receipts go out automatically. |
| Take payments on my website or app | [Website Checkout](/docs/payments/website-checkout) | Add a payment button, embed checkout in your page, or create checkouts from your server with the API. |

## Ways Your Customer Can Pay

| Method | What happens | Confirmed |
|---|---|---|
| **Fiatsend checkout** | The customer pays online with USDC on Stellar, from their own wallet, or from a Fiatsend balance if they sign in. | Automatically, once the payment is seen on the network. |
| **Mobile money** (Ghana cedi) | The customer sends money to your mobile money number, then taps *I've sent the payment*. | By you, after you check your account. |
| **Bank transfer** | The customer sends money to your bank account, then taps *I've sent the payment*. | By you, after you check your account. |

You choose which methods to offer, as a default in [Payment settings](/docs/payments/payment-settings) and again on each invoice, payment link or button. Mobile money is available for Ghana cedi amounts only.

### How Manual Payments Work

Mobile money and bank transfer go straight to your own account, so Fiatsend can't see them arrive. Instead:

1. The customer sees your account details and sends the money.
2. They tap **I've sent the payment**, and can add a mobile money transaction ID or bank sender details to help you match it.
3. You get an email (and a WhatsApp message if you have a phone number saved) asking you to check your account.
4. In **Payments → Invoices**, open **Review payment** and choose **Confirm received** or **I didn't receive it**.
   - **Confirm** marks it paid and sends the customer their receipt.
   - **I didn't receive it** closes the claim and tells the customer (by email and WhatsApp) so they can check the details and try again.

:::tip Only confirm money you can see
Confirming marks the payment as paid and sends a receipt. Check that the money has actually arrived in your account before you confirm.
:::

## Getting Paid and Seeing Your Balance

Online payments are sent to the Stellar wallet you've connected under **Linked accounts**. You can also fund and hold balances in **Account balances**. See [Fiatsend Console](/docs/products/fiatsend-console#account-balances-and-deposits).

## Receipts and Notifications

- **Receipts** go to your customer by email and WhatsApp (SMS if WhatsApp isn't available) as soon as a payment is confirmed, if you have receipts switched on. Each payment gets one receipt.
- **You** get an email when funds are deposited into your balance, and when a customer says they've paid by mobile money or bank transfer. If you've saved a phone number you also get a WhatsApp message (SMS if WhatsApp isn't available), which follows your WhatsApp notification setting. Choose which optional messages you receive under **Settings → Notifications**. Security and account notices are always sent.

## Test First

Switch the Console to **Sandbox** to try any of these without moving real money. See [Sandbox vs production](/docs/products/fiatsend-console#3-sandbox-vs-production).
