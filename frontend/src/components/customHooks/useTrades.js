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
    /*
    User A: Token T1
    User B: Token T2

    User A will amount1 T2 für amount2 T1
    Trade wird erstellt. User A gibt Trades contract als allowance mit 10 T1
    User B nimmt Trade an:
     - T1: transferFrom(User A, User B, amount1)
     - T2: transfer(User A, amount)

    */

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

  const takeTrade = async (index) => {
    console.log(index.toString());
    const signerContract = new ethers.Contract(
      contractAddresses["Trades"],
      TradesAbi.abi,
      signer
    );
    const contractCall = () => signerContract.swap(index);

    await executeContractCall(contractCall, etherProvider, setTransaction);
  };

  return { trades, createTrade, takeTrade };
}
