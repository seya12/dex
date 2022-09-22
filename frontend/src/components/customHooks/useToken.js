import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { ApplicationContext } from "../../ApplicationContext";
import TokenAbi from "../../artifacts/contracts/Token.sol/Token.json";

export function useToken(address) {
  const { signer, user } = useContext(ApplicationContext);
  const [tokenContract, setTokenContract] = useState(null);
  const [balance, setBalance] = useState("");

  useEffect(() => {
    if (!signer) {
      return;
    }
    setTokenContract(new ethers.Contract(address, TokenAbi.abi, signer));
  }, [address, signer]);

  useEffect(() => {
    async function fetchBalance() {
      let balance = 0;
      if (signer && tokenContract) {
        balance = await tokenContract.balanceOf(user.publicKey);
      }
      setBalance(balance.toString());
    }
    fetchBalance();
  }, [signer, tokenContract, user]);

  return { balance };
}
