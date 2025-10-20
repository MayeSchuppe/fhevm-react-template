# Setup Guide

Complete setup instructions for the FHEVM SDK project.

## Prerequisites

- **Node.js** 18 or higher
- **npm** 9 or higher
- **MetaMask** browser extension
- **Git** for cloning the repository

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd fhevm-react-template
```

### 2. Install All Dependencies

From the root directory, install all packages:

```bash
npm install
```

This will install dependencies for:
- The SDK package
- All example applications
- Root workspace

### 3. Build the SDK

```bash
npm run build:sdk
```

This compiles the TypeScript SDK into JavaScript modules (CJS and ESM).

## Running Examples

### Next.js Example

```bash
npm run dev:nextjs
```

Visit http://localhost:3000

### React Example

```bash
npm run dev:react
```

Visit http://localhost:5173

### Smart Contract Example

```bash
# 1. Compile contracts
npm run compile:contracts

# 2. Configure environment
cp examples/recipe-protection/.env.example examples/recipe-protection/.env
# Edit .env and add your PRIVATE_KEY

# 3. Deploy
npm run deploy:contracts
```

## Development Workflow

### Working on the SDK

```bash
cd packages/fhevm-sdk
npm run dev        # Watch mode for development
npm run build      # Production build
npm test           # Run tests
npm run lint       # Lint code
```

### Working on Examples

Each example has its own development server:

```bash
# Next.js
cd examples/nextjs-app
npm run dev

# React
cd examples/react-app
npm run dev

# Contracts
cd examples/recipe-protection
npm run compile
npm test
```

## Troubleshooting

### Node Modules Issues

If you encounter dependency issues:

```bash
# Clean install
rm -rf node_modules package-lock.json
rm -rf packages/*/node_modules packages/*/package-lock.json
rm -rf examples/*/node_modules examples/*/package-lock.json
npm install
```

### Build Errors

Ensure you've built the SDK before running examples:

```bash
npm run build:sdk
```

### MetaMask Connection

1. Install MetaMask extension
2. Create or import a wallet
3. Connect to Zama devnet:
   - Network Name: Zama Devnet
   - RPC URL: https://devnet.zama.ai
   - Chain ID: 8009
   - Currency Symbol: ZAMA

## Testing

Run all tests:

```bash
npm run test:all
```

Run specific tests:

```bash
npm run test:sdk           # SDK unit tests
npm run test:examples      # Contract tests
```

## Next Steps

1. Review the [main README](./README.md)
2. Check example applications in `examples/`
3. Read SDK documentation in `packages/fhevm-sdk/README.md`
4. Watch the demo video: `demo.mp4`

## Support

For issues or questions:
- Check the documentation
- Review example code
- Open an issue on GitHub
