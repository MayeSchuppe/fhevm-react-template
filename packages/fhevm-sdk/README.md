# @fhevm/sdk

Universal FHEVM SDK for building confidential dApps with encrypted computation. This SDK provides a framework-agnostic solution for working with Fully Homomorphic Encryption (FHE) in blockchain applications.

## Features

- 🔐 **Universal Encryption**: Support for all FHEVM encrypted types (bool, uint8-256, address, bytes)
- 🔓 **Flexible Decryption**: Both user-specific and public decryption methods
- ⚛️ **React Integration**: Optional React hooks and context providers
- 🎯 **Type-Safe**: Full TypeScript support with comprehensive type definitions
- 🔌 **Framework Agnostic**: Core functionality works with any JavaScript framework
- 📦 **Zero Configuration**: Sensible defaults with easy customization

## Installation

```bash
npm install @fhevm/sdk ethers fhevmjs
```

## Quick Start

### Basic Usage (Framework Agnostic)

```typescript
import { createFhevmClient, EncryptionHelper } from '@fhevm/sdk';
import { BrowserProvider } from 'ethers';

// Initialize client
const provider = new BrowserProvider(window.ethereum);
const client = await createFhevmClient({
  provider,
  network: 'https://devnet.zama.ai',
  gatewayUrl: 'https://gateway.zama.ai',
});

// Encrypt values
const instance = client.getInstance();
const encryptionHelper = new EncryptionHelper(instance);
const encrypted = encryptionHelper.encryptUint32(42);

// Use encrypted data in contract calls
const contract = new Contract(address, abi, signer);
await contract.submitValue(encrypted.data);
```

### React Integration

```tsx
import { FhevmProvider, useFhevm, useEncryption } from '@fhevm/sdk';

function App() {
  return (
    <FhevmProvider>
      <YourComponent />
    </FhevmProvider>
  );
}

function YourComponent() {
  const { client, init } = useFhevm();
  const { encrypt } = useEncryption();

  useEffect(() => {
    if (window.ethereum) {
      init(window.ethereum, 'https://devnet.zama.ai', 'https://gateway.zama.ai');
    }
  }, []);

  const handleEncrypt = async () => {
    const encrypted = await encrypt('uint32', 42);
    // Use encrypted data...
  };

  return <button onClick={handleEncrypt}>Encrypt Value</button>;
}
```

## API Reference

### Core Classes

#### `FhevmClient`

Main client for interacting with FHEVM.

```typescript
const client = await createFhevmClient({
  provider: BrowserProvider,
  network: string,
  gatewayUrl?: string,
  aclAddress?: string,
});
```

#### `EncryptionHelper`

Helper for encrypting values.

```typescript
const helper = new EncryptionHelper(instance);
const encrypted = helper.encryptUint32(42);
```

#### `DecryptionHelper`

Helper for decrypting values.

```typescript
const helper = new DecryptionHelper(provider, gatewayUrl);
const decrypted = await helper.userDecrypt({
  contractAddress,
  handle,
  userAddress,
});
```

### React Hooks

#### `useFhevm()`

Access the FHEVM client instance.

#### `useEncryption()`

Hook for encrypting values.

#### `useDecryption(gatewayUrl)`

Hook for decrypting values.

#### `useContract(address, abi)`

Hook for contract interactions.

## Examples

See the `examples/` directory for complete working examples:

- `examples/nextjs-app` - Next.js application
- `examples/react-app` - React application
- `examples/recipe-protection` - Real-world recipe protection dApp

## License

MIT
