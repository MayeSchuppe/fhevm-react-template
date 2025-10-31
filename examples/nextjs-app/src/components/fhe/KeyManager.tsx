'use client';

import React, { useState, useEffect } from 'react';
import { getPublicKey, storePublicKey, retrievePublicKey, clearPublicKey } from '@/lib/fhe/keys';
import { useFHEContext } from './FHEProvider';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export function KeyManager() {
  const { instance, isInitialized } = useFHEContext();
  const [publicKey, setPublicKey] = useState<string>('');
  const [isStored, setIsStored] = useState(false);

  useEffect(() => {
    if (isInitialized && instance) {
      const key = getPublicKey(instance);
      setPublicKey(key);

      // Check if key is already stored
      const storedKey = retrievePublicKey();
      setIsStored(storedKey === key);
    }
  }, [isInitialized, instance]);

  const handleStoreKey = () => {
    if (publicKey) {
      storePublicKey(publicKey);
      setIsStored(true);
    }
  };

  const handleClearKey = () => {
    clearPublicKey();
    setIsStored(false);
  };

  if (!isInitialized) {
    return (
      <Card title="Key Manager">
        <p className="text-gray-600">Please initialize FHE client first</p>
      </Card>
    );
  }

  return (
    <Card title="Key Manager">
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Public Key</h3>
          <div className="p-3 bg-gray-100 rounded font-mono text-xs break-all">
            {publicKey ? publicKey.slice(0, 100) + '...' : 'No key available'}
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleStoreKey}
            disabled={!publicKey || isStored}
            variant="primary"
          >
            {isStored ? 'Key Stored' : 'Store Key'}
          </Button>

          <Button
            onClick={handleClearKey}
            disabled={!isStored}
            variant="danger"
          >
            Clear Key
          </Button>
        </div>

        <div className="text-sm text-gray-600">
          <p className="font-semibold">Key Status:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Public Key Length: {publicKey.length} characters</li>
            <li>Storage Status: {isStored ? 'Stored in session' : 'Not stored'}</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
