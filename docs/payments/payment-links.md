---
sidebar_position: 2
title: Payment Links
description: Create a payment link or QR code for a customer and track it until it's paid.
---

# Payment Links

A payment link asks one customer to pay a set amount. You create it in the Console, send it by WhatsApp, SMS or any chat, or show it as a QR code. Use [invoices](/docs/payments/invoices) when you need itemised billing, or [Website Checkout](/docs/payments/website-checkout) when the payment happens on your own site.

## Create a Payment Link

1. Open **Payments → Receive payments**.
2. Choose the **target region** (Ghana is live) and enter the **amount**, in cedi or USDC.
3. Enter the **customer's phone number** in international format (for example `+233241234567`), and an optional description.
4. Choose **who pays the fee** and **how long the link stays open** (both default to your [Payment settings](/docs/payments/payment-settings)).
5. Optionally, under **Accept payment by**, tick mobile money and/or bank transfer in addition to Fiatsend checkout (see [below](#also-accept-mobile-money-or-bank-transfer)).
6. Choose **Create payment link**.

You get a link, a QR code, and buttons to send it to the customer on **WhatsApp** or **SMS**. A countdown shows how long the link has left.

:::info The rate is locked when the link is created
For links priced in cedi, the amount of USDC the customer pays is worked out when you create the link and stays fixed until it expires. A shorter deadline limits how long a customer can pay at an older exchange rate.
:::

## What Your Customer Sees

The customer opens the link (on `pay.fiatsend.com`) and sees who they're paying, the amount, and the time left. There's **no verification code to enter**. They pay in one of these ways:

- **Browser wallet.** Pay with a Stellar wallet extension such as Freighter, Albedo or xBull.
- **Mobile wallet.** Scan the QR code with a Stellar wallet that supports it.
- **Fiatsend balance.** Customers with a Fiatsend account can choose *Sign in instead* and pay from their balance.

When the payment is confirmed, the page shows it as paid. Confirmation usually takes under a minute. If the customer pays by scanning a QR code on a phone and never returns to the page, the link is still marked paid, because Fiatsend watches for the payment itself.

## Fees and Deadline

- **Fee.** Fiatsend charges a fee on Fiatsend checkout payments. You choose whether you absorb it or add it to what the customer pays, as a default in [Payment settings](/docs/payments/payment-settings), and you can change it for any single link. See [Fees & Limits](/docs/platform/fees-and-limits).
- **Deadline.** Links stay open for **7 days** unless you choose otherwise: 1 hour, 6 hours, 24 hours, 3 days or 7 days. Set a default in Payment settings and override it per link under **Link expires after**. An expired link can't be paid; create a new one.

## Also Accept Mobile Money or Bank Transfer

For Ghana cedi links you can offer mobile money and bank transfer alongside Fiatsend checkout. When you tick one of them:

- The customer gets a page showing how to pay (your mobile money number or bank details, saved under [Payment settings](/docs/payments/payment-settings)) with an **I've sent the payment** button. You can also add a **customer email** so they get the link, any "couldn't confirm" notice and their receipt by email.
- These links open an invoice-style page. They appear in **Payments → Invoices** with a **PL-** number and a "Payment link" tag, and stay open until you cancel them.
- You confirm manually: see [how manual payments work](/docs/payments/overview#how-manual-payments-work).

Links offering only Fiatsend checkout keep the standard instant flow described above.

## Track and Follow Up

The link's status updates live on the page as it moves from waiting, to confirming on Stellar, to paid. You'll also see a **payment received** notice when it lands. Links created with manual methods are tracked in **Payments → Invoices**.

## In-Person Payments

Businesses with the right account status can also create **terminal QR codes** for in-person checkout from the same page. Enable **Accept payments** under **Account balances** first.
