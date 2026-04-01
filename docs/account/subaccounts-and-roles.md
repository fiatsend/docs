---
sidebar_position: 2
title: "Subaccounts & Roles"
---

# Subaccounts & Roles

Fiatsend uses a role-based access control (RBAC) system to manage what each account can do on the platform. Whether you're an individual user making everyday payments or a business managing a team of agents, the role system ensures every participant has the right level of access — no more, no less.

This page covers the four primary roles, their detailed permissions, how to create and manage subaccounts for team use, and how the audit trail keeps every action accountable.

## Role System Overview

Every Fiatsend account is assigned exactly one role. Roles determine transaction limits, available features, and administrative capabilities. Roles are assigned during onboarding or upgraded through verification and approval processes.

| Role | Target User | How to Get It |
|---|---|---|
| **User** | Individual consumers | Default role at signup |
| **Agent** | Cash-in/out facilitators, field operators | Application + approval by Fiatsend team |
| **Merchant** | Businesses accepting payments | Application + business verification |
| **Admin** | Team managers, business owners | Assigned by existing Admin or Fiatsend team |

## Role Descriptions

### User

The default role assigned to every new Fiatsend account. Users can send and receive stablecoins, convert to local currency, make payouts to mobile money, and manage their own profile. Transaction limits are determined by the user's [MobileNumber NFT](/docs/platform/mobilenumber-nft) tier (Level 0, 1, or 2). This role is appropriate for individual consumers who use Fiatsend for personal payments and transfers.

### Agent

Agents serve as the physical interface between cash and the digital Fiatsend ecosystem. They facilitate cash-in and cash-out transactions for other users, onboard new merchants, and earn commissions on the transactions they process. Agents have higher transaction limits than standard users and access to agent-specific features like day-end reconciliation reports. To become an agent, you must apply through the FiatsendOne app and be approved by the Fiatsend team.

### Merchant

Merchants are businesses that accept payments through Fiatsend. They can generate static and dynamic QR codes for scan-to-pay, process bulk disbursements (e.g., payroll, supplier payments), access detailed transaction reporting, and manage payouts to their mobile money accounts. Merchants go through a business verification process that includes submitting business registration documents and director information. See [Fees & Limits](/docs/platform/fees-and-limits) for merchant-specific limits.

### Admin

Admins have full access to all platform features within their organization. They can create and manage subaccounts, assign roles and permissions, enforce security policies (like mandatory MFA), and access comprehensive reporting across all team members. Admin access is granted by an existing Admin within the organization or by the Fiatsend team during initial business onboarding.

## Permission Matrix

The following table shows which actions each role can perform:

| Action | User | Agent | Merchant | Admin |
|---|:---:|:---:|:---:|:---:|
| View own transactions | ✅ | ✅ | ✅ | ✅ |
| Send stablecoins | ✅ | ✅ | ✅ | ✅ |
| Receive stablecoins | ✅ | ✅ | ✅ | ✅ |
| Convert stablecoins to fiat | ✅ | ✅ | ✅ | ✅ |
| Mobile money payout | ✅ | ✅ | ✅ | ✅ |
| QR / scan-to-pay (generate) | ❌ | ❌ | ✅ | ✅ |
| Facilitate cash-in/out | ❌ | ✅ | ❌ | ✅ |
| Onboard merchants | ❌ | ✅ | ❌ | ✅ |
| Bulk disbursements | ❌ | ❌ | ✅ | ✅ |
| View team transactions | ❌ | ❌ | ❌ | ✅ |
| Create subaccounts | ❌ | ❌ | ❌ | ✅ |
| Assign roles / permissions | ❌ | ❌ | ❌ | ✅ |
| Manage team members | ❌ | ❌ | ❌ | ✅ |
| Approve transactions | ❌ | ❌ | ✅ | ✅ |
| Access full reporting | ❌ | ❌ | ✅ | ✅ |
| Configure security policies | ❌ | ❌ | ❌ | ✅ |

:::info
Permissions are additive — higher roles include all permissions of lower roles plus additional capabilities. Admin includes everything Merchant and Agent can do, plus team management.
:::

## Subaccounts

Subaccounts allow businesses to create additional accounts under their organization, each with its own role and permission set. This is essential for businesses with multiple team members, branches, or operational roles.

### Creating Subaccounts

Only **Admin** accounts can create subaccounts. To create one:

1. Navigate to **Settings → Team Management** in the FiatsendOne app.
2. Click **Add Team Member**.
3. Enter the team member's phone number or email address.
4. Select the role to assign (User, Agent, or Merchant).
5. Optionally configure granular permissions (e.g., transaction approval threshold, report access).
6. Click **Send Invite**.

The invited team member will receive an invitation via their provided contact method. They complete their own signup process (including MobileNumber NFT minting) but inherit the organization's role and permission configuration.

### Granular Permissions

Beyond the base role, Admins can configure additional restrictions on subaccounts:

| Permission | Description |
|---|---|
| **Transaction limit override** | Set a custom daily/monthly limit lower than the role default |
| **Approval required** | Require Admin approval for transactions above a threshold |
| **Report access** | Restrict which reports the subaccount can view |
| **Payout destinations** | Limit which beneficiaries the subaccount can pay out to |
| **Time-based access** | Restrict login to specific hours (e.g., business hours only) |

:::tip
For businesses with multiple branches, create one subaccount per branch manager with the **Merchant** role and set branch-specific transaction limits. This gives each branch autonomy while keeping overall spend under control.
:::

## Team Management

### Inviting Members

Team members are invited via email or phone number. The invitation flow:

1. Admin sends invite from **Settings → Team Management**.
2. Invitee receives a link to join the organization on Fiatsend.
3. Invitee creates their account (or links an existing one).
4. Invitee's account is linked to the organization with the assigned role.

### Enforcing MFA

Admins can enforce mandatory multi-factor authentication for all team members:

- Navigate to **Settings → Security Policies**.
- Enable **Require 2FA for all team members**.
- Team members who haven't enabled 2FA will be prompted to set it up on their next login.

:::warning
Fiatsend strongly recommends enforcing MFA for all accounts with Agent, Merchant, or Admin roles. Accounts without MFA are more vulnerable to unauthorized access, and compromised accounts can result in financial loss.
:::

### Periodic Access Reviews

Good security hygiene includes regular review of who has access to what. Admins should:

- **Quarterly**: Review all subaccounts and their roles. Remove access for team members who have left the organization.
- **Monthly**: Check the audit log for unusual activity patterns (e.g., logins from unexpected locations, transactions outside normal patterns).
- **Immediately**: Revoke access when a team member's role changes or they leave the organization.

## Audit Trail

Every action taken on the Fiatsend platform is logged with the following details:

| Field | Description |
|---|---|
| **Timestamp** | UTC time the action occurred |
| **Actor** | The account (phone number or wallet address) that performed the action |
| **Action type** | Category of action (e.g., `login`, `transaction.create`, `role.assign`, `profile.update`) |
| **Target** | The entity affected (e.g., transaction ID, subaccount ID, profile field) |
| **IP address** | The IP address from which the action was performed |
| **Status** | Whether the action succeeded or failed |
| **Details** | Additional context (e.g., amount, recipient, old/new values for updates) |

Admins can view the audit trail in **Settings → Audit Log**, with filters for date range, actor, action type, and status. Audit logs are retained for a minimum of 12 months.

:::note
Audit logs are immutable — they cannot be edited or deleted by any role, including Admin. This ensures a trustworthy record for compliance and dispute resolution.
:::

## Related Pages

- [Account & Access](/docs/account/access) — Account setup and authentication
- [Managing Funds](/docs/account/managing-funds) — Deposits, payouts, and transaction management
- [Security & Compliance](/docs/security/overview) — Platform-wide security measures
- [Fees & Limits](/docs/platform/fees-and-limits) — Transaction limits by role and KYC tier
