import { useState, useEffect } from 'react';
import { useFhevm } from '@fhevm/sdk';

export default function WalletConnect() {
  const { client, init, isLoading, error } = useFhevm();
  const [account, setAccount] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setAccount(accounts[0]);
      setIsConnected(true);

      // Initialize FHEVM client
      await init(
        window.ethereum,
        'https://devnet.zama.ai',
        'https://gateway.zama.ai'
      );
    } catch (error) {
      console.error('Connection error:', error);
    }
  };

  const disconnectWallet = () => {
    setAccount('');
    setIsConnected(false);
  };

  return (
    <div className="wallet-connect">
      <h2>Wallet Connection</h2>

      {!isConnected ? (
        <button onClick={connectWallet} disabled={isLoading} className="btn-primary">
          {isLoading ? 'Connecting...' : 'Connect Wallet'}
        </button>
      ) : (
        <div className="connected">
          <p className="account">
            Connected: {account.slice(0, 6)}...{account.slice(-4)}
          </p>
          <button onClick={disconnectWallet} className="btn-secondary">
            Disconnect
          </button>
        </div>
      )}

      {error && <p className="error">Error: {error.message}</p>}
      {client && <p className="success">FHEVM client initialized successfully!</p>}
    </div>
  );
}
