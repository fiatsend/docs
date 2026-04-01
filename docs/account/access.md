---
sidebar_position: 1
title: "Account & Access"
---

# Account & Access

Getting started with Fiatsend takes just a few minutes. This page walks you through account creation, wallet setup, multi-factor authentication, profile management, and common troubleshooting steps. By the end, you'll have a fully functional Fiatsend account ready to send, receive, and convert funds.

## Creating Your Account

To create a Fiatsend account, visit [app.fiatsend.com](https://app.fiatsend.com) and follow these steps:

1. **Enter your phone number** — Provide a valid mobile number for the country you're operating in. This number will be tied to your identity on the platform.
2. **Verify via OTP** — You'll receive a one-time password (OTP) via SMS. Enter it to confirm ownership of the phone number. The code expires after 5 minutes.
3. **Connect your wallet** — Fiatsend uses [Privy](https://privy.io) for wallet-based authentication. If you already have a compatible wallet, connect it during onboarding. If not, Privy will create an embedded wallet for you automatically — no browser extension or seed phrase required.
4. **Mint your MobileNumber NFT** — Upon successful registration, Fiatsend mints a [MobileNumber NFT](/docs/platform/mobilenumber-nft) on Lisk Mainnet tied to your phone number. This encrypted, non-transferable token serves as your identity pass on the network and determines your access tier.

After these steps, you'll land on the FiatsendOne dashboard with a **Level 0** account. You can immediately explore the app, but transaction capabilities are limited until you complete further verification.

:::info
Your MobileNumber NFT is minted automatically — you don't need to pay gas or interact with the blockchain directly. Fiatsend covers the minting cost.
:::

## Multi-Factor Authentication (MFA)

Fiatsend strongly recommends enabling two-factor authentication to protect your account. MFA adds a second verification step beyond your wallet connection.

### Setting Up 2FA

1. Navigate to **Settings → Security** in the FiatsendOne app.
2. Choose your preferred method:
   - **TOTP (Recommended)** — Use an authenticator app like Google Authenticator, Authy, or 1Password. Scan the QR code displayed on screen, then enter the 6-digit code to confirm.
   - **SMS Fallback** — Receive a verification code via SMS each time you log in. This is less secure than TOTP but available as a fallback.
3. **Save your recovery codes** — After enabling 2FA, you'll be shown a set of one-time recovery codes. Each code can only be used once.

:::warning
**Store your recovery codes offline.** Write them down on paper or save them in a secure password manager. If you lose access to your authenticator app and your phone, recovery codes are the only way to regain access to your account. Fiatsend support cannot bypass 2FA without them.
:::

### Recovery Code Format

| Field | Details |
|---|---|
| Number of codes | 8 |
| Format | Alphanumeric, 10 characters each |
| Usage | Single-use (each code works once) |
| Regeneration | Available in Settings → Security after re-authentication |

## Profile Management

Your Fiatsend profile contains the information used to verify your identity, communicate with you, and configure your account for the correct use case.

### Editable Fields

| Field | Description | Required |
|---|---|---|
| Full name | Your legal name as it appears on ID documents | Yes |
| Business name | For merchant and agent accounts | Conditional |
| Email address | Used for receipts, notifications, and recovery | Recommended |
| Contact phone | Primary phone tied to your MobileNumber NFT | Yes (set at signup) |
| Country | Determines available providers and compliance rules | Yes |
| Preferred currency | Default display currency in the app | No |

To update your profile, navigate to **Settings → Profile** in the FiatsendOne app.

:::note
Your contact phone number cannot be changed after signup because it is cryptographically tied to your [MobileNumber NFT](/docs/platform/mobilenumber-nft). To use a different phone number, you must create a new account.
:::

## Roles & Permissions Overview

Every Fiatsend account is assigned a role that determines what actions the account can perform and what limits apply. The four roles are:

| Role | Description |
|---|---|
| **User** | Default role for individual consumers. Send, receive, and convert within standard limits. |
| **Agent** | Cash-in/out facilitators with elevated limits. Can onboard merchants and earn commissions. |
| **Merchant** | Businesses that accept payments via QR/scan-to-pay, access bulk disbursements and reporting. |
| **Admin** | Team and permission management, full access to reporting and configuration. |

For a detailed breakdown of permissions and how to manage subaccounts, see [Subaccounts & Roles](/docs/account/subaccounts-and-roles).

## Troubleshooting

### OTP Not Received

- Ensure your phone number is entered with the correct country code (e.g., `+233` for Ghana).
- Check that your phone has network signal and can receive SMS.
- Wait at least 60 seconds before requesting a new OTP.
- Some carriers delay delivery during peak hours. If the issue persists after 3 attempts, contact [support](/docs/resources/support).

### Lost Device

If you've lost the device with your authenticator app:

1. Use one of your **recovery codes** to log in.
2. Navigate to **Settings → Security** and disable the old 2FA method.
3. Re-enable 2FA with your new device.

If you don't have recovery codes, contact Fiatsend support at **contact@fiatsend.com** with your registered phone number and a description of the issue. Identity verification will be required before account recovery.

### Session Issues

Fiatsend uses JWT-based sessions with automatic expiration. If you experience unexpected logouts or session errors:

- **Clear your browser cache** and log in again.
- **Check your clock** — TOTP codes are time-sensitive. Ensure your device's clock is synced automatically.
- **Disable VPN** temporarily if you're being flagged for unusual location changes.
- Sessions expire after a configurable timeout period. Re-authentication is required after expiration.

## Related Pages

- [Subaccounts & Roles](/docs/account/subaccounts-and-roles) — Detailed role permissions and team management
- [Managing Funds](/docs/account/managing-funds) — Deposits, payouts, and transaction management
- [MobileNumber NFT](/docs/platform/mobilenumber-nft) — How your identity NFT works
- [Security & Compliance](/docs/security/overview) — Platform security architecture
