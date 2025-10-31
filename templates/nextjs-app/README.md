# Next.js FHEVM Example

A complete Next.js application demonstrating comprehensive FHEVM SDK integration for building confidential dApps with encrypted computation.

## Features

### Core Functionality
- **Wallet Connection**: Seamless MetaMask integration
- **FHEVM Initialization**: Automatic client setup with FHEProvider context
- **Multi-Type Encryption**: Support for bool, uint8, uint16, uint32, uint64, and more
- **Homomorphic Computation**: Perform operations on encrypted data
- **Key Management**: Public key storage and retrieval
- **API Routes**: Server-side FHE operation endpoints

### UI Components
- **Encryption Demo**: Interactive encryption with multiple data types
- **Computation Demo**: Homomorphic arithmetic operations
- **Key Manager**: Public key management interface
- **Banking Example**: Confidential balance and transaction encryption
- **Medical Example**: Encrypted health records (HIPAA-compliant)

### Developer Experience
- **TypeScript**: Full type safety with comprehensive type definitions
- **Path Aliases**: Clean imports with `@/` prefix
- **Modern UI**: Tailwind CSS with responsive design
- **Modular Architecture**: Well-organized component structure

## Project Structure

```
nextjs-app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Main page with tabs
│   │   ├── globals.css         # Global styles
│   │   └── api/                # API routes
│   │       ├── fhe/
│   │       │   ├── route.ts         # Main FHE endpoint
│   │       │   ├── encrypt/route.ts # Encryption API
│   │       │   ├── decrypt/route.ts # Decryption API
│   │       │   └── compute/route.ts # Computation API
│   │       └── keys/route.ts        # Key management API
│   │
│   ├── components/             # React components
│   │   ├── ui/                 # Base UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Card.tsx
│   │   ├── fhe/                # FHE functionality
│   │   │   ├── FHEProvider.tsx      # Context provider
│   │   │   ├── EncryptionDemo.tsx   # Encryption demo
│   │   │   ├── ComputationDemo.tsx  # Computation demo
│   │   │   └── KeyManager.tsx       # Key management
│   │   └── examples/           # Use case examples
│   │       ├── BankingExample.tsx   # Financial use case
│   │       └── MedicalExample.tsx   # Healthcare use case
│   │
│   ├── lib/                    # Utility libraries
│   │   ├── fhe/                # FHE integration
│   │   │   ├── client.ts            # Client-side FHE
│   │   │   ├── server.ts            # Server-side utilities
│   │   │   ├── keys.ts              # Key management
│   │   │   └── types.ts             # FHE type utilities
│   │   └── utils/              # General utilities
│   │       ├── security.ts          # Security helpers
│   │       └── validation.ts        # Input validation
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useFHE.ts                # FHE client hook
│   │   ├── useEncryption.ts         # Encryption hook
│   │   └── useComputation.ts        # Computation hook
│   │
│   └── types/                  # TypeScript definitions
│       ├── fhe.ts                   # FHE types
│       └── api.ts                   # API types
│
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS config
├── tsconfig.json               # TypeScript config
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- MetaMask browser extension
- Access to FHEVM testnet/devnet

### Installation

```bash
# From the nextjs-app directory
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Build for Production

```bash
npm run build
npm start
```

## Usage Guide

### 1. Initialize FHEVM Client

Click "Initialize FHEVM Client" on the homepage. This will:
- Connect to your MetaMask wallet
- Initialize the FHE instance
- Set up encryption/decryption capabilities

### 2. Core Demos Tab

**Encryption Demo:**
- Select data type (bool, uint8, uint16, uint32, uint64)
- Enter a value to encrypt
- See the encrypted result in hexadecimal format

**Computation Demo:**
- Enter two operands
- Select operation (add, subtract, multiply)
- Perform homomorphic computation on encrypted data

**Key Manager:**
- View the FHE public key
- Store/clear key in session storage
- Check key status and metadata

### 3. Real-World Examples Tab

**Banking Example:**
- Encrypt account balances
- Encrypt transfer amounts
- View transaction history with encrypted values

**Medical Example:**
- Encrypt vital signs (blood pressure, heart rate, blood sugar)
- Store encrypted medical records
- Demonstrate HIPAA-compliant encryption

## SDK Integration Examples

### Basic Setup

```tsx
'use client';

import { FHEProvider } from '@/components/fhe/FHEProvider';

export default function App() {
  return (
    <FHEProvider>
      <YourComponents />
    </FHEProvider>
  );
}
```

### Using Hooks

```tsx
import { useFHE } from '@/hooks/useFHE';
import { useEncryption } from '@/hooks/useEncryption';

function MyComponent() {
  const { initialize, isInitialized } = useFHE();
  const { encrypt, isEncrypting } = useEncryption();

  const handleEncrypt = async () => {
    const encrypted = await encrypt('uint32', 42);
    console.log('Encrypted:', encrypted);
  };

  return (
    <button onClick={handleEncrypt}>
      Encrypt Value
    </button>
  );
}
```

### Direct SDK Usage

```tsx
import { createFhevmClient, EncryptionHelper } from '@fhevm/sdk';
import { BrowserProvider } from 'ethers';

const provider = new BrowserProvider(window.ethereum);
const client = await createFhevmClient({
  provider,
  network: 'https://devnet.zama.ai',
  gatewayUrl: 'https://gateway.zama.ai',
});

const helper = new EncryptionHelper(client.getInstance());
const encrypted = helper.encryptUint32(100);
```

## API Routes

### Available Endpoints

- `GET /api/fhe` - FHE API status and information
- `POST /api/fhe/encrypt` - Encrypt a value (demo only)
- `POST /api/fhe/decrypt` - Decrypt encrypted data
- `POST /api/fhe/compute` - Perform homomorphic computation
- `GET /api/keys` - Get public key information
- `POST /api/keys` - Validate a public key

**Note:** Encryption should always be performed client-side for security. Server endpoints are for demonstration purposes only.

## Key Technologies

- **Next.js 14**: React framework with App Router
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling
- **@fhevm/sdk**: Universal FHEVM SDK
- **ethers v6**: Ethereum interactions
- **fhevmjs**: Core FHE library

## Security Features

- Client-side encryption for sensitive data
- EIP-712 signature support for decryption
- Input validation and sanitization
- Rate limiting helpers
- Secure key management

## Customization

### Adding New Encryption Types

```tsx
// In useEncryption hook
case 'uint128':
  encrypted = helper.encryptUint128(BigInt(value));
  break;
```

### Creating Custom Components

Follow the existing patterns in `src/components/`:
- Use TypeScript for type safety
- Leverage custom hooks for FHE operations
- Follow the UI component structure

### Adding API Routes

Create new routes in `src/app/api/` following the existing pattern:

```tsx
// src/app/api/your-route/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Your logic here
}
```

## Learn More

- [FHEVM SDK Documentation](../../packages/fhevm-sdk/README.md)
- [Main Project README](../../README.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Zama FHEVM Documentation](https://docs.zama.ai/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Troubleshooting

### MetaMask Connection Issues
- Ensure MetaMask is installed and unlocked
- Check that you're on the correct network
- Clear browser cache and reload

### Encryption Errors
- Verify FHEVM client is initialized
- Check that values are within valid ranges for the type
- Ensure proper network connectivity

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Clear `.next` folder: `rm -rf .next`
- Check TypeScript errors: `npm run typecheck`

## Contributing

This example is part of the FHEVM SDK project. See the main [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

## License

MIT
