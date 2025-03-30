import { useState, useEffect } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import "./Display.css";
import Modal from "./Modal";

const SECRET_KEY = "my_super_secret_key"; // Must match the encryption key

const Display = ({ contract, account }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [searchAddress, setSearchAddress] = useState("");
  const [viewError, setViewError] = useState("");

  const getData = async (address = "") => {
    try {
      setLoading(true);
      setError("");
      
      const targetAddress = address || account;
      console.log("Fetching files for address:", targetAddress);

      const files = address ? 
        await contract.display(targetAddress) : 
        await contract.getAllFiles(targetAddress);

      console.log("Retrieved files:", files);
      
      const formattedFiles = files.map(file => ({
        id: file.id.toString(),
        fileName: file.fileName,
        url: file.url
      }));
      
      setData(formattedFiles);
    } catch (error) {
      console.error("Error fetching files:", error);
      setError(error.message || "Failed to fetch files");
    } finally {
      setLoading(false);
    }
  };

  const openFile = async (file) => {
    try {
      setViewError("");
      const response = await axios.get(file.url);
      const encryptedContent = response.data;
      
      // Decrypt the URL
      const bytes = CryptoJS.AES.decrypt(encryptedContent, SECRET_KEY);
      const decryptedUrl = bytes.toString(CryptoJS.enc.Utf8);
      
      // Open in new tab
      window.open(decryptedUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error("Error opening file:", error);
      setViewError("Failed to open file. Please try again.");
      setTimeout(() => setViewError(""), 3000); // Clear error after 3 seconds
    }
  };

  useEffect(() => {
    if (contract && account) {
      getData();
    }
  }, [contract, account]);

  const handleShare = () => {
    setModalOpen(true);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchAddress) {
      getData();
      return;
    }
    await getData(searchAddress);
  };

  return (
    <>
      <div className="display-container">
        <div className="search-section">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Enter Address to View Files (leave empty for your files)"
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              Get Data
            </button>
          </form>
        </div>

        <div className="action-buttons-container">
          <button className="center button" onClick={handleShare}>
            Share or Revoke access 
          </button>
        </div>

        {loading && <div className="loading">Loading files...</div>}
        {error && <div className="error-message">{error}</div>}
        {viewError && <div className="error-message">{viewError}</div>}

        <div className="file-list">
          {data.length > 0 ? (
            data.map((file, index) => (
              <div 
                className="file-item" 
                key={index} 
                onClick={() => openFile(file)}
                title="Click to open file"
              >
                <div className="file-icon">📄</div>
                <div className="file-name">{file.fileName || "File"}</div>
              </div>
            ))
          ) : (
            <div className="no-files">
              {loading ? "Loading..." : "No files found"}
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <Modal
          setModalOpen={setModalOpen}
          contract={contract}
          userFiles={data}
          account={account}
        />
      )}
    </>
  );
};

export default Display;
