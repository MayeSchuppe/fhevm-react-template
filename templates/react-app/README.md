# React FHEVM Example

A standalone React application showcasing FHEVM SDK integration with React hooks and context providers.

## Features

- **FhevmProvider**: React context for SDK access
- **Custom Hooks**: `useFhevm()`, `useEncryption()`, `useDecryption()`
- **Multiple Encryption Types**: Support for bool, uint8, uint16, uint32, uint64
- **Modern UI**: Clean interface with responsive design
- **Vite**: Fast development with HMR

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

Open [http://localhost:5173](http://localhost:5173) to view the app.

### Build

```bash
npm run build
npm run preview
```

## Project Structure

```
react-app/
├── src/
│   ├── components/
│   │   ├── WalletConnect.tsx    # Wallet connection component
│   │   └── EncryptionDemo.tsx   # Encryption demo component
│   ├── App.tsx                  # Main app with FhevmProvider
│   ├── App.css                  # Component styles
│   ├── index.css                # Global styles
│   └── main.tsx                 # Entry point
├── vite.config.ts               # Vite configuration
└── package.json
```

## SDK Integration

### Using React Context

```tsx
import { FhevmProvider } from '@fhevm/sdk';

function App() {
  return (
    <FhevmProvider>
      <YourComponent />
    </FhevmProvider>
  );
}
```

### Using Hooks

```tsx
import { useFhevm, useEncryption } from '@fhevm/sdk';

function Component() {
  const { client, init } = useFhevm();
  const { encrypt, isLoading, error } = useEncryption();

  // Initialize
  await init(window.ethereum, networkUrl, gatewayUrl);

  // Encrypt
  const encrypted = await encrypt('uint32', 42);
}
```

## Key Technologies

- **React 18**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **@fhevm/sdk**: FHEVM SDK with React hooks
- **ethers v6**: Ethereum library

## Learn More

- [FHEVM SDK Documentation](../../packages/fhevm-sdk/README.md)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
