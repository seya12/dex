import { ethers } from "ethers";
import { createContext, useEffect, useState } from "react";

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
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      provider.on("network", (newNetwork, oldNetwork) => {
        if (oldNetwork) {
          window.location.reload();
        }
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
      setEtherProvider(provider);
    };

    initializeProvider();
  }, []);

  const connect = async () => {
    if (signer) {
      setSigner(null);
      setUser({ publicKey: "", balance: 0 });
      return;
    }

    const accounts = await etherProvider.send("eth_requestAccounts", []);
    setSigner(etherProvider.getSigner());
    let balance = getBalance(accounts[0]);
    setUser({
      publicKey: ethers.utils.getAddress(accounts[0]),
      balance: await balance,
    });
  };

  const getBalance = async (address) => {
    let balance = await etherProvider.getBalance(address);
    balance = ethers.utils.formatEther(balance);
    return balance.toString();
  };

  const updateBalance = async () => {
    let balance = await etherProvider.getBalance(user.publicKey);
    balance = ethers.utils.formatEther(balance);

    setUser({ ...user, balance: balance.toString() });
  };

  return (
    <ApplicationContext.Provider
      value={{
        etherProvider,
        signer,
        user,
        connect,
        updateBalance,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
