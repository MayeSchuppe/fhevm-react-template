import { useState } from 'react';
import { FhevmProvider } from '@fhevm/sdk';
import WalletConnect from './components/WalletConnect';
import EncryptionDemo from './components/EncryptionDemo';
import './App.css';

function App() {
  return (
    <FhevmProvider>
      <div className="app">
        <header className="app-header">
          <h1>FHEVM SDK - React Example</h1>
          <p>Confidential dApp using Fully Homomorphic Encryption</p>
        </header>

        <main className="app-main">
          <WalletConnect />
          <EncryptionDemo />
        </main>

        <footer className="app-footer">
          <p>Built with @fhevm/sdk - Universal FHEVM SDK for confidential computing</p>
        </footer>
      </div>
    </FhevmProvider>
  );
}

export default App;
