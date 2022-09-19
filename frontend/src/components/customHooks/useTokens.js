import { useEffect, useState } from "react";
import TokensAbi from "../../artifacts/contracts/Tokens.sol/Tokens.json";

export function useTokens(
  etherProvider,
  ethers,
  contractAddress,
  reloadTokens
) {
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
      new ethers.Contract(contractAddress, TokensAbi.abi, etherProvider)
    );
  }, [contractAddress, etherProvider, ethers]);

  useEffect(() => {
    async function fetchTokens() {
      if (!etherProvider || !tokensContract || !reloadTokens) {
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
    }
    fetchTokens();
  }, [etherProvider, reloadTokens, tokensContract]);

  return tokens;
}
