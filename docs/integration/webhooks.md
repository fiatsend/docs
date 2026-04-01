---
sidebar_position: 7
title: "Webhooks"
description: "Receive real-time event notifications from Fiatsend for KYC updates, conversions, and payouts via webhooks."
---

# Webhooks

Webhooks allow you to receive real-time notifications when events occur in the Fiatsend platform — such as a payout completing, a KYC review finishing, or a conversion status changing. Instead of polling API endpoints for status updates, your server receives an HTTP POST request with the event payload as soon as the event occurs.

This is the **recommended approach** for tracking transaction lifecycle in production integrations.

## Event Types

Fiatsend delivers the following webhook events:

| Event | Description | Triggered When |
|---|---|---|
| `kyc.updated` | KYC verification status changed | A user's KYC review completes (verified or rejected) |
| `conversion.updated` | Conversion status changed | A stablecoin-to-GHS conversion transitions to a new status |
| `payout.updated` | Payout status changed | A mobile money payout transitions to `processing` |
| `payout.completed` | Payout delivered successfully | Funds have been delivered to the recipient's mobile money wallet |
| `payout.failed` | Payout failed | A payout could not be delivered — funds returned to sender's GHS balance |

## Payload Structure

Every webhook delivery is an HTTP POST request with a JSON body following this structure:

```json
{
  "event": "payout.completed",
  "id": "evt_abc123",
  "timestamp": "2026-03-17T08:34:30Z",
  "data": {
    "transactionId": "tx_payout_def456",
    "status": "completed",
    "amount": "100.00",
    "currency": "GHS",
    "beneficiary": "+233241234567",
    "provider": "MTN",
    "reference": "invoice-2026-001",
    "providerReference": "FT26077ABCDE"
  },
  "signature": "sha256=a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2"
}
```

### Payload Fields

| Field | Type | Description |
|---|---|---|
| `event` | string | Event type identifier (see table above) |
| `id` | string | Unique event ID — use this for deduplication |
| `timestamp` | string | ISO 8601 timestamp of when the event occurred |
| `data` | object | Event-specific payload (varies by event type) |
| `signature` | string | HMAC-SHA256 signature for verification |

### Event-Specific Data

#### `kyc.updated`

```json
{
  "event": "kyc.updated",
  "id": "evt_kyc_001",
  "timestamp": "2026-03-17T10:12:00Z",
  "data": {
    "userId": "user_abc123",
    "previousTier": 1,
    "currentTier": 2,
    "status": "verified",
    "documentType": "national_id"
  },
  "signature": "sha256=..."
}
```

#### `conversion.updated`

```json
{
  "event": "conversion.updated",
  "id": "evt_conv_002",
  "timestamp": "2026-03-17T08:31:15Z",
  "data": {
    "conversionId": "conv_xyz789",
    "from": "USDT",
    "to": "GHS",
    "amount": "100.00",
    "receiveAmount": "1483.50",
    "rate": "14.85",
    "status": "completed",
    "txHash": "0xabc123def456789..."
  },
  "signature": "sha256=..."
}
```

#### `payout.updated`

```json
{
  "event": "payout.updated",
  "id": "evt_pay_003",
  "timestamp": "2026-03-17T08:32:05Z",
  "data": {
    "transactionId": "tx_payout_def456",
    "status": "processing",
    "amount": "100.00",
    "currency": "GHS",
    "beneficiary": "+233241234567",
    "provider": "MTN",
    "reference": "invoice-2026-001"
  },
  "signature": "sha256=..."
}
```

#### `payout.completed`

```json
{
  "event": "payout.completed",
  "id": "evt_pay_004",
  "timestamp": "2026-03-17T08:34:30Z",
  "data": {
    "transactionId": "tx_payout_def456",
    "status": "completed",
    "amount": "100.00",
    "currency": "GHS",
    "beneficiary": "+233241234567",
    "provider": "MTN",
    "reference": "invoice-2026-001",
    "providerReference": "FT26077ABCDE"
  },
  "signature": "sha256=..."
}
```

#### `payout.failed`

```json
{
  "event": "payout.failed",
  "id": "evt_pay_005",
  "timestamp": "2026-03-17T09:00:30Z",
  "data": {
    "transactionId": "tx_payout_ghi012",
    "status": "failed",
    "amount": "500.00",
    "currency": "GHS",
    "beneficiary": "+233241234567",
    "provider": "MTN",
    "reference": "invoice-2026-002",
    "failureReason": "Provider timeout — mobile money network unreachable"
  },
  "signature": "sha256=..."
}
```

## Configuring Webhooks

:::info
Configure your webhook URL in the **Fiatsend Dashboard** under **Settings → Webhooks**. You can set one webhook URL per environment (sandbox and production). The dashboard also displays your webhook secret for signature verification.
:::

Your webhook endpoint must:

1. Be a publicly accessible HTTPS URL
2. Accept HTTP POST requests with `Content-Type: application/json`
3. Respond with a `2xx` status code within **30 seconds**
4. Verify the webhook signature before processing the event

## Signature Verification

Every webhook includes an HMAC-SHA256 signature in the `signature` field. You **must** verify this signature to confirm the webhook was sent by Fiatsend and has not been tampered with.

The signature is computed over the raw request body using your webhook secret as the HMAC key.

### Node.js Verification Example

```javascript
const crypto = require("crypto");

/**
 * Verify a Fiatsend webhook signature.
 *
 * @param {string} rawBody - The raw request body as a string (not parsed JSON)
 * @param {string} signature - The signature from the webhook payload
 * @param {string} secret - Your webhook secret from the Fiatsend dashboard
 * @returns {boolean} True if the signature is valid
 */
function verifyWebhookSignature(rawBody, signature, secret) {
  const expectedSignature =
    "sha256=" +
    crypto.createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");

  // Use timingSafeEqual to prevent timing attacks
  const expected = Buffer.from(expectedSignature, "utf8");
  const received = Buffer.from(signature, "utf8");

  if (expected.length !== received.length) {
    return false;
  }

  return crypto.timingSafeEqual(expected, received);
}

// Express.js webhook handler example
const express = require("express");
const app = express();

// IMPORTANT: Use raw body parser for webhook route to get the unparsed body
app.post(
  "/webhooks/fiatsend",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const rawBody = req.body.toString("utf8");
    const payload = JSON.parse(rawBody);

    // Step 1: Verify signature
    const isValid = verifyWebhookSignature(
      rawBody,
      payload.signature,
      process.env.WEBHOOK_SECRET
    );

    if (!isValid) {
      console.error("Invalid webhook signature");
      return res.status(401).json({ error: "Invalid signature" });
    }

    // Step 2: Deduplicate by event ID
    // (Check if you've already processed this evt_id)

    // Step 3: Process the event
    switch (payload.event) {
      case "payout.completed":
        console.log(
          `Payout ${payload.data.transactionId} completed: ` +
          `${payload.data.amount} ${payload.data.currency} → ${payload.data.beneficiary}`
        );
        // Update your database, notify your user, etc.
        break;

      case "payout.failed":
        console.error(
          `Payout ${payload.data.transactionId} failed: ${payload.data.failureReason}`
        );
        // Handle failure — funds are returned to sender's balance
        break;

      case "kyc.updated":
        console.log(
          `User ${payload.data.userId} KYC: ${payload.data.status} → Tier ${payload.data.currentTier}`
        );
        break;

      case "conversion.updated":
        console.log(
          `Conversion ${payload.data.conversionId}: ${payload.data.status}`
        );
        break;

      default:
        console.log("Unhandled event type:", payload.event);
    }

    // Step 4: Respond with 2xx to acknowledge receipt
    res.status(200).json({ received: true });
  }
);

app.listen(3000, () => console.log("Webhook server running on port 3000"));
```

:::warning
**Always verify webhook signatures before processing events.** Without verification, an attacker could send forged webhook payloads to your endpoint, causing your system to process fake transactions. Use `crypto.timingSafeEqual` (or your language's equivalent) to prevent timing attacks on the signature comparison.
:::

## Delivery & Retries

Fiatsend uses **exponential backoff** to retry failed webhook deliveries. A delivery is considered failed if your endpoint does not return a `2xx` status code within 30 seconds.

| Attempt | Delay After Failure |
|---|---|
| 1st retry | 1 minute |
| 2nd retry | 5 minutes |
| 3rd retry | 30 minutes |
| 4th retry | 2 hours |
| 5th retry (final) | 24 hours |

After 5 failed retries, the webhook delivery is marked as permanently failed. You can view failed deliveries in the Fiatsend Dashboard under **Settings → Webhooks → Delivery Log**.

### Handling Retries

Because webhooks may be delivered more than once (due to retries or network issues), your webhook handler should be **idempotent**:

1. **Deduplicate by event ID** — Store the `id` field from each processed webhook and skip events you have already handled.
2. **Use database transactions** — Wrap your event processing in a database transaction to ensure atomicity.
3. **Respond quickly** — Do heavy processing asynchronously (e.g., queue the event) and return `200` immediately.

```javascript
app.post("/webhooks/fiatsend", express.raw({ type: "application/json" }), async (req, res) => {
  const rawBody = req.body.toString("utf8");
  const payload = JSON.parse(rawBody);

  // Verify signature (see above)
  if (!verifyWebhookSignature(rawBody, payload.signature, process.env.WEBHOOK_SECRET)) {
    return res.status(401).json({ error: "Invalid signature" });
  }

  // Deduplicate: check if this event was already processed
  const existing = await db.webhookEvents.findOne({ eventId: payload.id });
  if (existing) {
    // Already processed — return 200 to stop retries
    return res.status(200).json({ received: true, duplicate: true });
  }

  // Store the event ID to prevent reprocessing
  await db.webhookEvents.create({ eventId: payload.id, receivedAt: new Date() });

  // Queue for async processing
  await eventQueue.enqueue(payload);

  // Respond immediately
  res.status(200).json({ received: true });
});
```

:::tip
If your webhook endpoint is temporarily unavailable (e.g., during a deployment), Fiatsend will retry delivery automatically. You don't need to worry about missing events during short outages — the retry schedule covers gaps of up to 24 hours.
:::

## Testing Webhooks

### Sandbox

The [sandbox environment](/docs/integration/environments) delivers real webhook events for all sandbox transactions. Use this to test your webhook handler end-to-end without processing real funds.

### Local Development

For local development, use a tunneling service like [ngrok](https://ngrok.com/) to expose your local webhook endpoint to the internet:

```bash
# Start your local webhook server
node webhook-server.js

# In another terminal, expose it via ngrok
ngrok http 3000
```

Copy the ngrok HTTPS URL (e.g., `https://abc123.ngrok.io/webhooks/fiatsend`) and configure it as your sandbox webhook URL in the Fiatsend Dashboard.

## Related Pages

- [Operations](/docs/integration/operations) — Initiate conversions and payouts that trigger webhook events
- [KYC](/docs/integration/kyc) — KYC verification that triggers `kyc.updated` events
- [Idempotency](/docs/integration/idempotency) — Prevent duplicate processing on retry
- [Errors & Rate Limits](/docs/integration/errors-rate-limits) — Error handling best practices
- [Environments](/docs/integration/environments) — Sandbox vs. production webhook behavior
