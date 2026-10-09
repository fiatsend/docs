---
sidebar_position: 1
title: Security & Compliance
---

# Security & Compliance

Fiatsend applies compliance and risk controls as part of its payment flow. Requirements vary by product, corridor, payment amount, and risk profile.

## For Recipients

You may need to complete identity or account verification before you can access certain wallet or settlement features. Provide information only through Fiatsend's expected app, Console, or secure onboarding flow.

## For Businesses

Fiatsend works with businesses during onboarding to establish the applicable commercial, compliance, and operational requirements. Do not represent a corridor, settlement method, or capability as available until it is confirmed for your organization.

### API Keys and Webhooks

- Keep API keys on your server only. Never put them in a web page, a mobile app, or source control, and rotate a key from **Developers → API Keys** if you suspect it has leaked.
- Test keys (`fs_test_…`) and live keys (`fs_live_…`) are separate. Live keys need an activated account.
- Verify the `X-Fiatsend-Signature` header on every webhook before acting on it, and don't ship an order from a browser event alone. See [Website Checkout](/docs/payments/website-checkout#get-notified-with-webhooks).
- Confirm a mobile money or bank transfer only after you've seen the money in your own account.

## Report a Concern

If you suspect account compromise, fraud, or a security issue, contact [Support](/docs/resources/support) promptly. Do not send passwords, one-time codes, private keys, or sensitive identity documents by email.

