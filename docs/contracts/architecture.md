---
sidebar_position: 1
title: "Smart Contracts Architecture"
---

# Smart Contracts Architecture

Fiatsend's on-chain logic lives in a set of Solidity smart contracts deployed on **Lisk Mainnet**. The contract system handles stablecoin conversions, gateway operations, and token management through a modular, upgradeable architecture. This page covers the contract structure, key design patterns, and how to work with the contracts for development and testing.

## Overview

The core of the system is **FiatsendGatewayV2** — a UUPS-upgradeable gateway contract that manages stablecoin-to-fiat conversions, token allowlisting, and transaction execution. The contract is designed for security and maintainability, incorporating battle-tested patterns from OpenZeppelin.

Key design features:

- **UUPS Upgradeable** — The contract can be upgraded without changing its address or losing state, using the Universal Upgradeable Proxy Standard.
- **Access Control** — Role-based permissions determine which addresses can execute administrative functions (e.g., adding supported tokens, pausing the contract).
- **Pausable** — The contract can be paused by authorized roles in an emergency, halting all transaction processing.
- **Reentrancy Guards** — Critical functions are protected against reentrancy attacks using OpenZeppelin's `ReentrancyGuard`.

## Contract Structure

```
contracts/
├── interfaces/
│   └── IFiatsendGateway.sol    # Gateway interface defining core function signatures
├── abstract/
│   └── FiatsendBase.sol         # Base contract with shared state, modifiers, and access control
├── libraries/
│   └── TokenManager.sol         # Library for decimal-aware token calculations
├── FiatsendGatewayV2.sol        # Main gateway contract (UUPS upgradeable)
└── mocks/
    ├── MockERC20.sol            # Mock ERC-20 token for testing
    └── MockOracle.sol           # Mock price oracle for testing
```

### IFiatsendGateway.sol

The interface defines the public API of the gateway contract. All external interactions — whether from the Fiatsend backend, partner integrations, or direct on-chain calls — go through these function signatures. The interface ensures that upgrades to the gateway implementation remain backwards-compatible with existing integrators.

### FiatsendBase.sol

The abstract base contract contains shared state variables, access control setup, and common modifiers used across the gateway. This includes:

- Storage layout for the UUPS proxy pattern
- Role definitions (`ADMIN_ROLE`, `OPERATOR_ROLE`, `PAUSER_ROLE`)
- Common modifiers like `whenNotPaused` and `onlyRole`
- Initialization logic for upgradeable deployment

### TokenManager.sol

The `TokenManager` library handles decimal-aware arithmetic for multi-token operations. Different stablecoins have different decimal precisions (e.g., USDC uses 6 decimals, DAI uses 18), and the library ensures conversions between tokens and to/from GHS amounts are mathematically correct regardless of the input token's precision.

### FiatsendGatewayV2.sol

The main gateway contract. It inherits from `FiatsendBase` and uses `TokenManager` for calculations. Key responsibilities:

- Processing stablecoin-to-GHSFIAT conversions
- Managing the list of supported stablecoins
- Executing payouts (triggering the off-chain mobile money leg)
- Emitting events for backend indexing and audit trails
- Administrative functions (pause, unpause, upgrade, role management)

## Token Calculation Example

The `TokenManager` library provides decimal-aware conversion functions. Here's a simplified example of how GHS-equivalent amounts are calculated:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library TokenManager {
    /**
     * @notice Calculate the GHSFIAT amount for a given stablecoin input.
     * @param amount The input amount in the source token's smallest unit.
     * @param tokenDecimals The number of decimals the source token uses.
     * @param ghsFiatDecimals The number of decimals GHSFIAT uses.
     * @param exchangeRate The GHS-per-USD rate, scaled to 1e18.
     * @return ghsFiatAmount The equivalent GHSFIAT amount.
     */
    function calculateGhsFiatAmount(
        uint256 amount,
        uint8 tokenDecimals,
        uint8 ghsFiatDecimals,
        uint256 exchangeRate
    ) internal pure returns (uint256 ghsFiatAmount) {
        // Normalize the input amount to 18 decimals
        uint256 normalizedAmount = amount * (10 ** (18 - tokenDecimals));

        // Apply the exchange rate (scaled to 1e18)
        uint256 rawGhsAmount = (normalizedAmount * exchangeRate) / 1e18;

        // Scale to GHSFIAT decimals
        ghsFiatAmount = rawGhsAmount / (10 ** (18 - ghsFiatDecimals));
    }
}
```

This approach ensures that converting 100 USDC (6 decimals) and 100 DAI (18 decimals) both produce the correct GHSFIAT amount, despite the different decimal scales.

:::info
The actual exchange rate is sourced from Fiatsend's rate oracle and updated periodically. The rate includes a small spread to cover operational costs. See [Fees & Limits](/docs/platform/fees-and-limits) for details.
:::

## Deployed Contracts

| Network | Contract | Address | Verified |
|---|---|---|---|
| Lisk Mainnet | FiatsendGatewayV2 (Proxy) | [TBD] | Yes |
| Lisk Mainnet | FiatsendGatewayV2 (Implementation) | [TBD] | Yes |
| Lisk Mainnet | GHSFIAT Token | [TBD] | Yes |
| Lisk Testnet | FiatsendGatewayV2 (Proxy) | [TBD] | Yes |
| Lisk Testnet | FiatsendGatewayV2 (Implementation) | [TBD] | Yes |
| Lisk Testnet | GHSFIAT Token | [TBD] | Yes |

:::info
All contracts are verified on the Lisk block explorer. You can view the source code, read contract state, and interact with functions directly through the explorer's UI.
:::

## Access Control Roles

The contract uses OpenZeppelin's `AccessControl` for role-based permissions:

| Role | Capabilities |
|---|---|
| `DEFAULT_ADMIN_ROLE` | Grant and revoke all other roles. Typically held by a multisig. |
| `ADMIN_ROLE` | Add/remove supported tokens, update exchange rate oracle, manage contract parameters. |
| `OPERATOR_ROLE` | Execute conversions and trigger payout events. Used by the Fiatsend backend. |
| `PAUSER_ROLE` | Pause and unpause the contract in emergencies. |
| `UPGRADER_ROLE` | Authorize contract upgrades via the UUPS pattern. |

:::warning
The `DEFAULT_ADMIN_ROLE` and `UPGRADER_ROLE` should be held by a multisig wallet or governance contract, not an individual EOA. Compromise of these roles would allow full control over the contract system.
:::

## Events

The gateway emits events for every significant state change. These events are indexed by the Fiatsend backend to update transaction statuses and trigger off-chain processes (like mobile money payouts).

```solidity
event ConversionInitiated(
    address indexed user,
    address indexed token,
    uint256 amount,
    uint256 ghsFiatAmount,
    bytes32 indexed conversionId
);

event PayoutExecuted(
    bytes32 indexed conversionId,
    address indexed user,
    uint256 ghsFiatAmount,
    bytes32 beneficiaryHash
);

event TokenAdded(address indexed token, string symbol, uint8 decimals);
event TokenRemoved(address indexed token);
event ContractPaused(address indexed by);
event ContractUnpaused(address indexed by);
```

## Testing & Deployment

The contract project uses **Hardhat** as the development framework. Below are the essential commands for working with the contracts locally.

### Running Tests

```bash
# Run the full test suite
npx hardhat test

# Run tests with gas reporting
REPORT_GAS=true npx hardhat test

# Run a specific test file
npx hardhat test test/FiatsendGatewayV2.test.ts
```

### Test Coverage

```bash
# Generate a coverage report
npx hardhat coverage
```

The coverage report is output to the `coverage/` directory. Open `coverage/index.html` in a browser to view line-by-line coverage.

### Deployment

```bash
# Deploy to Lisk Testnet
npx hardhat run scripts/deploy.ts --network lisk-testnet

# Deploy to Lisk Mainnet
npx hardhat run scripts/deploy.ts --network lisk-mainnet
```

### Upgrading

Since the contract uses the UUPS proxy pattern, upgrades are performed by deploying a new implementation contract and pointing the proxy to it:

```bash
# Upgrade on Lisk Testnet
npx hardhat run scripts/upgrade.ts --network lisk-testnet

# Upgrade on Lisk Mainnet
npx hardhat run scripts/upgrade.ts --network lisk-mainnet
```

### Verifying Contracts

```bash
# Verify on the Lisk block explorer
npx hardhat verify --network lisk-mainnet <CONTRACT_ADDRESS> <CONSTRUCTOR_ARGS>
```

:::tip
Always run the full test suite and generate a coverage report before deploying to mainnet. Aim for >95% line coverage on all critical contract paths.
:::

## Development Setup

To work with the contracts locally:

```bash
# Install dependencies
npm install

# Compile contracts
npx hardhat compile

# Start a local Hardhat node
npx hardhat node

# Deploy to the local node
npx hardhat run scripts/deploy.ts --network localhost
```

### Environment Variables

Create a `.env` file in the contract project root with the following variables:

```bash
# Private key for deployment (DO NOT commit this file)
DEPLOYER_PRIVATE_KEY=your_private_key_here

# Lisk RPC endpoints
LISK_MAINNET_RPC_URL=https://rpc.api.lisk.com
LISK_TESTNET_RPC_URL=https://rpc.sepolia-api.lisk.com

# Block explorer API key for verification
LISK_EXPLORER_API_KEY=your_api_key_here
```

:::warning
Never commit `.env` files or private keys to version control. Add `.env` to your `.gitignore` file.
:::

## Related Pages

- [GHSFIAT Stablecoin](/docs/platform/ghsfiat) — The GHS-pegged stablecoin managed by the gateway
- [Supported Stablecoins](/docs/platform/stablecoins) — Tokens supported by the contract
- [Fees & Limits](/docs/platform/fees-and-limits) — Conversion fees and rate details
- [Security & Compliance](/docs/security/overview) — Platform-wide security measures
- [Sandbox & Testing](/docs/resources/sandbox-and-testing) — Test environment for development
