---
sidebar_position: 5
title: "MobileNumber NFT"
---

# MobileNumber NFT

The MobileNumber NFT is a core identity primitive in the Fiatsend platform. When a user signs up, an encrypted NFT is minted on Lisk Mainnet and tied to their phone number. This NFT serves as a secure, privacy-preserving pass that grants access to the Fiatsend network and determines the user's transaction limits based on their KYC verification level.

Unlike traditional identity systems where personal data is stored in a centralized database, the MobileNumber NFT keeps identity on-chain in an encrypted form — the phone number itself is never exposed publicly. This design provides verifiable identity for compliance purposes while preserving user privacy.

## What Is the MobileNumber NFT?

The MobileNumber NFT is:

- **An ERC-721 token** minted on Lisk Mainnet at the time of user registration
- **Tied to a phone number** — each phone number maps to exactly one MobileNumber NFT
- **Encrypted** — the phone number is encrypted before being stored on-chain; only a hash is publicly visible
- **Non-transferable** — the NFT is soulbound to the user's wallet and cannot be transferred or sold
- **Tier-based** — the NFT's metadata includes a tier level (0, 1, or 2) that determines the user's access and transaction limits

When a user logs into Fiatsend via wallet-based authentication (Privy), the platform checks for the presence and tier of their MobileNumber NFT to determine what operations they can perform and at what volume.

:::info
The MobileNumber NFT is minted automatically during signup in the [FiatsendOne app](https://app.fiatsend.com). Users do not need to take any manual action to receive their NFT — it is created as part of the onboarding flow.
:::

## Tier System

The MobileNumber NFT supports three tiers, each corresponding to a level of identity verification. Higher tiers unlock greater transaction limits and access to additional platform features.

| Tier | KYC Level | Verification Required | What's Unlocked |
|---|---|---|---|
| **Level 0** | None | NFT minted at signup — no documents required | Basic access to the Fiatsend network. Users can explore the platform and perform limited transactions. Ideal for first-time users who want to try the platform before committing to verification. |
| **Level 1** | Phone Verified | User verifies ownership of the phone number tied to the NFT via SMS OTP | Standard transaction limits. Users can send, receive, and convert stablecoins to mobile money within daily and monthly caps. This is the minimum tier for most payment operations. |
| **Level 2** | Full KYC | Government-issued ID verification (e.g., national ID, passport, driver's license) | Enhanced transaction limits. Users gain access to the highest daily and monthly caps, bulk operations, and priority settlement. Required for business accounts and high-volume users. |

:::tip
Most individual users will find **Level 1** sufficient for everyday payments. If you're a merchant or business with higher volume needs, upgrading to **Level 2** is recommended. See [Fees & Limits](/docs/platform/fees-and-limits) for the specific caps at each tier.
:::

## How It Works Technically

### Minting

When a new user registers on Fiatsend:

1. The user authenticates via Privy (wallet-based login), which creates or connects a wallet on Lisk Mainnet.
2. The user provides their phone number during onboarding.
3. The Fiatsend backend encrypts the phone number and generates a hash.
4. The `FiatsendGatewayV2` smart contract mints a new MobileNumber NFT to the user's wallet with:
   - The encrypted phone number stored in the token's metadata
   - The phone number hash stored as a publicly queryable field (for deduplication)
   - The initial tier set to **Level 0**
5. The NFT is soulbound — the contract enforces that it cannot be transferred to another address.

### On-Chain Data Structure

| Field | Visibility | Description |
|---|---|---|
| `tokenId` | Public | Unique identifier for the NFT |
| `owner` | Public | Wallet address of the NFT holder |
| `phoneHash` | Public | Keccak-256 hash of the phone number — used for deduplication and lookup |
| `encryptedPhone` | On-chain (encrypted) | The phone number encrypted with the platform's public key — only Fiatsend can decrypt |
| `tier` | Public | Current KYC tier (0, 1, or 2) |
| `updatedAt` | Public | Timestamp of the last tier upgrade |

:::warning
The `phoneHash` is a one-way hash. It is computationally infeasible to reverse the hash back to the original phone number. This ensures that even though the hash is publicly visible on Lisk Mainnet, the user's actual phone number remains private.
:::

## Privacy Design

Privacy is a foundational concern in the MobileNumber NFT design. Here's how user data is protected:

### What's On-Chain
- **Phone number hash** — A Keccak-256 hash of the phone number. This is used to prevent duplicate registrations (one NFT per phone number) and to allow the smart contract to look up a user by their phone hash without knowing the actual number.
- **Encrypted phone number** — The phone number is encrypted using the platform's encryption key before being stored in the NFT metadata. The encrypted value is on-chain but unreadable without the decryption key.
- **Tier level** — The user's current KYC tier is publicly visible, but it reveals nothing about the user's identity — only their verification status.

### What's NOT On-Chain
- **The actual phone number** — Never stored in plaintext on-chain.
- **KYC documents** — Government IDs and supporting documents are handled off-chain by the Fiatsend backend and are never written to the blockchain.
- **Personal details** — Name, address, date of birth, and other PII are stored off-chain and protected by standard data protection practices.

:::note
The MobileNumber NFT is designed to be the minimum viable on-chain identity — enough to enforce compliance rules (deduplication, tiered access) without exposing sensitive personal information on a public blockchain.
:::

## Upgrading Tiers Through KYC

Users can upgrade their MobileNumber NFT tier at any time through the [FiatsendOne app](https://app.fiatsend.com):

### Level 0 → Level 1 (Phone Verification)
1. Navigate to **Settings → Verification** in the FiatsendOne app.
2. Request phone verification — an SMS OTP is sent to the phone number tied to your MobileNumber NFT.
3. Enter the OTP to confirm ownership.
4. Once verified, the Fiatsend backend calls the smart contract to update your NFT tier from 0 to 1.
5. Your new transaction limits take effect immediately.

### Level 1 → Level 2 (Full KYC)
1. Navigate to **Settings → Verification** in the FiatsendOne app.
2. Select **Upgrade to Level 2** and follow the prompts to submit a government-issued ID.
3. The Fiatsend team reviews the submitted documents (processing time varies).
4. Once approved, the smart contract updates your NFT tier from 1 to 2.
5. Enhanced limits and features are unlocked immediately upon upgrade.

:::info
Tier upgrades are one-way — once you've upgraded to Level 1 or Level 2, you cannot downgrade. This ensures that compliance requirements are consistently enforced.
:::

## Related Pages

- [Fees & Limits](/docs/platform/fees-and-limits) — Transaction limits by KYC tier
- [GHSFIAT Stablecoin](/docs/platform/ghsfiat) — How GHSFIAT operations are gated by MobileNumber NFT tier
- [FiatsendOne](/docs/products/fiatsend-one) — The app where users manage their MobileNumber NFT and KYC verification
- [Coverage](/docs/platform/coverage) — Supported countries and providers for mobile number registration
