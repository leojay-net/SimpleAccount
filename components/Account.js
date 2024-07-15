import { useState, useEffect } from 'react';
import { ethers } from 'ethers';


const FACTORY_ABI = process.env.FACTORY_ABI;
const ACCOUNT_ABI = process.env.ACCOUNT_ABI;
const FACTORY_ADDRESS = process.env.FACTORY_ADDRESS; 
const ENTRY_POINT_ADDRESS = process.env.ENTRYPOINT_ADDRESS;

export default function SmartWallet() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState(null);
  const [scwAddress, setScwAddress] = useState(null);
  const [scwBalance, setScwBalance] = useState("0");
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [salt, setSalt] = useState();

  useEffect(() => {
    if (scwAddress) {
      updateBalance();
    }
  }, [scwAddress]);

  async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();

        setProvider(provider);
        setSigner(signer);
        setAddress(address);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  }

  async function generateSalt(userAddress) {
    // Combine user address with a constant string
    const saltBase = userAddress + "SimpleAccountSalt";
    // Hash the combined string to get a 32-byte value
    return ethers.utils.keccak256(ethers.utils.toUtf8Bytes(saltBase));
  }
  
  
  async function createOrAccessWallet() {
    if (!signer) return;

    const factory = new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI, signer);
    const salt = await generateSalt(address);

    try {
      const tx = await factory.createAccount(address, salt);
      await tx.wait();
      const scwAddress = await factory.getAddress(address, salt);
      setScwAddress(scwAddress);
    } catch (error) {
      console.error("Failed to create/access wallet:", error);
    }
  }

  async function updateBalance() {
    if (!provider || !scwAddress) return;

    try {
      const balance = await provider.getBalance(scwAddress);
      setScwBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.error("Failed to update balance:", error);
    }
  }

  async function sendFunds() {
    if (!signer || !scwAddress) return;

    const scw = new ethers.Contract(scwAddress, ACCOUNT_ABI, signer);

    try {
      const tx = await scw.execute(recipient, ethers.utils.parseEther(amount), "0x");
      await tx.wait();
      updateBalance();
    } catch (error) {
      console.error("Failed to send funds:", error);
    }
  }

  async function depositFunds() {
    if (!signer || !scwAddress) return;

    const scw = new ethers.Contract(scwAddress, ACCOUNT_ABI, signer);

    try {
      const tx = await scw.addDeposit({ value: ethers.utils.parseEther(amount) });
      await tx.wait();
      updateBalance();
    } catch (error) {
      console.error("Failed to deposit funds:", error);
    }
  }

  return (
    <div>
      {!address ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p>Connected Address: {address}</p>
          {!scwAddress ? (
            <button onClick={createOrAccessWallet}>Create/Access Smart Contract Wallet</button>
          ) : (
            <div>
              <p>Smart Contract Wallet Address: {scwAddress}</p>
              <p>Balance: {scwBalance} ETH</p>
              <input
                type="text"
                placeholder="Amount (ETH)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <input
                type="text"
                placeholder="Recipient Address"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
              <button onClick={sendFunds}>Send Funds</button>
              <button onClick={depositFunds}>Deposit Funds</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}