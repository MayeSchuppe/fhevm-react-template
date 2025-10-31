'use client';

import { useState, useEffect } from 'react';
import { FHEProvider } from '@/components/fhe/FHEProvider';
import { EncryptionDemo } from '@/components/fhe/EncryptionDemo';
import { ComputationDemo } from '@/components/fhe/ComputationDemo';
import { KeyManager } from '@/components/fhe/KeyManager';
import { BankingExample } from '@/components/examples/BankingExample';
import { MedicalExample } from '@/components/examples/MedicalExample';
import { useFHE } from '@/hooks/useFHE';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

function HomePage() {
  const { initialize, isInitialized, isLoading, error } = useFHE();
  const [activeTab, setActiveTab] = useState<'demos' | 'examples'>('demos');

  const handleInitialize = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }

    try {
      await initialize({
        network: 'https://devnet.zama.ai',
        gatewayUrl: 'https://gateway.zama.ai',
      });
    } catch (err) {
      console.error('Initialization error:', err);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">FHEVM SDK - Next.js Demo</h1>
          <p className="text-gray-600">
            Complete Next.js integration with Fully Homomorphic Encryption (FHE) SDK
          </p>
        </div>

        {/* Initialization Card */}
        {!isInitialized && (
          <Card className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
            <p className="text-gray-700 mb-4">
              Initialize the FHEVM client to start using encrypted computations. This will
              connect to your wallet and set up the FHE instance.
            </p>
            <Button
              onClick={handleInitialize}
              disabled={isLoading}
              variant="primary"
              className="w-full sm:w-auto"
            >
              {isLoading ? 'Initializing...' : 'Initialize FHEVM Client'}
            </Button>
            {error && (
              <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                Error: {error}
              </div>
            )}
          </Card>
        )}

        {/* Initialized Content */}
        {isInitialized && (
          <>
            {/* Status Banner */}
            <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 rounded">
              <div className="flex items-center">
                <span className="text-green-800 font-semibold">
                  FHEVM Client Initialized Successfully
                </span>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6 border-b border-gray-200">
              <nav className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('demos')}
                  className={`pb-4 px-1 font-medium ${
                    activeTab === 'demos'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Core Demos
                </button>
                <button
                  onClick={() => setActiveTab('examples')}
                  className={`pb-4 px-1 font-medium ${
                    activeTab === 'examples'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Real-World Examples
                </button>
              </nav>
            </div>

            {/* Core Demos Tab */}
            {activeTab === 'demos' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <EncryptionDemo />
                </div>
                <div>
                  <ComputationDemo />
                </div>
                <div className="lg:col-span-2">
                  <KeyManager />
                </div>
              </div>
            )}

            {/* Real-World Examples Tab */}
            {activeTab === 'examples' && (
              <div className="space-y-6">
                <BankingExample />
                <MedicalExample />
              </div>
            )}

            {/* Features Section */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <h3 className="font-semibold mb-2">Framework Agnostic</h3>
                <p className="text-sm text-gray-600">
                  Works seamlessly with Next.js, React, Vue, or any JavaScript framework
                </p>
              </Card>
              <Card>
                <h3 className="font-semibold mb-2">Wagmi-like API</h3>
                <p className="text-sm text-gray-600">
                  Intuitive hooks and composables familiar to web3 developers
                </p>
              </Card>
              <Card>
                <h3 className="font-semibold mb-2">Type Safe</h3>
                <p className="text-sm text-gray-600">
                  Full TypeScript support with comprehensive type definitions
                </p>
              </Card>
            </div>
          </>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600 text-sm">
          <p>
            Built with FHEVM SDK |
            <a
              href="https://docs.zama.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 text-blue-600 hover:underline"
            >
              Documentation
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <FHEProvider>
      <HomePage />
    </FHEProvider>
  );
}
