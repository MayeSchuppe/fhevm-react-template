# Architecture Overview

This document explains the architecture and design decisions of the Universal FHEVM SDK.

## Design Goals

1. **Framework Agnostic**: Core functionality works with any JavaScript framework
2. **Developer Friendly**: Familiar API patterns (wagmi-like for React)
3. **Type Safe**: Full TypeScript support
4. **Modular**: Use only what you need
5. **Production Ready**: Tested and optimized for real-world use

## Architecture Layers

```
┌─────────────────────────────────────────────┐
│           Application Layer                 │
│   (Next.js, React, Vue, Node.js, etc.)     │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│        Framework Integration Layer          │
│    (React Hooks, Vue Composables, etc.)    │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│            Core SDK Layer                   │
│  (FhevmClient, Encryption, Decryption)     │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│          Dependencies Layer                 │
│      (fhevmjs, ethers, etc.)               │
└─────────────────────────────────────────────┘
```

## Core Components

### 1. FhevmClient

The main client that manages FHEVM instance initialization and configuration.

**Responsibilities:**
- Initialize fhevmjs instance
- Manage provider connection
- Handle public key retrieval
- Coordinate encryption/decryption

**Usage:**
```typescript
const client = await createFhevmClient({
  provider: BrowserProvider,
  network: string,
  gatewayUrl: string,
});
```

### 2. EncryptionHelper

Provides methods for encrypting different data types.

**Supported Types:**
- Boolean (ebool)
- Unsigned integers (euint8, euint16, euint32, euint64, euint128, euint256)
- Addresses (eaddress)
- Bytes (ebytes64, ebytes128, ebytes256)

**Usage:**
```typescript
const helper = new EncryptionHelper(instance);
const encrypted = helper.encryptUint32(42);
```

### 3. DecryptionHelper

Handles both user-specific and public decryption.

**Methods:**
- `userDecrypt()` - EIP-712 signed decryption
- `publicDecrypt()` - Public view function calls
- `batchDecrypt()` - Multiple decryptions in parallel

**Usage:**
```typescript
const helper = new DecryptionHelper(provider, gatewayUrl);
const value = await helper.userDecrypt({
  contractAddress,
  handle,
  userAddress,
});
```

## React Integration

### Context Provider

The `FhevmProvider` wraps your application and provides client access.

```tsx
<FhevmProvider config={config}>
  <App />
</FhevmProvider>
```

### Hooks

Custom hooks for common operations:

- `useFhevm()` - Access client and initialization
- `useEncryption()` - Encrypt values
- `useDecryption()` - Decrypt values
- `useContract()` - Contract interactions

## Data Flow

### Encryption Flow

```
User Input → Encryption Helper → FHEVM Instance → Encrypted Data → Contract
```

### Decryption Flow

```
Contract → Handle → EIP-712 Signature → Gateway → Decrypted Value
```

## Security Considerations

1. **Private Keys**: Never exposed, only used for signing
2. **Encrypted Data**: Remains encrypted on-chain
3. **Access Control**: Enforced by FHEVM ACL system
4. **Signatures**: EIP-712 for secure decryption requests

## Performance Optimizations

1. **Lazy Initialization**: Client initialized only when needed
2. **Instance Caching**: FHEVM instance reused across operations
3. **Batch Operations**: Support for parallel encryption/decryption
4. **Public Key Caching**: Contract public keys cached

## Error Handling

Consistent error handling across all layers:

```typescript
try {
  const encrypted = await encrypt('uint32', value);
} catch (error) {
  // Handle encryption error
}
```

All functions return typed errors with descriptive messages.

## Type System

Full TypeScript support with:

- Interface definitions for all data structures
- Generic types for contract interactions
- Strict type checking
- IntelliSense support

## Extension Points

The SDK is designed for extension:

1. **Custom Hooks**: Create framework-specific hooks
2. **Helper Functions**: Add utility functions
3. **Custom Types**: Extend type definitions
4. **Middleware**: Add logging, metrics, etc.

## Best Practices

1. **Initialize Once**: Create client once, reuse throughout app
2. **Error Handling**: Always wrap operations in try-catch
3. **Type Safety**: Use TypeScript for type checking
4. **Access Control**: Verify permissions before operations
5. **Testing**: Write tests for critical paths

## Future Enhancements

Potential future additions:

- Vue.js composables
- Svelte stores
- Additional encryption types
- Advanced caching strategies
- Performance monitoring
- Developer tools

## Comparison to Other Solutions

### vs. Direct fhevmjs Usage

**Advantages:**
- Higher-level API
- Framework integration
- Better error handling
- Type safety
- Reusable patterns

### vs. Template Approach

**Advantages:**
- Installable package
- Version management
- Consistent updates
- Easier integration
- Better documentation

## References

- [Zama FHEVM Documentation](https://docs.zama.ai/)
- [fhevmjs Library](https://github.com/zama-ai/fhevmjs)
- [Ethers.js Documentation](https://docs.ethers.org/)
