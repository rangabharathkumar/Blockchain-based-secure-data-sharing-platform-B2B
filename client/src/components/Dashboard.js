import React from 'react';
import Display from './Display';
import FileUpload from './FileUpload';
import Modal from './Modal';
import './Dashboard.css';

const Dashboard = ({ contract, account, onClose }) => {
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <div className="dashboard-overlay">
      <div className="dashboard-modal">
        <div className="dashboard-header">
          <h2>Secure File Sharing Dashboard</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        
        <div className="dashboard-body">
          <p className="account-info">Account: {account ? account : "Not connected"}</p>
          
          <div className="file-section">
            <FileUpload account={account} contract={contract} />
            <Display contract={contract} account={account} />
            
            
            
            {modalOpen && (
              <Modal setModalOpen={setModalOpen} contract={contract} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 