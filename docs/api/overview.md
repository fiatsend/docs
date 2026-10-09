---
sidebar_position: 3
title: Developer Documentation
---

# Developer Documentation

The Fiatsend API is documented at [developer.fiatsend.com](https://developer.fiatsend.com). This site also includes a full integration guide for taking payments on your website.

## Website Checkout API

Create checkout sessions from your server and get notified with signed webhooks:

```
POST https://api.fiatsend.com/v1/checkout/sessions
Authorization: Bearer fs_test_YOUR_KEY
```

Test keys (`fs_test_…`) create test checkouts and live keys (`fs_live_…`) create live ones, at the same address. See the [Website Checkout guide](/docs/payments/website-checkout) for requests, responses, errors, webhooks and signature verification.

## Developer Portal

Use the developer portal as the source of truth for:

- API authentication and production access.
- Endpoint and payload definitions.
- SDKs, sandbox testing, rate limits, and error handling.
- Webhook delivery and signature verification.

Apart from the Website Checkout guide, this site intentionally does not duplicate the full API reference. Keeping one technical source of truth prevents integration drift and ensures developers always see the current contract.

