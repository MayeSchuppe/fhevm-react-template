'use client';

import { useState, useEffect } from 'react';
import { BrowserProvider } from 'ethers';
import { createFhevmClient, EncryptionHelper } from '@fhevm/sdk';
import type { FhevmClient } from '@fhevm/sdk';

export default function Home() {
  const [client, setClient] = useState<FhevmClient | null>(null);
  const [account, setAccount] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);
  const [encryptedValue, setEncryptedValue] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      setAccount(accounts[0]);
      setIsConnected(true);

      // Initialize FHEVM client
      const fhevmClient = await createFhevmClient({
        provider,
        network: 'https://devnet.zama.ai',
        gatewayUrl: 'https://gateway.zama.ai',
      });

      setClient(fhevmClient);
    } catch (error) {
      console.error('Connection error:', error);
    }
  };

  const encryptValue = async () => {
    if (!client || !inputValue) return;

    try {
      const instance = client.getInstance();
      const helper = new EncryptionHelper(instance);
      const encrypted = helper.encryptUint32(parseInt(inputValue));

      setEncryptedValue(
        Array.from(encrypted.data)
          .map(b => b.toString(16).padStart(2, '0'))
          .join('')
      );
    } catch (error) {
      console.error('Encryption error:', error);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">FHEVM SDK - Next.js Example</h1>

        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Wallet Connection</h2>
          {!isConnected ? (
            <button
              onClick={connectWallet}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Connect Wallet
            </button>
          ) : (
            <div className="text-green-600">
              Connected: {account.slice(0, 6)}...{account.slice(-4)}
            </div>
          )}
        </div>

        {isConnected && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Encrypt Value</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Enter a number (uint32):
              </label>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="e.g., 42"
              />
            </div>
            <button
              onClick={encryptValue}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Encrypt
            </button>

            {encryptedValue && (
              <div className="mt-4 p-4 bg-gray-100 rounded">
                <h3 className="font-semibold mb-2">Encrypted Value:</h3>
                <p className="font-mono text-sm break-all">{encryptedValue}</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">About This Example</h2>
          <p className="text-gray-700">
            This Next.js application demonstrates the FHEVM SDK integration for building
            confidential dApps with encrypted computation. The SDK provides a simple,
            wagmi-like API for working with Fully Homomorphic Encryption.
          </p>
        </div>
      </div>
    </main>
  );
}
