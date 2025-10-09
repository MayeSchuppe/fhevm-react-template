# Next.js FHEVM Example

This is a Next.js application demonstrating the FHEVM SDK integration for building confidential dApps.

## Features

- Wallet connection with MetaMask
- FHEVM client initialization
- Value encryption (multiple types supported)
- Clean, modern UI with Tailwind CSS
- TypeScript support

## Getting Started

### Prerequisites

- Node.js 18+
- MetaMask browser extension

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

```bash
npm run build
npm start
```

## Usage

1. **Connect Wallet**: Click "Connect Wallet" to connect your MetaMask
2. **SDK Initialization**: The FHEVM client initializes automatically
3. **Encrypt Values**: Enter a number and click "Encrypt" to see FHE in action
4. **View Results**: See the encrypted value displayed as hex

## Project Structure

```
nextjs-app/
├── src/
│   └── app/
│       ├── layout.tsx      # Root layout
│       ├── page.tsx        # Main page with encryption demo
│       └── globals.css     # Global styles
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── package.json
```

## Key Technologies

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **@fhevm/sdk**: Universal FHEVM SDK
- **ethers v6**: Ethereum library

## SDK Integration

The example shows how to:

```tsx
import { createFhevmClient, EncryptionHelper } from '@fhevm/sdk';

// Initialize client
const client = await createFhevmClient({
  provider: new BrowserProvider(window.ethereum),
  network: 'https://devnet.zama.ai',
  gatewayUrl: 'https://gateway.zama.ai',
});

// Encrypt values
const helper = new EncryptionHelper(client.getInstance());
const encrypted = helper.encryptUint32(42);
```

## Learn More

- [FHEVM SDK Documentation](../../packages/fhevm-sdk/README.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Zama FHEVM](https://docs.zama.ai/)
