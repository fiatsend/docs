---
sidebar_position: 3
title: Invoices
description: Create branded invoices, send them to customers, and track payment and receipts.
---

# Invoices

Invoices let you bill a customer with itemised details, send them by email or WhatsApp, and follow each one from sent to paid. Payment is confirmed automatically for Fiatsend checkout, or by you for mobile money and bank transfer, and the customer gets a receipt either way.

You'll find invoices under **Payments → Invoices**.

## Create an Invoice

1. Choose **New invoice**.
2. **Customer.** Pick someone from your customer list or add a new one (name, email, phone, address). You can save them for next time.
3. **Invoice details.** The invoice number is assigned automatically (for example `INV-0001`). Set the issue date, a due date, and any note or terms.
4. **Get paid.** Choose the currency (GHS or USDC) and tick how the customer can pay: Fiatsend checkout, mobile money (GHS only), and/or bank transfer. Your saved [payment details](/docs/payments/payment-settings) are filled in for you.
5. **Items.** Add what you're billing for, with quantities and prices, and an optional discount and tax percentage. The discount comes off the subtotal, then tax is charged on the discounted amount.
6. Choose **Create & send** (email and/or WhatsApp) or **Save draft**.

A live preview on the right shows exactly what your customer will see.

:::note Drafts can be edited, sent invoices can't
Once an invoice is sent, the amount can't change under the customer. To correct a mistake, cancel the invoice and issue a new one.
:::

## What Your Customer Sees

The customer gets a link to a page at `console.fiatsend.com/i/…` showing the invoice, your branding and how to pay. They can print it or save it as a PDF. It stays valid until it's paid or cancelled, even after the due date.

- **Fiatsend checkout.** A **Pay** button takes the customer to a secure payment page, and brings them back to the invoice afterwards, where it shows as paid. If the invoice doesn't have a Ghana phone number, they're asked for one.
- **Mobile money / bank transfer.** They see your account details, send the money, and tap **I've sent the payment**.

## Track Every Invoice

The invoice list shows the total awaiting payment, overdue and paid, and each invoice's status:

| Status | Meaning |
|---|---|
| Draft | Not sent yet. You can edit or delete it. |
| Awaiting payment | Sent. Shows whether the customer has opened it. |
| Overdue | Sent, and the due date has passed. It can still be paid. |
| Paid | Payment confirmed. Shows when and how (Fiatsend, mobile money, bank transfer, or marked paid). |
| Cancelled | Withdrawn by you. The customer can no longer pay it. |

Online payments are picked up automatically, normally within about a minute. An invoice with a customer payment waiting for you shows an amber **Review payment** badge. For each invoice you can also **send a reminder**, **check for payment**, **copy the invoice link**, **mark as paid** (for money received outside Fiatsend), **resend the receipt**, or **cancel**.

## Receipts

When an invoice is paid, whether online, confirmed by you, or marked paid, the customer is sent a receipt by **email** and by **WhatsApp** (SMS if WhatsApp isn't available). Each invoice gets one receipt, and you can resend it from the invoice's menu. Replies to the email go to your business contact address. You can switch automatic receipts off under **Customize**.

## Make Invoices Your Own

Choose **Customize** on the Invoices page to set how your invoices look and read:

- Logo and accent colour.
- Business name, contact email and phone, address and tax or registration ID.
- Invoice number prefix (for example `INV-`).
- Default note, footer text and default number of days until due (7 by default).
- Whether to send receipts automatically.

A live preview updates as you type. The business logo appears on the invoice page; emails use the Fiatsend header.

## Customers

The **Customers** tab keeps your address book: add, edit and remove the people you bill, and search by name, email or phone. Editing or removing a customer doesn't change invoices you've already created. They keep the details they were sent with.

## Invoices from Payment Links and Website Checkout

[Payment links](/docs/payments/payment-links#also-accept-mobile-money-or-bank-transfer) with manual methods, and [Website Checkout](/docs/payments/website-checkout) sessions, are stored as invoices too (numbered `PL-…` and `CS-…`). So they share the same tracking, receipts and **Review payment** flow. Abandoned website checkouts are hidden from this list until they're paid or have a payment to review; **Website checkout → Activity** shows all of them.
