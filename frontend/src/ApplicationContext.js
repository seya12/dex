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

  return (
    <ApplicationContext.Provider
      value={{
        etherProvider,
        signer,
        setSigner,
        user,
        setUser,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
