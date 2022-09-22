import { useState } from "react";
import { createContext } from "react";
import { ethers } from "ethers";
import { useEffect } from "react";

export const ApplicationContext = createContext();

export const ContextProvider = ({ children }) => {
  const [etherProvider, setEtherProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [user, setUser] = useState({
    publicKey: "",
    balance: 0,
  });

  useEffect(() => {
    const initializeProvider = () => {
      if (!window.ethereum) {
        return;
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setEtherProvider(provider);
    };

    initializeProvider();
  }, []);

  const connect = async () => {
    if (signer) {
      setSigner(null);
      return;
    }

    const accounts = await etherProvider.send("eth_requestAccounts", []);
    setSigner(etherProvider.getSigner());
    let balance = await etherProvider.getBalance(accounts[0]);
    balance = ethers.utils.formatEther(balance);
    setUser({
      publicKey: ethers.utils.getAddress(accounts[0]),
      balance: balance.toString(),
    });
  };

  return (
    <ApplicationContext.Provider
      value={{
        etherProvider,
        signer,
        user,
        connect,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
