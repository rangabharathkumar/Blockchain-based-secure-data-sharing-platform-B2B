import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import CryptoJS from "crypto-js";
import "./FileUpload.css";

const SECRET_KEY = "my_super_secret_key"; // Change this to a secure key

const FileUpload = ({ contract, account }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No file selected");
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFile(file);
      setFileName(file.name);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const encryptFile = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const encrypted = CryptoJS.AES.encrypt(reader.result, SECRET_KEY).toString();
        resolve(encrypted);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("No file selected");

    setUploading(true);
    try {
      const encryptedFile = await encryptFile(file);
      const blob = new Blob([encryptedFile], { type: "text/plain" });
      const formData = new FormData();
      formData.append("file", blob, file.name);

      const resFile = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        headers: {
          pinata_api_key: `pinata api key`,
          pinata_secret_api_key: `Your key`,
          "Content-Type": "multipart/form-data",
        },
      });

      const fileHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
      await contract.add(account, file.name, fileHash);

      alert("File successfully encrypted and uploaded to IPFS");

      setFileName("No file selected");
      setFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Unable to upload file to Pinata.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <div {...getRootProps()} className={`dropzone ${isDragActive ? "active" : ""}`}>
          <input {...getInputProps()} />
          {isDragActive ? <p>Drop the files here...</p> : <p>Drag & drop files or click to select</p>}
        </div>
        <h2 className="textArea">File: {fileName}</h2>
        <button type="submit" className="upload" disabled={!file || uploading}>
          {uploading ? "Uploading..." : "Upload File"}
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
