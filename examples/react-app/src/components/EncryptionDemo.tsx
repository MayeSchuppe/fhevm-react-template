import { useState } from 'react';
import { useEncryption, useFhevm } from '@fhevm/sdk';

export default function EncryptionDemo() {
  const { client } = useFhevm();
  const { encrypt, isLoading, error } = useEncryption();
  const [inputValue, setInputValue] = useState<string>('');
  const [encryptedValue, setEncryptedValue] = useState<string>('');
  const [encryptionType, setEncryptionType] = useState<string>('uint32');

  const handleEncrypt = async () => {
    if (!inputValue) return;

    let value: any = inputValue;

    // Convert input based on type
    if (encryptionType === 'bool') {
      value = inputValue.toLowerCase() === 'true';
    } else if (encryptionType.startsWith('uint')) {
      value = parseInt(inputValue);
    }

    const encrypted = await encrypt(encryptionType, value);

    if (encrypted) {
      setEncryptedValue(
        Array.from(encrypted.data)
          .map(b => b.toString(16).padStart(2, '0'))
          .join('')
      );
    }
  };

  if (!client) {
    return (
      <div className="encryption-demo">
        <p className="info">Please connect your wallet to use encryption features.</p>
      </div>
    );
  }

  return (
    <div className="encryption-demo">
      <h2>Encryption Demo</h2>

      <div className="form-group">
        <label htmlFor="type-select">Encryption Type:</label>
        <select
          id="type-select"
          value={encryptionType}
          onChange={(e) => setEncryptionType(e.target.value)}
          className="select-input"
        >
          <option value="bool">Boolean</option>
          <option value="uint8">Uint8</option>
          <option value="uint16">Uint16</option>
          <option value="uint32">Uint32</option>
          <option value="uint64">Uint64</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="value-input">
          Value to Encrypt ({encryptionType === 'bool' ? 'true/false' : 'number'}):
        </label>
        <input
          id="value-input"
          type={encryptionType === 'bool' ? 'text' : 'number'}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={encryptionType === 'bool' ? 'true or false' : 'Enter a number'}
          className="text-input"
        />
      </div>

      <button
        onClick={handleEncrypt}
        disabled={isLoading || !inputValue}
        className="btn-primary"
      >
        {isLoading ? 'Encrypting...' : 'Encrypt Value'}
      </button>

      {error && <p className="error">Error: {error.message}</p>}

      {encryptedValue && (
        <div className="result">
          <h3>Encrypted Value:</h3>
          <p className="encrypted-output">{encryptedValue}</p>
          <p className="info-text">
            This encrypted value can be safely used in smart contract transactions
            without revealing the original data.
          </p>
        </div>
      )}
    </div>
  );
}
