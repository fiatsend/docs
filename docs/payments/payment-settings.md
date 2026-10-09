---
sidebar_position: 5
title: Payment Settings
description: Set your default payment methods, who pays the fee, and how long payment links stay open.
---

# Payment Settings

**Payments → Payment settings** holds the defaults for every payment link, invoice and website checkout you create. You can still change them for an individual one when you create it. Teammates can view these settings. Changing them needs the right permission, and who pays the fee and the payment deadline can only be changed by the account owner.

## Ways to Get Paid

Choose which methods new invoices, links and buttons offer by default, and save the account details customers are told to pay into:

- **Fiatsend checkout.** Needs a Stellar wallet connected under **Linked accounts**.
- **Mobile money** (Ghana cedi only). Network (MTN, Telecel or AirtelTigo), number, and the name on the account.
- **Bank transfer.** Bank name, account name, account number and optionally the branch.

Leave a section blank to clear its saved details. Saved details are copied onto each invoice when it's created, so changing them later doesn't alter invoices you've already sent.

## Payment Link Fees

Fiatsend charges a collection fee on payments made through Fiatsend checkout (see [Fees & Limits](/docs/platform/fees-and-limits)). Choose who pays it by default:

| Choice | The customer pays | You receive |
|---|---|---|
| **I pay the fee** (default) | Exactly the amount you asked for | The amount minus the fee |
| **Customer pays the fee** | The amount plus the fee, added at checkout | The full amount you asked for |

This applies to payment links, invoices and website checkout. Mobile money and bank transfer payments go directly to your own account and aren't processed by Fiatsend, so this fee doesn't apply to them.

## Payment Deadline

How long a payment link stays open for the customer to pay: **1 hour, 6 hours, 24 hours, 3 days or 7 days**. If you haven't chosen, it's **7 days**.

The deadline applies to new payment links and to the checkout link on your invoices and website checkouts. For invoices, it's how long the payment window stays open each time a customer presses **Pay**; the invoice's own due date is separate (set per invoice, with a default under **Invoices → Customize**).

:::info Longer deadlines mean an older exchange rate
The exchange rate is locked when a payment link is created. A longer deadline lets a customer pay at an older rate, which can cost you if the rate moves against you. Choose a shorter deadline if that matters for your pricing.
:::

## Other Settings

- **Notifications.** Under **Settings → Notifications**, choose whether you get deposit emails, deposit WhatsApp messages and product tips. Security and account notices are always sent.
- **Sign-in email.** Change your sign-in email under **Settings**. The new address must be confirmed through a link, and your old address is told when it's requested and when it's done.
