🛡️ Privex_3.0 – Decentralized Image Upload and Sharing
Privex_3.0 is a decentralized application (dApp) that enables secure image upload and sharing on the blockchain. Users can upload images to IPFS (InterPlanetary File System) and share access with single or multiple people through Solidity smart contracts.

🔥 This project includes local deployment using Hardhat for testing and development.

🌐 Live Demo
👉 Hosted Website: https://rangabharathkumar.github.io/Privex_3.0/

🌟 Features
✅ Decentralized Storage:

Images are uploaded to IPFS, ensuring immutable and censorship-resistant storage.

✅ Smart Contract Access Control:

Uses Solidity smart contracts to manage multi-user access permissions.

Users can grant or revoke access to single or multiple individuals simultaneously.

✅ Permission-based Sharing:

Share with one or multiple users at once.

Flexible access management through the smart contract.

✅ Ethereum Blockchain Integration:

Uses Hardhat local network for testing and local deployment.

✅ React Frontend:

Intuitive interface for uploading images, viewing stored content, and managing multi-user permissions.

⚙️ Technologies Used
🛠️ Solidity: Smart contract development for multi-user access control.

🌐 React: Frontend framework for UI and interaction.

📦 IPFS: Decentralized storage protocol for image hosting.

🔥 Hardhat: Ethereum development environment for local testing.

🔗 MetaMask: Ethereum wallet for interacting with the dApp.

🚀 Installation & Local Deployment
✅ Clone the Repository
   git clone https://github.com/rangabharathkumar/Privex_3.0.git
✅ Install Dependencies
1️⃣ Install Backend (Hardhat) Dependencies:
   # Navigate to the root directory
    cd Privex_3.0

    # Install Hardhat dependencies
    npm install
2️⃣ Compile the Smart Contract:

    # Compile the Smart Contract
    npx hardhat compile

    ✅ Local Deployment (Hardhat)
1️⃣ Start the Local Hardhat Network:

    # Run Hardhat local node
     npx hardhat node
📌 After Running:

  The local network will start with test accounts and their private keys.

   Take note of the contract owner’s private key for deployment.

2️⃣ Deploy the Smart Contract:
In another terminal window, run:

    npx hardhat run scripts/deploy.js --network localhost
📌 After Deployment:

   The terminal will display the contract address.

   Copy the contract address for the frontend configuration.

✅ Frontend (React) Setup
1️⃣ Install React Dependencies:

    # Navigate to the React client directory
    cd client

# Install React dependencies
    npm install
2️⃣ Configure Environment Variables:
     Create a .env file in the client/ directory.

Add the following:

    REACT_APP_PINATA_API_KEY=YOUR_PINATA_API_KEY
    REACT_APP_PINATA_SECRET_API_KEY=YOUR_PINATA_SECRET_KEY
    REACT_APP_CONTRACT_ADDRESS=YOUR_CONTRACT_ADDRESS
    REACT_APP_LOCAL_RPC_URL=http://127.0.0.1:8545
3️⃣ Start the React Application:
    npm start

    
🔥 Usage
✅ Install MetaMask
   Install and configure MetaMask in your browser.

   Import one of the Hardhat local network accounts into MetaMask using its private key.

   Connect to the Localhost 8545 network.

✅ Upload Image
   Click Upload to select an image from your device.

   The image is stored on IPFS and the CID (content ID) is saved on the blockchain.

✅ Share with Single or Multiple Users
   Use the Share button to grant access.

   Enter multiple Ethereum addresses separated by commas to share with multiple users at once.

   Click Grant Access to allow viewing permissions.

✅ Revoke Access
   Use the Revoke button to remove access.

   Enter one or multiple addresses to revoke their access rights.

✅ View Shared Images
   Click Get Data to view images shared by other users.

   You will only be able to access images if you have the appropriate permissions.

📌 Example Workflow
   Alice uploads an image and grants access to Bob and Charlie.

   Bob and Charlie can view the image.

   Alice revokes Charlie’s access, preventing him from viewing the image.

   Bob can still access the image, but Charlie cannot.

Google drive link for demo video: https://drive.google.com/drive/folders/1ZR0DDBX0Zop1DE0fk6kXiR7xcM6Rlhnv?usp=sharing

