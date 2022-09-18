import { useState } from "react";
import { createContext } from "react";
import { ethers } from "ethers";
import { useEffect } from "react";
import contractAddresses from "./resources/addresses.json";

export const ApplicationContext = createContext();

export const ContextProvider = ({ children }) => {
  const [etherProvider, setEtherProvider] = useState();
  const [signer, setSigner] = useState();
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
        contractAddresses,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
