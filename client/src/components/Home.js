import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import './Home.css';

const Home = ({ onTryNow }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const redirectToMetaMask = () => {
    const isFirefox = navigator.userAgent.indexOf("Firefox") !== -1;
    const metamaskURL = isFirefox
      ? 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/'
      : 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn';
    
    if (window.confirm('MetaMask extension is required to use this application. Would you like to install it now?')) {
      window.open(metamaskURL, '_blank');
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      redirectToMetaMask();
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      const account = accounts[0];
      setWalletAddress(account);
      setIsConnected(true);

      // Create Web3 Provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      
      // Listen for account changes
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          setIsConnected(false);
          setWalletAddress('');
        } else {
          const newAccount = accounts[0];
          setWalletAddress(newAccount);
        }
      });

    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Failed to connect wallet. Please try again.');
    }
  };

  const handleTryNow = () => {
    onTryNow();
  };

  return (
    <div className="home-container">
      <div className="background-animation">
        <div className="cube"></div>
        <div className="cube"></div>
        <div className="cube"></div>
        <div className="cube"></div>
        <div className="cube"></div>
      </div>

      {location.pathname === '/' && (
        <div className="hero-section">
          <div className="glass-card">
            <h1 className="hero-title">Welcome to PriveX_3.0</h1>
            <h2 className="hero-subtitle">Experience the Future of Secure Data Sharing</h2>
            
            <div className="action-buttons">
              {!isConnected ? (
                <button 
                  className="secondary-btn"
                  onClick={connectWallet}
                  data-metamask={window.ethereum ? "true" : "false"}
                >
                  <span>
                    {window.ethereum ? 'CONNECT WALLET' : 'INSTALL METAMASK'}
                  </span>
                  <div className="btn-glow"></div>
                </button>
              ) : (
                <>
                  <span className="wallet-label">Connected Wallet</span>
                  <span className="wallet-address">{walletAddress}</span>
                  <button 
                    className="primary-btn try-now-btn"
                    onClick={handleTryNow}
                  >
                    <span>TRY NOW</span>
                    <div className="btn-glow"></div>
                  </button>
                </>
              )}
            </div>

            <div className="tech-badges">
              <span className="tech-badge">IPFS</span>
              <span className="tech-badge">BLOCKCHAIN</span>
              <span className="tech-badge">WEB3</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;