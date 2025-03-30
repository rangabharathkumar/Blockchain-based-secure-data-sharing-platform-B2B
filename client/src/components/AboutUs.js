import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-header">
          <h2>About <span>PriveX 3.0 </span></h2>
          <p className="about-subtitle">
            The future of secure, decentralized data sharing powered by blockchain technology
          </p>
        </div>

       
    <div className="about-description-container">
      <p className="about-description-text">
        <strong className="highlight">PriveX 3.0</strong> 
        &nbsp;is a revolutionary decentralized platform that combines military-grade encryption with 
        <strong className="highlight"> blockchain technology</strong> 
        to provide truly secure data sharing. Our solution leverages 
        <strong className="highlight"> IPFS storage</strong>, 
        <strong className="highlight"> smart contract access control</strong>, 
        and <strong className="highlight"> end-to-end encryption</strong> 
        to ensure your data remains private and tamper-proof.
      </p>
    </div>
  



        <div className="stats-container">
          <div className="stat-box">
            <div className="stat-value">256-bit</div>
            <div className="stat-label">AES Encryption</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">100%</div>
            <div className="stat-label">Decentralized</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">0</div>
            <div className="stat-label">Third-Party Access</div>
          </div>
        </div>

        <div className="features-container">
          <div className="feature-box">
            <div className="feature-icon">🔒</div>
            <div className="feature-text">
              <h3>Secure Data Upload</h3>
              <p>
                Files are encrypted client-side with AES-256 before being stored on IPFS via Pinata. The content hash is recorded on the blockchain for tamper-proof verification.
              </p>
            </div>
          </div>
          <div className="feature-box">
            <div className="feature-icon">📤</div>
            <div className="feature-text">
              <h3>Granular Sharing</h3>
              <p>
                Share files with specific Ethereum addresses or DAOs. Set expiration dates and permission levels for each recipient.
              </p>
            </div>
          </div>
          <div className="feature-box">
            <div className="feature-icon">🔑</div>
            <div className="feature-text">
              <h3>Dynamic Access Control</h3>
              <p>
                Modify or revoke access anytime. Our smart contracts enforce permissions in real-time across the network.
              </p>
            </div>
          </div>
          <div className="feature-box">
            <div className="feature-icon">⛓️</div>
            <div className="feature-text">
              <h3>Blockchain Verification</h3>
              <p>
                Every access request and file modification is recorded on-chain, providing an immutable audit trail.
              </p>
            </div>
          </div>
        </div>

        <div className="tech-stack">
          <h3>Powered By</h3>
          <div className="tech-badges">
            <div className="tech-badge">Ethereum</div>
            <div className="tech-badge">IPFS</div>
            <div className="tech-badge">Pinata</div>
            <div className="tech-badge">Web3.js</div>
            <div className="tech-badge">AES-256</div>
          </div>
        </div>

        <div className="cta-section">
          <button className="cta-button">
            Connect Wallet to Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;