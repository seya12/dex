import { useCallback, useEffect, useState } from "react";
import TradesAbi from "../../artifacts/contracts/Trades.sol/Trades.json";
import { executeContractCall } from "../../proxies/executeContractCall";
import contractAddresses from "../../resources/addresses.json";

export function useTrades(etherProvider, signer, ethers, setTransaction) {
  const [tradesContract, setTradesContract] = useState();
  const [trades, setTrades] = useState([
    {
      seller: {
        participant: "",
        tokenAddress: "",
        tokenSymbol: "",
        amount: 0,
      },
      buyer: {
        participant: "",
        tokenAddress: "",
        tokenSymbol: "",
        amount: 0,
      },
      open: true,
    },
  ]);

  useEffect(() => {
    if (!etherProvider) {
      return;
    }
    setTradesContract(
      new ethers.Contract(
        contractAddresses["Trades"],
        TradesAbi.abi,
        etherProvider
      )
    );
  }, [etherProvider, ethers]);

  const fetchTrades = useCallback(async () => {
    if (!etherProvider || !tradesContract) {
      return;
    }
    const trades = await tradesContract.getTrades();
    setTrades(trades);
  }, [etherProvider, tradesContract]);

  useEffect(() => {
    fetchTrades();
  }, [fetchTrades]);

  const createTrade = async (params) => {
    const signerContract = new ethers.Contract(
      contractAddresses["Trades"],
      TradesAbi.abi,
      signer
    );
    const contractCall = () =>
      signerContract.addTrade(
        params.offerToken.value,
        params.offerAmount.value,
        params.forToken.value,
        params.forAmount.value
      );

    await executeContractCall(contractCall, etherProvider, setTransaction);
    fetchTrades();
  };

  return { trades, createTrade };
}
