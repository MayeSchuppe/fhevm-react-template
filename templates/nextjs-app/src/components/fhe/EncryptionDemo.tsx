'use client';

import React, { useState } from 'react';
import { useEncryption } from '@/hooks/useEncryption';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import type { FHEType } from '@/lib/fhe/types';

export function EncryptionDemo() {
  const [inputValue, setInputValue] = useState('');
  const [selectedType, setSelectedType] = useState<FHEType>('uint32');
  const [encryptedResult, setEncryptedResult] = useState<string>('');
  const { encrypt, isEncrypting, error } = useEncryption();

  const handleEncrypt = async () => {
    if (!inputValue) return;

    try {
      const value = selectedType === 'bool' ? inputValue === 'true' : parseInt(inputValue);
      const encrypted = await encrypt(selectedType, value);

      const hexString = Array.from(encrypted.data)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

      setEncryptedResult(hexString);
    } catch (err) {
      console.error('Encryption failed:', err);
    }
  };

  return (
    <Card title="Encryption Demo">
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Data Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as FHEType)}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="bool">Boolean</option>
            <option value="uint8">Uint8</option>
            <option value="uint16">Uint16</option>
            <option value="uint32">Uint32</option>
            <option value="uint64">Uint64</option>
          </select>
        </div>

        <Input
          label="Value to Encrypt"
          type={selectedType === 'bool' ? 'text' : 'number'}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={selectedType === 'bool' ? 'true or false' : 'Enter a number'}
        />

        <Button
          onClick={handleEncrypt}
          disabled={isEncrypting || !inputValue}
          variant="primary"
          className="w-full"
        >
          {isEncrypting ? 'Encrypting...' : 'Encrypt Value'}
        </Button>

        {error && (
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            Error: {error}
          </div>
        )}

        {encryptedResult && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h3 className="font-semibold mb-2">Encrypted Data (Hex):</h3>
            <p className="font-mono text-sm break-all">{encryptedResult}</p>
          </div>
        )}
      </div>
    </Card>
  );
}
