import { useState } from "react";
import { createContext } from "react";
import { ethers } from "ethers";
import { useEffect } from "react";

export const ApplicationContext = createContext();

export const ContextProvider = ({ children }) => {
  const [etherProvider, setEtherProvider] = useState();
  const [signer, setSigner] = useState();

  const initializeProvider = () => {
    if (!window.ethereum) {
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setEtherProvider(provider);
  };

  useEffect(() => {
    initializeProvider();
  }, []);

  return (
    <ApplicationContext.Provider
      value={{ etherProvider, initializeProvider, signer, setSigner }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
