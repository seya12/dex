import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { ApplicationContext } from "../../ApplicationContext";
import TokenAbi from "../../artifacts/contracts/Token.sol/Token.json";
import contractAddresses from "../../resources/addresses.json";

export function useToken(address, executeContractCall) {
  const { etherProvider, signer, user } = useContext(ApplicationContext);
  const [tokenContract, setTokenContract] = useState(null);
  const [balance, setBalance] = useState("");

  useEffect(() => {
    if (!etherProvider || !address) {
      return;
    }
    setTokenContract(new ethers.Contract(address, TokenAbi.abi, etherProvider));
  }, [etherProvider, address]);

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

  //tokenAddress is required as "address" prop is not updated synchronous -> can not wait for that
  const approveTradesContract = async (tokenAddress, value) => {
    const signerContract = new ethers.Contract(
      tokenAddress,
      TokenAbi.abi,
      signer
    );

    const contractCall = () =>
      signerContract.approve(contractAddresses["Trades"], value);
    const result = await executeContractCall(contractCall);
    return result;
  };

  return { tokenContract, balance, approveTradesContract };
}
