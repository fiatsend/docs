---
sidebar_position: 1
title: "Security & Compliance"
---

# Security & Compliance

Security is foundational to the Fiatsend platform. As a payments-first mobile money platform handling real money and personal data, Fiatsend implements defense-in-depth across every layer — from wallet authentication and data encryption to on-chain transaction integrity and compliance processes. This page details the security architecture, compliance framework, and operational guidance for teams integrating with or operating on Fiatsend.

## Security Principles

Fiatsend's security posture is built on four core principles:

| Principle | Implementation |
|---|---|
| **Environment-based secrets** | All credentials, API keys, and signing keys are stored in environment variables or secure vaults — never in code, configuration files, or client-side bundles. |
| **RBAC and least privilege** | Every account operates under [role-based access control](/docs/account/subaccounts-and-roles). Permissions are granted based on the minimum access needed for the role. |
| **PII encryption** | Personally identifiable information (phone numbers, names, ID documents) is encrypted at rest and in transit. On-chain identity data (MobileNumber NFT) stores only encrypted hashes. |
| **Audit logging** | Every action — logins, transactions, role changes, configuration updates — is recorded in an immutable audit log with timestamps, actor identity, and outcome. |

## Authentication Security

Fiatsend uses a layered authentication model combining wallet-based identity with traditional session management.

### Wallet Authentication via Privy

User authentication is handled through [Privy](https://privy.io), which supports:

- **Embedded wallets** — Users who don't have an existing blockchain wallet get an embedded wallet created automatically during signup. No seed phrases or browser extensions required.
- **External wallets** — Users with existing wallets (MetaMask, WalletConnect-compatible, etc.) can connect them directly.
- **Social login bridges** — Privy supports linking email, phone, or social accounts to wallet identity for account recovery.

### JWT Sessions

After wallet authentication, Fiatsend issues a JSON Web Token (JWT) for session management.

| Parameter | Value |
|---|---|
| Token type | JWT (signed, not encrypted) |
| Signing algorithm | RS256 |
| Session duration | Configurable per deployment (default: 24 hours) |
| Refresh mechanism | Sliding window with re-authentication required after max lifetime |
| Storage | HTTP-only, secure, SameSite cookie |

### Session Timeouts and Device Binding

- Sessions expire after the configured timeout period. Users must re-authenticate after expiration.
- Unusual activity patterns (e.g., login from a new device or location) may trigger additional verification.
- Admins can configure mandatory session timeout durations for their organization.

### Multi-Factor Authentication

Fiatsend supports MFA via TOTP (authenticator apps) and SMS fallback. See [Account & Access](/docs/account/access) for setup instructions. Admins can enforce mandatory MFA across their organization via [Subaccounts & Roles](/docs/account/subaccounts-and-roles).

## Data Protection

### Encryption at Rest

All data stored by Fiatsend is encrypted using **AES-256** encryption. This includes:

- User profile data (names, emails, phone numbers)
- KYC documents (ID images, selfies, proof of address)
- Transaction records and metadata
- Backend database contents

### Encryption in Transit

All network communication uses **TLS 1.3** with strong cipher suites. This applies to:

- Client-to-server API calls
- Server-to-server communication (internal microservices, mobile money provider APIs)
- Webhook deliveries to partner endpoints

:::info
Fiatsend enforces HTTPS for all API endpoints. HTTP requests are rejected — they are not redirected.
:::

### MobileNumber NFT Privacy

The [MobileNumber NFT](/docs/platform/mobilenumber-nft) serves as a user's on-chain identity. To preserve privacy:

- The phone number is **never stored in plaintext** on-chain.
- Only an encrypted hash of the phone number exists in the NFT metadata.
- The mapping between hash and phone number is maintained exclusively in the encrypted backend.
- The NFT is **non-transferable** — it cannot be sent to another wallet.

## Transaction Security

### Rate Limiting

API endpoints and user-facing operations are rate-limited to prevent abuse:

| Operation | Rate Limit |
|---|---|
| Login attempts | 5 per minute per phone number |
| OTP requests | 3 per 5 minutes per phone number |
| Payout initiation | 10 per minute per account |
| API calls (authenticated) | 100 per minute per API key |
| Conversion requests | 20 per minute per account |

Requests that exceed rate limits receive a `429 Too Many Requests` response.

### Fraud and Risk Scoring

Every transaction is evaluated against a risk model that considers:

- Transaction amount relative to the account's history
- Velocity (number of transactions in a short period)
- Beneficiary patterns (new vs. known recipients)
- Geographic signals (login location vs. transaction destination)
- Account age and verification level

Transactions that exceed risk thresholds are flagged for review or temporarily held pending manual approval. High-risk transactions may require additional verification before processing.

### Manual Review Paths

Flagged transactions enter a manual review queue handled by the Fiatsend operations team:

1. Transaction is held with status `under_review`.
2. The user is notified that additional verification may be required.
3. The operations team reviews the transaction and supporting data.
4. The transaction is either approved and processed, or rejected with the funds returned to the user's wallet.

:::note
Manual review typically completes within 1–2 business hours. For urgent matters, use in-app support for the fastest response.
:::

## Compliance

### KYC Tiers

Fiatsend implements tiered Know Your Customer (KYC) verification that scales with transaction access. Tiers align with the [MobileNumber NFT](/docs/platform/mobilenumber-nft) levels:

| Tier | Requirements | Access Level |
|---|---|---|
| **Level 0** | Phone number registration only | View-only, minimal transactions |
| **Level 1** | Phone number verified via OTP | Standard transaction limits for individuals |
| **Level 2** | Government-issued ID + selfie verification | Enhanced limits, full platform access |

### Business Verification

Businesses (Merchant and Admin roles) undergo additional verification:

| Requirement | Description |
|---|---|
| Business registration document | Certificate of incorporation or business license |
| Director identification | Government-issued ID for at least one director |
| Proof of address | Utility bill or bank statement for the business address |
| Beneficial ownership | Declaration of individuals owning 25%+ of the business |

### Regional Compliance

Compliance requirements may vary by country. Fiatsend works with licensed partners in each market to ensure adherence to local regulations:

- **Ghana**: Licensed mobile money partners for local currency flow. Compliance with Bank of Ghana electronic money regulations.
- **Other markets**: See [Coverage](/docs/platform/coverage) for supported countries and their regulatory status.

## Web3 Security and Transparency

### On-Chain Transparency

All stablecoin transactions on Fiatsend settle on **Lisk Mainnet**, providing:

- **Public verifiability** — Every transaction has an on-chain hash that can be independently verified on the Lisk block explorer.
- **Immutable records** — Once confirmed, transaction records cannot be altered or deleted.
- **Smart contract auditability** — The [FiatsendGatewayV2](/docs/contracts/architecture) contract code is verified and publicly readable on the block explorer.

### Licensed Partners

For the mobile money leg of transactions (fiat on-ramp and off-ramp), Fiatsend partners with licensed financial institutions and mobile money operators in each market. These partnerships ensure that local money flows comply with national regulations and that Fiatsend users benefit from the consumer protections provided by regulated entities.

## Operational Guidance

These recommendations apply to all Fiatsend users, with particular emphasis on businesses and integrators:

### Credential Management

- **Rotate API keys** on a regular schedule (at least quarterly) and immediately if compromise is suspected.
- **Use environment variables** to store API keys and secrets. Never hardcode them in source code or commit them to version control.
- **Scope API keys** to the minimum permissions needed. Use separate keys for different environments (staging, production).

### Admin Dashboard Security

- **Enforce MFA** for all Admin accounts — this is the single most effective security measure.
- **Use subaccounts** with granular permissions rather than sharing a single Admin account.
- **Review the audit log** regularly for unexpected actions, failed login attempts, or configuration changes.
- **Remove access promptly** when team members leave the organization.

### Environment Separation

- **Maintain separate environments** for development, staging, and production. Never use production credentials in non-production environments.
- Use the [sandbox environment](/docs/resources/sandbox-and-testing) for development and testing.
- Ensure staging environments use test mobile money providers, not live ones.

:::warning
Never use production API keys, wallet private keys, or real user data in development or staging environments. Use the Fiatsend sandbox with test credentials exclusively for non-production work.
:::

## Reporting Fraud

If you suspect fraudulent activity on your account or encounter a suspicious transaction:

1. **In-app reporting** — Open the transaction in the FiatsendOne app, tap the options menu, and select **Report**. Provide a description of the concern.
2. **Email** — Send details to **contact@fiatsend.com** with the subject line "Fraud Report" and include your registered phone number, transaction ID(s), and a description of the issue.

All fraud reports are triaged by the Fiatsend support team and escalated to the operations team for investigation. You'll receive a confirmation of receipt and updates on the investigation status.

## Related Pages

- [Account & Access](/docs/account/access) — Authentication setup and MFA configuration
- [Subaccounts & Roles](/docs/account/subaccounts-and-roles) — RBAC details and team management
- [MobileNumber NFT](/docs/platform/mobilenumber-nft) — Privacy-preserving identity system
- [Smart Contracts Architecture](/docs/contracts/architecture) — On-chain contract details
- [Sandbox & Testing](/docs/resources/sandbox-and-testing) — Test environment setup
