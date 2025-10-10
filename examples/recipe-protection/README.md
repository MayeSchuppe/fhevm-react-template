# Recipe Protection dApp

A real-world example demonstrating confidential recipe management using FHEVM and the universal SDK.

## Overview

This dApp allows chefs to:
- Register their profile on-chain
- Create recipes with encrypted secret ingredients
- Control access to their recipes
- Approve/deny access requests from other users
- Monetize recipe access

## Features

### Smart Contract Features

- **Encrypted Recipe Data**: Secret ingredients, spice levels, and cooking times are encrypted using FHEVM
- **Access Control**: Fine-grained permissions using FHEVM's ACL system
- **Chef Profiles**: On-chain reputation and verification
- **Monetization**: Pay-to-access model for premium recipes
- **Privacy Preserved**: Computations on encrypted data without revealing secrets

### Encrypted Fields

Each recipe stores the following encrypted data:
- `secretIngredient1, 2, 3` (euint32)
- `secretSpiceLevel` (euint8)
- `secretCookingTime` (euint32)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Compile Contracts

```bash
npm run compile
```

### 3. Deploy Contracts

```bash
# Configure your .env file
cp .env.example .env

# Deploy to Zama devnet
npm run deploy
```

### 4. Run Tests

```bash
npm test
```

## Smart Contract Architecture

### RecipeVault.sol

Main contract managing recipes, chefs, and access control.

**Key Functions:**

- `registerChef(name, specialty)` - Register as a chef
- `createSecretRecipe(...)` - Create a new encrypted recipe
- `requestRecipeAccess(recipeId)` - Request access to a recipe
- `approveAccess(requestId)` - Chef approves access request
- `denyAccess(requestId)` - Chef denies access request
- `getRecipeInfo(recipeId)` - Get public recipe information
- `checkRecipeAccess(user, recipeId)` - Check if user has access

## SDK Integration Example

```typescript
import { createFhevmClient, EncryptionHelper } from '@fhevm/sdk';

// Initialize SDK
const client = await createFhevmClient({
  provider,
  network: 'https://devnet.zama.ai',
  gatewayUrl: 'https://gateway.zama.ai',
});

// Encrypt recipe data
const helper = new EncryptionHelper(client.getInstance());
const encryptedIngredient = helper.encryptUint32(ingredientId);
const encryptedSpiceLevel = helper.encryptUint8(spiceLevel);

// Create recipe
await contract.createSecretRecipe(
  "Secret Sauce",
  "Condiment",
  encryptedIngredient.data,
  // ... other encrypted fields
);
```

## Project Structure

```
recipe-protection/
├── contracts/
│   └── RecipeVault.sol          # Main smart contract
├── scripts/
│   └── deploy.js                # Deployment script
├── test/
│   └── RecipeVault.test.js      # Contract tests
├── hardhat.config.js            # Hardhat configuration
└── package.json
```

## Use Cases

1. **Professional Chefs**: Protect signature recipes while sharing publicly
2. **Recipe Marketplaces**: Monetize unique cooking techniques
3. **Culinary Schools**: Share educational content with verified students
4. **Food Industry**: Protect trade secrets in product development

## Security Considerations

- All sensitive recipe data is encrypted using FHEVM
- Access control is enforced on-chain
- EIP-712 signatures for secure decryption requests
- Payment required before access is granted

## Learn More

- [FHEVM SDK Documentation](../../packages/fhevm-sdk/README.md)
- [Zama FHEVM](https://docs.zama.ai/)
- [Hardhat Documentation](https://hardhat.org/)
