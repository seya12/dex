import { ethers } from "ethers";
import { useCallback, useContext, useEffect, useState } from "react";
import { ApplicationContext } from "../../ApplicationContext";
import TokenAbi from "../../artifacts/contracts/Token.sol/Token.json";
import contractAddresses from "../../resources/addresses.json";

export function useToken(address) {
  const { etherProvider, signer, user } = useContext(ApplicationContext);
  const [tokenContract, setTokenContract] = useState(null);
  const [balance, setBalance] = useState("");

  const getContract = useCallback(
    (provider) => {
      if (!provider || !address) {
        return;
      }

      return new ethers.Contract(address, TokenAbi.abi, provider);
    },
    [address]
  );

  useEffect(() => {
    setTokenContract(getContract(etherProvider));
  }, [getContract, etherProvider]);

  useEffect(() => {
    async function fetchBalance() {
      let balance = 0;
      if (tokenContract) {
        balance = await tokenContract.balanceOf(user.publicKey);
      }
      setBalance(balance.toString());
    }
    fetchBalance();
  }, [tokenContract, user]);

  /*
  tokenAddress is required as "address" prop is not updated synchronous -> can not wait for that
  */

  const approveTradesContract = async (tokenAddress, value) => {
    const signerContract = new ethers.Contract(
      tokenAddress,
      TokenAbi.abi,
      signer
    );

    await signerContract.approve(contractAddresses["Trades"], value);
  };

  return { tokenContract, balance, approveTradesContract };
}
