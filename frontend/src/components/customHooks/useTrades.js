import { ethers } from "ethers";
import { useCallback, useContext, useEffect, useState } from "react";
import { ApplicationContext } from "../../ApplicationContext";
import TradesAbi from "../../artifacts/contracts/Trades.sol/Trades.json";
import contractAddresses from "../../resources/addresses.json";
import { useToken } from "./useToken";

export function useTrades(executeContractCall) {
  const { etherProvider, signer } = useContext(ApplicationContext);

  const { approveTradesContract } = useToken("", executeContractCall);
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
      id: 0,
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
  }, [etherProvider]);

  const fetchTrades = useCallback(async () => {
    if (!etherProvider || !tradesContract) {
      return;
    }
    setTrades(await tradesContract.getTrades());
  }, [etherProvider, tradesContract]);

  useEffect(() => {
    fetchTrades();
  }, [fetchTrades]);

  const createTrade = async (params) => {
    await approveTradesContract(
      params.offerToken.value,
      params.offerAmount.value
    );

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

    await executeContractCall(contractCall);
    fetchTrades();
  };

  const takeTrade = async (trade) => {
    await approveTradesContract(trade.buyer.tokenAddress, trade.buyer.amount);
    const signerContract = new ethers.Contract(
      contractAddresses["Trades"],
      TradesAbi.abi,
      signer
    );
    const contractCall = () => signerContract.swap(trade.id);

    await executeContractCall(contractCall);
    fetchTrades();
  };

  return { trades, createTrade, takeTrade };
}
