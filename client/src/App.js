import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import Home from "./components/Home";
import UserManual from "./components/UserManual";
import AboutUs from "./components/AboutUs"; 
import "./App.css";
import Dashboard from './components/Dashboard';

function App() {
  const [account, setAccount] = useState("");
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);

  useEffect(() => {
    document.title = "Privex_3.0";
  }, []);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });
        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        console.log(address);
        setAccount(address);
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        const contract = new ethers.Contract(contractAddress, Upload.abi, signer);
        console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);

  // Navigation component
  const Navigation = () => {
    const location = useLocation();
    return (
      <nav className="home-nav">
        <div className="platform-name">PriveX_3.0</div>
        <div className="nav-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Home
          </Link>
          <Link to="/manual" className={location.pathname === '/manual' ? 'active' : ''}>
            User Manual
          </Link>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
            About Us
          </Link>
        </div>
      </nav>
    );
  };

  return (
    <BrowserRouter>
      <div className="App">
        <div className="background-animation">
          <div className="cube"></div>
          <div className="cube"></div>
          <div className="cube"></div>
          <div className="cube"></div>
          <div className="cube"></div>
        </div>
        
        <Navigation />
        
        <Routes>
          <Route path="/" element={<Home onTryNow={() => setDashboardOpen(true)} />} />
          <Route path="/manual" element={<UserManual />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {dashboardOpen && (
          <Dashboard 
            contract={contract} 
            account={account}
            onClose={() => setDashboardOpen(false)}
          />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
