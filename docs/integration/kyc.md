---
sidebar_position: 4
title: "KYC"
description: "Submit and track identity verification for Fiatsend users, including KYC tier definitions, document requirements, and API endpoints."
---

# KYC

Fiatsend requires identity verification (Know Your Customer) before users can access higher transaction limits and payout capabilities. The KYC system is tier-based — users start with basic access at signup and progressively unlock more functionality by completing verification steps.

KYC status is tied to the user's [MobileNumber NFT](/docs/platform/mobilenumber-nft), which is minted on Lisk Mainnet at signup and upgraded as the user completes each verification level.

## KYC Tiers

Fiatsend defines three KYC tiers, each with progressively higher access and limits:

| Tier | Name | Requirements | Access Level |
|---|---|---|---|
| **Level 0** | Basic | Account created (wallet connected) | View balances, receive stablecoins. No payouts, no conversions. |
| **Level 1** | Phone Verified | Phone number verified via OTP | Standard transaction limits. Can convert stablecoins and initiate payouts to verified beneficiaries. |
| **Level 2** | Fully Verified | Government-issued ID submitted and approved | Enhanced transaction limits. Full platform access including bulk disbursements and higher daily/monthly caps. |

See [Fees & Limits](/docs/platform/fees-and-limits) for the specific transaction limits associated with each tier.

:::info
Level 0 users can still receive stablecoins into their wallet and view their balance. KYC is required to **convert** stablecoins to fiat and **initiate payouts** to mobile money.
:::

## Accepted Document Types

For Level 2 verification, users must submit a government-issued identity document. The following document types are accepted:

| Document Type | `documentType` Value | Countries Supported |
|---|---|---|
| National ID Card | `national_id` | Ghana, Nigeria, Kenya, Tanzania |
| Passport | `passport` | All supported countries |
| Driver's License | `drivers_license` | Ghana, Nigeria, Kenya |

Documents must be:
- Clear, legible photographs or scans (JPEG, PNG, or PDF)
- Not expired
- Matching the name associated with the Fiatsend account
- Maximum file size: 10 MB per file

## KYC Submission Flow

The KYC verification process follows these steps:

```
1. User submits documents   →   2. Provider reviews   →   3. Status updated
   (POST /api/users/kyc-upload)     (automated + manual)      (poll or webhook)
```

1. **Submit Documents** — The user uploads their identity document via the KYC upload endpoint.
2. **Provider Review** — The document is reviewed by the verification provider. Simple cases (clear photos, common document types) are approved automatically. Edge cases are escalated to manual review.
3. **Status Updated** — The KYC status is updated and the user is notified. You can check the status via polling or by listening for the `kyc.updated` webhook event.

## KYC Status Values

| Status | Description |
|---|---|
| `pending` | Documents submitted and awaiting review |
| `verified` | Verification successful — tier upgraded |
| `rejected` | Verification failed — user must resubmit with corrected documents |

## API Endpoints

### Upload KYC Documents

Submit identity documents for verification. This endpoint accepts multipart form data.

**`POST /api/users/kyc-upload`**

#### cURL Example

```bash
curl -X POST https://api.fiatsend.com/api/users/kyc-upload \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "documentType=national_id" \
  -F "frontImage=@/path/to/id-front.jpg" \
  -F "backImage=@/path/to/id-back.jpg" \
  -F "selfie=@/path/to/selfie.jpg"
```

#### JavaScript (fetch) Example

```javascript
const formData = new FormData();
formData.append("documentType", "national_id");
formData.append("frontImage", frontImageFile);  // File object
formData.append("backImage", backImageFile);     // File object
formData.append("selfie", selfieFile);           // File object

const response = await fetch("https://api.fiatsend.com/api/users/kyc-upload", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${token}`,
    // Do NOT set Content-Type — fetch sets it automatically with boundary for FormData
  },
  body: formData,
});

const result = await response.json();
console.log("KYC submission:", result);
```

#### Request Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `documentType` | string | Yes | One of: `national_id`, `passport`, `drivers_license` |
| `frontImage` | file | Yes | Front of the identity document |
| `backImage` | file | Conditional | Back of the identity document (required for `national_id` and `drivers_license`) |
| `selfie` | file | Yes | Selfie photo for liveness verification |

#### Response

```json
{
  "status": 1,
  "code": "success",
  "message": "KYC documents submitted successfully",
  "data": {
    "kycRequestId": "kyc_req_abc123",
    "documentType": "national_id",
    "status": "pending",
    "submittedAt": "2026-03-17T10:00:00Z",
    "estimatedReviewTime": "5-30 minutes"
  }
}
```

:::warning
Do not submit the same documents multiple times while a review is pending. Duplicate submissions may delay the review process. Wait for the current submission to be processed before resubmitting.
:::

### Check KYC Status

Retrieve the current KYC verification status for the authenticated user.

**`GET /api/users/kyc-status`**

#### cURL Example

```bash
curl https://api.fiatsend.com/api/users/kyc-status \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### JavaScript (fetch) Example

```javascript
const response = await fetch("https://api.fiatsend.com/api/users/kyc-status", {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${token}`,
  },
});

const result = await response.json();
console.log("KYC status:", result.data.status);
console.log("Current tier:", result.data.currentTier);
```

#### Response — Pending

```json
{
  "status": 1,
  "code": "success",
  "message": "KYC status retrieved",
  "data": {
    "currentTier": 1,
    "pendingTier": 2,
    "status": "pending",
    "documentType": "national_id",
    "submittedAt": "2026-03-17T10:00:00Z",
    "reviewedAt": null,
    "rejectionReason": null
  }
}
```

#### Response — Verified

```json
{
  "status": 1,
  "code": "success",
  "message": "KYC status retrieved",
  "data": {
    "currentTier": 2,
    "pendingTier": null,
    "status": "verified",
    "documentType": "national_id",
    "submittedAt": "2026-03-17T10:00:00Z",
    "reviewedAt": "2026-03-17T10:12:00Z",
    "rejectionReason": null
  }
}
```

#### Response — Rejected

```json
{
  "status": 1,
  "code": "success",
  "message": "KYC status retrieved",
  "data": {
    "currentTier": 1,
    "pendingTier": null,
    "status": "rejected",
    "documentType": "national_id",
    "submittedAt": "2026-03-17T10:00:00Z",
    "reviewedAt": "2026-03-17T10:15:00Z",
    "rejectionReason": "Document image is blurry. Please resubmit with a clear photo."
  }
}
```

## Webhook Event: `kyc.updated`

Instead of polling the status endpoint, you can listen for the `kyc.updated` webhook event. This is the recommended approach for production integrations.

```json
{
  "event": "kyc.updated",
  "id": "evt_kyc_789",
  "timestamp": "2026-03-17T10:12:00Z",
  "data": {
    "userId": "user_abc123",
    "previousTier": 1,
    "currentTier": 2,
    "status": "verified",
    "documentType": "national_id"
  },
  "signature": "sha256=a1b2c3d4e5..."
}
```

See [Webhooks](/docs/integration/webhooks) for webhook configuration, signature verification, and retry behavior.

## Sandbox Testing

:::tip
In the sandbox environment, use the [test KYC profiles](/docs/integration/environments#test-kyc-profiles) to simulate different verification outcomes without submitting real documents. This lets you test your integration's handling of verified, rejected, and pending states.
:::

The sandbox also supports a special header for forcing KYC outcomes during testing:

```bash
# Force a specific KYC outcome in sandbox
curl -X POST https://sandbox-api.fiatsend.com/api/users/kyc-upload \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "X-Sandbox-KYC-Result: verified" \
  -F "documentType=national_id" \
  -F "frontImage=@/path/to/any-image.jpg" \
  -F "selfie=@/path/to/any-image.jpg"
```

Valid values for `X-Sandbox-KYC-Result`: `verified`, `rejected`, `pending`.

## Related Pages

- [MobileNumber NFT](/docs/platform/mobilenumber-nft) — The on-chain identity token upgraded by KYC
- [Fees & Limits](/docs/platform/fees-and-limits) — Transaction limits per KYC tier
- [Authentication](/docs/integration/authentication) — How to obtain the JWT required for KYC endpoints
- [Webhooks](/docs/integration/webhooks) — Listen for `kyc.updated` events
