---
sidebar_position: 5
title: "Support"
---

# Support

This page provides answers to the most frequently asked questions about Fiatsend, along with contact information and links to developer resources. If you can't find what you're looking for here, reach out through one of the channels listed below.

## Frequently Asked Questions

### How do I create an account?

Visit [app.fiatsend.com](https://app.fiatsend.com) and register with your phone number. You'll receive an OTP via SMS to verify your number. During signup, a wallet is created for you automatically via Privy (or you can connect an existing wallet), and a [MobileNumber NFT](/docs/platform/mobilenumber-nft) is minted on Lisk Mainnet as your identity pass. The entire process takes about two minutes. For a detailed walkthrough, see [Account & Access](/docs/account/access).

### How long do payouts take?

Mobile money payouts typically complete within **1–5 minutes** after confirmation. The on-chain leg (stablecoin conversion) settles in seconds on Lisk Mainnet, and the mobile money transfer follows immediately. During peak hours or provider maintenance windows, payouts may occasionally take longer. You can track the real-time status of every payout in the [FiatsendOne app](https://app.fiatsend.com) under **Transactions**. For more details, see [Managing Funds](/docs/account/managing-funds).

### What are the fees?

Fiatsend charges a small spread on stablecoin-to-GHS conversions (typically 1–2%) and a flat payout fee for mobile money delivery. All fees are displayed **upfront** in the app before you confirm any transaction — you'll see the exact amount the beneficiary will receive, the exchange rate, and the total cost. Fee details vary by transaction type and volume. For the full fee schedule, see [Fees & Limits](/docs/platform/fees-and-limits).

### How do I verify my identity (KYC)?

KYC verification is done entirely within the FiatsendOne app:

1. Navigate to **Settings → Verification**.
2. **Level 1**: Confirm your phone number via OTP (usually completed at signup).
3. **Level 2**: Upload a photo of a government-issued ID (passport, national ID, or driver's license) and take a selfie for face matching.

Verification is typically processed within minutes. Once approved, your [MobileNumber NFT](/docs/platform/mobilenumber-nft) tier is upgraded and your transaction limits increase automatically. See [Fees & Limits](/docs/platform/fees-and-limits) for limits by tier.

### What if my payout fails?

If a payout fails — due to an invalid phone number, provider downtime, or the recipient's mobile money limit being exceeded — the funds are **automatically returned to your Fiatsend wallet**. No fees are charged for failed payouts. You'll see the status change to "Failed" in your transaction history with a reason code. Common fixes:

- Verify the beneficiary's phone number and mobile money provider are correct.
- Check that the recipient's mobile money account is active and not at its limit.
- Retry the payout after a few minutes if the failure was due to provider downtime.

If the issue persists, contact support through the in-app channel for investigation. See [Managing Funds](/docs/account/managing-funds) for full payout details.

### How do I enable 2FA?

Two-factor authentication is configured in the FiatsendOne app:

1. Go to **Settings → Security**.
2. Choose **TOTP** (recommended — use an authenticator app like Google Authenticator or Authy) or **SMS** (fallback option).
3. Follow the setup prompts to link your authenticator app or confirm your phone number.
4. **Save your recovery codes** in a secure location — these are the only way to regain access if you lose your authenticator device.

For detailed setup instructions and troubleshooting, see [Account & Access](/docs/account/access).

:::warning
Fiatsend strongly recommends enabling 2FA on every account, especially for Agent, Merchant, and Admin roles. Accounts with 2FA enabled are significantly more resistant to unauthorized access.
:::

### What stablecoins does Fiatsend support?

Fiatsend currently supports the following stablecoins on Lisk Mainnet:

| Stablecoin | Peg | Description |
|---|---|---|
| USDT | USD | Most widely adopted USD stablecoin |
| USDC | USD | Native USD Coin by Circle |
| USDC.e | USD | Bridged USDC on Lisk |
| DAI | USD | Decentralized, overcollateralized stablecoin |
| GHSFIAT | GHS | Fiatsend's native Ghanaian Cedi stablecoin |

For full details, see [Supported Stablecoins](/docs/platform/stablecoins).

### Which countries does Fiatsend support?

Ghana is the primary market with full support for send, receive, and convert operations. Additional countries including the USA, Nigeria, Tanzania, Kenya, Australia, and Canada have varying levels of support. See [Coverage](/docs/platform/coverage) for the complete country and provider matrix.

### How do I become a merchant or agent?

- **Merchant**: Apply through the FiatsendOne app under **Settings → Upgrade to Merchant**. You'll need to provide business registration documents and director identification. See [Subaccounts & Roles](/docs/account/subaccounts-and-roles).
- **Agent**: Apply through the FiatsendOne app or contact the Fiatsend team directly. Agents are vetted and onboarded individually. See [Use Cases](/docs/products/use-cases) for details on the agent role.

## Contact Information

| Channel | Contact | Best For |
|---|---|---|
| **In-app support** | Available in FiatsendOne under the help menu | Fastest response for account, payout, and transaction issues |
| **General inquiries** | contact@fiatsend.com | Business inquiries, partnerships, general questions |
| **Technical support** | dev@fiatsend.com | API integration issues, developer questions, OpenAPI spec requests |
| **Fraud reporting** | contact@fiatsend.com (subject: "Fraud Report") | Suspected fraudulent activity on your account |

:::info
For urgent payout issues — such as a payout stuck in "Processing" status for more than 15 minutes — use **in-app support** for the fastest response. The support team has direct access to transaction monitoring tools and can investigate immediately.
:::

### Response Times

| Channel | Typical Response Time |
|---|---|
| In-app support | Under 2 hours during business hours |
| Email (contact@fiatsend.com) | Within 24 hours |
| Email (dev@fiatsend.com) | Within 24 hours |
| Fraud reports | Triaged within 4 hours |

Response times may vary during weekends and holidays. Urgent security or fraud matters are prioritized regardless of timing.

## Developer Resources

If you're integrating with Fiatsend or building on top of the platform, these resources will help:

| Resource | Link | Description |
|---|---|---|
| **API Reference** | [API Overview](/docs/api/overview) | Full endpoint documentation with examples |
| **Smart Contracts** | [Architecture](/docs/contracts/architecture) | Contract structure, deployment, and testing |
| **Sandbox** | [Sandbox & Testing](/docs/resources/sandbox-and-testing) | Test environment setup and test phone numbers |
| **Glossary** | [Glossary](/docs/resources/glossary) | Definitions of key Fiatsend terms |
| **Changelog** | [Changelog](/docs/resources/changelog) | Platform update history |
| **GitHub** | [github.com/fiatsend](https://github.com/fiatsend) | Open-source repos and documentation source |

### Community & Updates

Stay informed about platform updates, new features, and community events:

- [Rewards & Community](/docs/resources/rewards-and-community) — Community channels, X Spaces, and webinars
- [Changelog](/docs/resources/changelog) — Detailed release notes
- Follow [@fiaborEric](https://twitter.com/fiaborEric) on X for announcements

## Related Pages

- [Account & Access](/docs/account/access) — Account setup and troubleshooting
- [Managing Funds](/docs/account/managing-funds) — Deposits, payouts, and transaction details
- [Fees & Limits](/docs/platform/fees-and-limits) — Fee schedule and transaction limits
- [Security & Compliance](/docs/security/overview) — Fraud reporting and security details
