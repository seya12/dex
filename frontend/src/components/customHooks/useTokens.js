import { ethers } from "ethers";
import { useCallback, useContext, useEffect, useState } from "react";
import { ApplicationContext } from "../../ApplicationContext";
import TokensAbi from "../../artifacts/contracts/Tokens.sol/Tokens.json";
import contractAddresses from "../../resources/addresses.json";

export function useTokens(executeContractCall) {
  const { etherProvider, signer } = useContext(ApplicationContext);

  const [tokensContract, setTokensContract] = useState();
  const [tokens, setTokens] = useState([
    {
      address: "",
      decimals: 0,
      name: "",
      owner: "",
      symbol: "",
      totalSupply: 0,
    },
  ]);

  useEffect(() => {
    if (!etherProvider) {
      return;
    }
    setTokensContract(
      new ethers.Contract(
        contractAddresses["Tokens"],
        TokensAbi.abi,
        etherProvider
      )
    );
  }, [etherProvider]);

  //function is used in effect and after token creation - therefore callback and not inside useEffect
  const fetchTokens = useCallback(async () => {
    if (!etherProvider || !tokensContract) {
      return;
    }
    const tokens = await tokensContract.getTokens();

    const obj = tokens.addresses.map((addr, i) => {
      return {
        address: tokens.addresses[i],
        decimals: tokens.decimals[i].toString(),
        name: tokens.names[i],
        owner: tokens.owners[i],
        symbol: tokens.symbols[i],
        totalSupply: tokens.totalSupplies[i].toString(),
      };
    });
    setTokens(obj);
  }, [etherProvider, tokensContract]);

  useEffect(() => {
    fetchTokens();
  }, [fetchTokens]);

  const createToken = async (params) => {
    const signerContract = new ethers.Contract(
      contractAddresses["Tokens"],
      TokensAbi.abi,
      signer
    );
    const contractCall = () =>
      signerContract.createToken(
        params.name.value,
        params.symbol.value,
        params.totalSupply.value,
        params.decimals.value
      );

    await executeContractCall(contractCall);
    fetchTokens();
  };

  return { tokens, createToken };
}
