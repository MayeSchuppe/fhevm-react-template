'use client';

import React, { useState } from 'react';
import { useEncryption } from '@/hooks/useEncryption';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export function BankingExample() {
  const [balance, setBalance] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [encryptedBalance, setEncryptedBalance] = useState<string>('');
  const [transactionHistory, setTransactionHistory] = useState<string[]>([]);
  const { encrypt, isEncrypting } = useEncryption();

  const handleEncryptBalance = async () => {
    if (!balance) return;

    try {
      const encrypted = await encrypt('uint32', parseInt(balance));
      const hexString = Array.from(encrypted.data)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

      setEncryptedBalance(hexString);
      setTransactionHistory(prev => [
        ...prev,
        `Balance encrypted: ${balance} → ${hexString.slice(0, 16)}...`
      ]);
    } catch (err) {
      console.error('Encryption failed:', err);
    }
  };

  const handleEncryptTransfer = async () => {
    if (!transferAmount) return;

    try {
      const encrypted = await encrypt('uint32', parseInt(transferAmount));
      const hexString = Array.from(encrypted.data)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

      setTransactionHistory(prev => [
        ...prev,
        `Transfer encrypted: ${transferAmount} → ${hexString.slice(0, 16)}...`
      ]);
    } catch (err) {
      console.error('Encryption failed:', err);
    }
  };

  return (
    <Card title="Confidential Banking Example">
      <div className="space-y-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
          <p className="text-sm text-blue-800">
            <strong>Use Case:</strong> Keep account balances and transaction amounts private
            using FHE encryption. Only authorized parties can decrypt and view the data.
          </p>
        </div>

        <div>
          <Input
            label="Account Balance (USD)"
            type="number"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            placeholder="Enter balance amount"
          />
          <Button
            onClick={handleEncryptBalance}
            disabled={isEncrypting || !balance}
            variant="primary"
            className="mt-2"
          >
            Encrypt Balance
          </Button>
        </div>

        {encryptedBalance && (
          <div className="p-4 bg-green-50 border border-green-200 rounded">
            <h4 className="font-semibold mb-2">Encrypted Balance:</h4>
            <p className="font-mono text-xs break-all">{encryptedBalance.slice(0, 64)}...</p>
          </div>
        )}

        <div className="border-t pt-4">
          <Input
            label="Transfer Amount (USD)"
            type="number"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
            placeholder="Enter transfer amount"
          />
          <Button
            onClick={handleEncryptTransfer}
            disabled={isEncrypting || !transferAmount}
            variant="success"
            className="mt-2"
          >
            Encrypt Transfer
          </Button>
        </div>

        {transactionHistory.length > 0 && (
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-2">Transaction History:</h4>
            <div className="space-y-2">
              {transactionHistory.map((tx, index) => (
                <div key={index} className="p-2 bg-gray-100 rounded text-sm font-mono">
                  {tx}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
