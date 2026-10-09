---
sidebar_position: 4
title: Website Checkout
description: Accept Fiatsend payments on your own website with a payment button, an embeddable checkout, or the API.
---

# Website Checkout

Website Checkout lets customers pay you on your own website or app, with a hosted, secure checkout you don't have to build. Pick the option that fits how much code you want to write:

| Option | Code needed | Best for |
|---|---|---|
| [**Payment button**](#option-1-payment-button-no-code) | None | A product or price you sell repeatedly. Paste a link or button, or share the link in a message. |
| [**Embedded checkout**](#option-2-embed-checkout-on-your-page) | A few lines of HTML | Opening checkout in a popup from your own page, and reacting when the customer pays. |
| [**API and webhooks**](#option-3-the-api) | Server code | Carts and orders, where your server sets the exact amount and fulfils the order when it's paid. |

All three use the same secure Fiatsend checkout and show up in one place: **Payments → Website checkout** in [Fiatsend Console](/docs/products/fiatsend-console).

:::info What customers can pay with
Each button or checkout can offer **Fiatsend checkout** (customers pay online and it's confirmed automatically), **mobile money**, and **bank transfer**. Mobile money and bank transfer are manual: the customer sends money to your own account, tells you they've sent it, and you confirm. See [Payment settings](/docs/payments/payment-settings) for how to set up each one.
:::

## Before You Start

1. **Choose how you get paid.** To accept Fiatsend checkout, connect a Stellar wallet under **Linked accounts**. To accept mobile money or bank transfer, save those account details under **Payments → Payment settings**.
2. **Try it in Sandbox first.** Switch the Console to **Sandbox** (top of the sidebar). Everything you create in Sandbox is for testing and is kept separate from Live. See [Testing and going live](#testing-and-going-live).

The **Get started** tab in Website Checkout shows a short checklist and ticks items off as you complete them.

---

## Option 1: Payment Button (No Code)

A payment button is a reusable checkout for one product or price.

1. Open **Payments → Website checkout → Payment buttons** and choose **New button**.
2. Enter a **name**, an optional description, the **price** and currency (GHS or USDC), and tick the payment methods you accept.
3. Optionally add a **success URL** (where to send customers after they pay) and a **cancel URL**. These must be `https://` addresses.
4. Save, then choose **Get code** to copy what you need:
   - **Button**: an HTML snippet that opens checkout in a popup.
   - **Link**: a plain link that works anywhere: your site, an email, a social post or a chat.
   - **JavaScript**: open checkout from your own code.
   - **QR code**: for print or a screen.

When a customer uses the button they see what they're buying, who from and the price, enter their details (name, email for the receipt, and optionally a phone number), and continue to pay. Each use creates a separate checkout, so you can see and track every customer in **Activity**.

You can **pause** a button at any time (customers will see that it isn't accepting payments), edit it, or delete it. Changing the price only affects future checkouts. Existing ones keep the price they were created with.

---

## Option 2: Embed Checkout on Your Page

Add one script and one button to any web page:

```html
<script src="https://console.fiatsend.com/fiatsend-checkout.js"></script>
<button data-fiatsend-checkout="YOUR_BUTTON_ID">Pay with Fiatsend</button>
```

Your **button ID** is shown in the code for each payment button in the Console (**Get code**). Clicking the button opens Fiatsend checkout in a small popup window on your page. If the customer's browser blocks popups, they're taken to checkout in the same tab instead, so nobody gets stuck.

:::note Why a popup and not an iframe
Customers who pay with a browser wallet need the wallet extension to work, and browser extensions don't work inside a cross-origin iframe. A popup keeps every payment method working.
:::

### Open Checkout from Your Own Code

```javascript
// A payment button
Fiatsend.checkout.open({ link: "YOUR_BUTTON_ID" });

// A checkout session you created with the API (see Option 3)
Fiatsend.checkout.open({ session: "cs_..." });

// Use a normal redirect instead of a popup
Fiatsend.checkout.open({ link: "YOUR_BUTTON_ID", mode: "redirect" });
```

You can also add `data-fiatsend-session="cs_..."` to a button, and `data-fiatsend-mode="redirect"` to skip the popup.

### React When the Customer Pays

```javascript
Fiatsend.checkout.on("paid", function (e) {
  // e.sessionId is the checkout session
  showThankYouMessage();
});
Fiatsend.checkout.on("cancel", function (e) { /* customer chose to go back */ });
Fiatsend.checkout.on("close",  function ()  { /* customer closed the window */ });
```

The same events are also fired on `document` as `fiatsend:paid`, `fiatsend:cancel` and `fiatsend:close`.

:::warning Don't ship orders on the browser event alone
The browser event tells your page what happened so you can update the screen. It can be missed (the customer may close the tab) and isn't proof of payment. **Always confirm payment on your server** with a [webhook](#get-notified-with-webhooks) or by [fetching the session](#fetch-a-session) before you fulfil an order.
:::

---

## Option 3: The API

For a shopping cart or any order where your server decides the amount, create a **checkout session** from your server, send the customer to it, and confirm payment with a webhook.

### Base Address and Authentication

```
https://api.fiatsend.com/v1/checkout/sessions
```

Authenticate with an API key from **Developers → API Keys** in the Console:

```
Authorization: Bearer fs_test_YOUR_KEY
```

- `fs_test_…` keys create **test** checkouts. `fs_live_…` keys create **live** checkouts and need an activated account.
- The same address is used for both. The key decides the mode.
- API keys are secrets. Use them on your server only, never in browser code or a mobile app.

### Create a Session

```bash
curl -X POST https://api.fiatsend.com/v1/checkout/sessions \
  -H "Authorization: Bearer fs_test_YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 50.00,
    "currency": "GHS",
    "description": "Order 1042",
    "client_reference_id": "order_1042",
    "customer": { "email": "ama@example.com" },
    "success_url": "https://yourshop.com/thanks?session={SESSION_ID}",
    "cancel_url": "https://yourshop.com/cart",
    "metadata": { "plan": "basic" }
  }'
```

| Field | Required | Description |
|---|---|---|
| `amount` | Yes | The price in major units, for example `50.00`. Must be more than 0. |
| `currency` | No | `GHS` (default) or `USDC`. |
| `description` | No | What the customer is paying for. Shown on the checkout page and receipt. |
| `client_reference_id` | No | Your own order ID (up to 100 characters). Returned on the session and in webhooks. |
| `customer` | No | Optional `name`, `email` and `phone` (international format, e.g. `+233241234567`). With an email, the customer gets a receipt by email. |
| `success_url` | No | Where to send the customer after paying. `https://` only (`http://localhost` is allowed for testing). `{SESSION_ID}` is replaced with the session ID; if the URL has no placeholder, `session_id` is added as a query parameter. |
| `cancel_url` | No | Where to send the customer if they go back without paying. Same rules as `success_url`. |
| `metadata` | No | Up to 20 string key/value pairs, returned unchanged. |
| `accepted_methods` | No | Any of `fiatsend`, `mobile_money`, `bank_transfer`. Defaults to the methods saved in your [Payment settings](/docs/payments/payment-settings). |

The response is the session:

```json
{
  "id": "cs_5f1c…",
  "object": "checkout.session",
  "status": "open",
  "url": "https://console.fiatsend.com/i/5f1c…",
  "amount": 50,
  "currency": "GHS",
  "description": "Order 1042",
  "client_reference_id": "order_1042",
  "metadata": { "plan": "basic" },
  "customer": { "name": null, "email": "ama@example.com", "phone": null },
  "accepted_methods": ["fiatsend"],
  "success_url": "https://yourshop.com/thanks?session={SESSION_ID}",
  "cancel_url": "https://yourshop.com/cart",
  "paid_at": null,
  "paid_via": null,
  "livemode": false,
  "created_at": "2026-10-08T09:00:00.000Z"
}
```

Send the customer to `url` (a redirect, or open it with `Fiatsend.checkout.open({ session: session.id })`). The session stays open until it is paid or cancelled.

**Node.js**

```javascript
// Run this on your server, never in the browser: your API key is a secret.
const res = await fetch("https://api.fiatsend.com/v1/checkout/sessions", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${process.env.FIATSEND_API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    amount: 50.0,
    currency: "GHS",
    description: "Order 1042",
    client_reference_id: "order_1042",
    success_url: "https://yourshop.com/thanks?session={SESSION_ID}",
    cancel_url: "https://yourshop.com/cart",
  }),
});
const session = await res.json();
// Redirect the customer to session.url
```

**Python**

```python
import os, requests

res = requests.post(
    "https://api.fiatsend.com/v1/checkout/sessions",
    headers={"Authorization": f"Bearer {os.environ['FIATSEND_API_KEY']}"},
    json={
        "amount": 50.0,
        "currency": "GHS",
        "description": "Order 1042",
        "client_reference_id": "order_1042",
        "success_url": "https://yourshop.com/thanks?session={SESSION_ID}",
        "cancel_url": "https://yourshop.com/cart",
    },
)
session = res.json()  # redirect the customer to session["url"]
```

### Fetch a Session

```
GET https://api.fiatsend.com/v1/checkout/sessions/{id}
GET https://api.fiatsend.com/v1/checkout/sessions?limit=25
```

The first returns one session. The second lists your most recent sessions (up to 100) in the mode of the key you use. A session's `status` is:

| Status | Meaning |
|---|---|
| `open` | Created and waiting for payment. |
| `complete` | Paid. `paid_at` and `paid_via` (`fiatsend`, `mobile_money`, `bank_transfer`, or `manual` if you marked it paid yourself) are set. |
| `cancelled` | Cancelled by you before it was paid. |

### Errors

Errors from the checkout endpoints use this shape:

```json
{ "error": { "code": "invalid_request", "message": "amount: amount must be more than 0" } }
```

| HTTP status | `code` | What to do |
|---|---|---|
| 400 | `invalid_request` | Fix the field named in the message. |
| 401 | n/a | The API key is missing, malformed or invalid. |
| 403 | `account_not_active` | A live key was used before the account was activated. Use a test key until you go live. |
| 404 | `not_found` | No such session. |
| 422 | `account_not_ready` | The business can't take that kind of payment yet, for example no Stellar wallet is connected for Fiatsend checkout. |
| 429 | `rate_limited` | Too many requests. Retry shortly. |

The API allows 120 requests per minute per business.

---

## Get Notified with Webhooks

A webhook tells your server the moment a session is paid, even if the customer closed the page.

1. In the Console, open **Developers → Webhooks** and add your endpoint URL.
2. Tick **`checkout.session.completed`**.
3. Keep the webhook secret. You use it to verify each request.

Your endpoint must be a public `https://` address. During development on your own machine, use a tunnelling tool such as ngrok.

### What We Send

```json
{
  "id": "evt_9a8b…",
  "event": "checkout.session.completed",
  "sentAt": "2026-10-08T09:02:11.000Z",
  "livemode": true,
  "data": {
    "object": { "id": "cs_5f1c…", "status": "complete", "amount": 50, "currency": "GHS", "client_reference_id": "order_1042", "paid_via": "fiatsend" }
  }
}
```

`data.object` is the full session. Two headers come with every request:

- `X-Fiatsend-Signature`: an HMAC-SHA256 of the **raw request body** using your webhook secret, as a hex string.
- `X-Fiatsend-Event`: the event name.

### Verify the Signature and Fulfil the Order

```javascript
import crypto from "node:crypto";
import express from "express";

const app = express();

// Use the RAW body: the signature is computed over the exact bytes we sent.
app.post("/fiatsend/webhook", express.raw({ type: "application/json" }), (req, res) => {
  const expected = crypto
    .createHmac("sha256", process.env.FIATSEND_WEBHOOK_SECRET)
    .update(req.body)
    .digest("hex");
  const given = req.get("X-Fiatsend-Signature") ?? "";
  const ok = given.length === expected.length && crypto.timingSafeEqual(Buffer.from(given), Buffer.from(expected));
  if (!ok) return res.status(400).send("bad signature");

  const event = JSON.parse(req.body.toString());
  if (event.event === "checkout.session.completed") {
    // Delivery is at-least-once: skip it if you've already handled event.id.
    fulfillOrder(event.data.object.client_reference_id);
  }
  res.sendStatus(200);
});
```

Respond with any `2xx` status to acknowledge. If your endpoint errors or times out, Fiatsend tries up to three times in total (waiting about 1 second, then 4 seconds between attempts). Delivery can happen more than once, so **de-duplicate on the event `id`**.

---

## Testing and Going Live

- **Use Sandbox.** In Sandbox, buttons and sessions are marked **Test mode** and don't move real money. Test API keys (`fs_test_…`) always create test checkouts.
- **Fiatsend checkout in test mode uses the Stellar test network**, so connect a testnet wallet to try it. Mobile money and bank transfer behave the same in test mode: you play both the customer and the business.
- **Live buttons are separate.** When you're ready, switch the Console to **Live**, recreate your payment buttons, and use a `fs_live_…` key. Live keys need an activated account (see [account statuses](/docs/products/fiatsend-console#get-started)).
- **Check your whole flow.** Make a test payment, confirm the **Activity** tab shows it as paid, and confirm your webhook fulfilled the order.

## Good to Know

- **Prices come from you, not the customer.** A payment button's price is fixed on the server, and an API session uses the amount you sent. Customers can't change it.
- **Receipts.** If the customer gave an email address (or you passed one), they get a receipt by email once the payment is confirmed. Receipts can be switched off in [invoice settings](/docs/payments/invoices#make-invoices-your-own).
- **Manual payments.** For mobile money or bank transfer, the customer taps *I've sent the payment* (optionally adding a transaction ID or sender details) and you're notified to check your account and confirm. These sessions appear in **Payments → Invoices** with a **Review payment** button once the customer has said they paid.
- **Where sessions appear.** Every session is listed under **Website checkout → Activity**. **Payments → Invoices** shows only the ones that matter day to day: paid sessions and those with a payment waiting for you to review. Abandoned checkouts don't clutter it.
- **Fees.** Fiatsend checkout payments carry the platform fee described in [Fees & Limits](/docs/platform/fees-and-limits). Who pays it is your choice in [Payment settings](/docs/payments/payment-settings).
- **Rate limits and keys.** Keep API keys out of source control and rotate a key from **Developers → API Keys** if you think it has leaked.

Need help? See [Support](/docs/resources/support).
