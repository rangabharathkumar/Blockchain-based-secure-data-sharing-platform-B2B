import { useState, useEffect, useCallback } from "react";
import "./Modal.css";

const Modal = ({ setModalOpen, contract, userFiles, account }) => {
  const [accessList, setAccessList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shareAddress, setShareAddress] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isRevoking, setIsRevoking] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [isGroupShare, setIsGroupShare] = useState(false);
  const [addresses, setAddresses] = useState("");

  const updateAccessList = useCallback(async () => {
    if (!contract) return;

    try {
      setLoading(true);
      const addressList = await contract.shareAccess();
      console.log("Access List:", addressList);

      const uniqueAddresses = [...new Set(
        addressList
          .filter(item => item.access)
          .map(item => item.user)
      )];

      setAccessList(uniqueAddresses);
    } catch (error) {
      console.error("Error fetching access list:", error);
      setError("Failed to load access list");
    } finally {
      setLoading(false);
    }
  }, [contract]);

  useEffect(() => {
    updateAccessList();
  }, [updateAccessList]);

  const handleAction = async () => {
    if (isRevoking) {
      await revoking(selectedAddress);
      setIsRevoking(false);
      setSelectedAddress("");
    } else {
      await sharing();
    }
  };

  const sharing = async () => {
    if (!isGroupShare && !shareAddress) {
      setError("Please enter an address");
      return;
    }

    if (isGroupShare && !addresses.trim()) {
      setError("Please enter addresses for group sharing");
      return;
    }

    if (selectedFiles.length === 0) {
      setError("Please select at least one file to share");
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      const fileIds = selectedFiles.map(id => Number(id));
      
      if (isGroupShare) {
        const addressList = addresses.split(',').map(addr => addr.trim());
        for (const addr of addressList) {
          if (addr) {
            const tx = await contract.allow(addr, fileIds, {
              gasLimit: 500000
            });
            await tx.wait();
          }
        }
      } else {
        const tx = await contract.allow(shareAddress, fileIds, {
          gasLimit: 500000
        });
        await tx.wait();
      }
      
      await updateAccessList();
      setShareAddress("");
      setAddresses("");
      setSelectedFiles([]);
      setModalOpen(false);
    } catch (error) {
      console.error("Sharing error:", error);
      setError(error.message || "Failed to share");
    } finally {
      setLoading(false);
    }
  };

  const revoking = async (addressToRevoke) => {
    if (!addressToRevoke) return;

    try {
      setLoading(true);
      setError("");
      
      const tx = await contract.disallow(addressToRevoke);
      await tx.wait();
      
      await updateAccessList();
      setIsRevoking(false);
      setSelectedAddress("");
    } catch (error) {
      console.error("Error revoking access:", error);
      setError("Failed to revoke access");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">Share Files</div>
        
        {error && <div className="error-message">{error}</div>}

        <div className="body">
          <div className="share-type">
            <button 
              className={!isGroupShare ? 'active' : ''} 
              onClick={() => setIsGroupShare(false)}
            >
              Single Address
            </button>
            <button 
              className={isGroupShare ? 'active' : ''} 
              onClick={() => setIsGroupShare(true)}
            >
              Multiple Addresses
            </button>
          </div>

          {isGroupShare ? (
            <textarea
              placeholder="Enter multiple addresses (comma-separated)"
              value={addresses}
              onChange={(e) => setAddresses(e.target.value)}
              className="group-addresses"
            />
          ) : (
            <input
              type="text"
              placeholder="Enter Address"
              value={shareAddress}
              onChange={(e) => setShareAddress(e.target.value)}
            />
          )}

          <div className="file-selection">
            <h3>Select Files to Share</h3>
            <div className="file-list">
              {Array.isArray(userFiles) && userFiles.length > 0 ? (
                userFiles.map((file) => (
                  <div key={file.id} className="file-item">
                    <input
                      type="checkbox"
                      id={`file-${file.id}`}
                      checked={selectedFiles.includes(file.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFiles([...selectedFiles, file.id]);
                        } else {
                          setSelectedFiles(selectedFiles.filter(id => id !== file.id));
                        }
                      }}
                    />
                    <label htmlFor={`file-${file.id}`}>
                      {file.fileName || 'Unnamed File'}
                    </label>
                  </div>
                ))
              ) : (
                <p>No files available to share</p>
              )}
            </div>
          </div>

          {accessList.length > 0 && (
            <div className="shared-access">
              <h3>Shared With</h3>
              <div className="access-list">
                {accessList.map((address, index) => (
                  <div key={index} className="access-item">
                    <span>{address}</span>
                    <button onClick={() => revoking(address)} className="revoke-btn">
                      Revoke
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="footer">
          <button onClick={() => setModalOpen(false)} id="cancelBtn">
            Cancel
          </button>
          <button 
            onClick={sharing}
            disabled={loading || selectedFiles.length === 0 || !shareAddress}
          >
            {loading ? "Processing..." : "Share Files"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;