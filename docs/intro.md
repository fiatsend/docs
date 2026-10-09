---
sidebar_position: 1
slug: /intro
title: Fiatsend Overview
---

# Fiatsend Overview

Fiatsend is payment infrastructure for businesses paying and getting paid across Africa. A business can send payouts, and collect payments from customers with payment links, invoices, or checkout on its own website.

For a payout, a business sends a request; Fiatsend locks the conversion, applies compliance controls, and delivers funds to the recipient's Fiatsend wallet.

Recipients can keep funds in their wallet or choose an available local settlement method. A recipient who is new to Fiatsend receives a secure link to finish onboarding and claim the payout—funds are not lost because an account did not exist at the time of payment.

## Start in the Right Place

| You want to… | Start here |
|---|---|
| Receive, hold, or settle money | [Fiatsend Wallet](/docs/products/fiatsend-one) |
| Understand a received payment | [Managing funds](/docs/account/managing-funds) |
| Manage a business account | [Fiatsend Console](/docs/products/fiatsend-console) |
| Get paid by customers | [Accepting payments](/docs/payments/overview): [payment links](/docs/payments/payment-links), [invoices](/docs/payments/invoices) |
| Take payments on my website | [Website Checkout](/docs/payments/website-checkout) |
| Check business use cases and coverage | [Use cases](/docs/products/use-cases) and [Coverage](/docs/platform/coverage) |
| Build an integration | [Developer Documentation](https://developer.fiatsend.com) |

## How a Payout Works

1. A business creates a payout in [Fiatsend Console](/docs/products/fiatsend-console) or through the Fiatsend API.
2. Fiatsend validates the request, locks the applicable conversion, and runs required controls.
3. Funds arrive in the recipient's Fiatsend wallet (or settle via the configured Stellar / local rail).
4. The recipient holds the balance or uses an available settlement option, including automatic settlement where enabled.

:::info Developer documentation
This site explains the Fiatsend product and how to use it, including the [Website Checkout](/docs/payments/website-checkout) integration guide. The full API contract, SDKs, sandbox, and endpoint reference are maintained at [developer.fiatsend.com](https://developer.fiatsend.com).
:::

## How a Customer Payment Works

1. A business creates a payment link, an invoice, or a checkout on its website, and chooses how customers can pay: Fiatsend checkout, mobile money, or bank transfer.
2. The customer pays. With Fiatsend checkout the payment is confirmed automatically; with mobile money or bank transfer the customer says they've sent it and the business confirms.
3. The customer gets a receipt, and the business sees the payment's status in [Fiatsend Console](/docs/products/fiatsend-console).

See [Accepting payments](/docs/payments/overview) for the details.

## What Fiatsend Is Not

Fiatsend is a payment technology company, not a bank. Funds held in a Fiatsend wallet are not bank deposits and are not covered by government deposit insurance.

