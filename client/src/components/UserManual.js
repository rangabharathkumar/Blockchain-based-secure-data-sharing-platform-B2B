import React, { useState } from "react";
import "./UserManual.css";

const UserManual = () => {
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    {
      id: 1,
      title: "1. Connect with MetaMask",
      points: [
        "Install the MetaMask extension or mobile app.",
        "Create a new wallet with a strong password.",
        "Securely back up your seed phrase (never share it with anyone).",
        "Connect MetaMask to the PriveX 3.0 platform."
      ]
    },
    {
      id: 2,
      title: "2. Uploading Data",
      points: [
        "Click on \"Upload Data\" in the navigation menu.",
        "Select the file you want to upload.",
        "The platform encrypts the file locally using AES-256.",
        "The encrypted file is stored on IPFS (InterPlanetary File System).",
        "You will receive a unique IPFS hash for the uploaded file.",
        "The hash is recorded on the blockchain for verification."
      ]
    },
    {
      id: 3,
      title: "3. Sharing Data",
      points: [
        "Go to \"My Files\" section.",
        "Select the file you want to share.",
        "Choose the recipient's Ethereum address.",
        "Set the access permissions (view, download, or edit).",
        "Click \"Share\". The smart contract records the access control on-chain."
      ]
    },
    {
      id: 4,
      title: "4. Accessing Data",
      points: [
        "Navigate to \"Shared Files\" in your dashboard.",
        "Select the file you want to access.",
        "Verify the file authenticity through the blockchain hash.",
        "Download or view the file securely."
      ]
    },
    {
      id: 5,
      title: "5. Managing Permissions",
      points: [
        "Go to the \"Access Control\" panel.",
        "View the list of users with access to your files.",
        "Modify or revoke permissions in real-time.",
        "The smart contract enforces the updated permissions immediately."
      ]
    },
    {
      id: 6,
      title: "6. Security and Privacy",
      points: [
        "All data is encrypted with AES-256 before upload.",
        "Files are stored on IPFS, ensuring decentralization.",
        "Access control is enforced using smart contracts.",
        "Every access request and modification is recorded on the blockchain."
      ]
    }
  ];

  const toggleSection = (id) => {
    setActiveSection(activeSection === id ? null : id);
  };

  return (
    <section className="user-manual">
      <div className="user-manual-content">
        <h1 className="title">PriveX 3.0 – User Manual</h1>
        <p className="subtitle">
          A step-by-step guide to securely upload, share, and access your data on the decentralized platform.
        </p>
      </div>

      {sections.map((section) => (
        <div 
          key={section.id} 
          className={`manual-section ${activeSection === section.id ? 'active' : ''}`}
          onClick={() => toggleSection(section.id)}
        >
          <h2 className="section-title">{section.title}</h2>
          {activeSection === section.id && (
            <ul className="manual-list">
              {section.points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  );
};

export default UserManual;
