/*
TODO: call smart contract and make exchange
*/
import { ethers } from "ethers";
import { useContext, useState } from "react";
import { ApplicationContext } from "../ApplicationContext";
import TradesAbi from "../artifacts/contracts/Trades.sol/Trades.json";
import TradeAbi from "../artifacts/contracts/Trade.sol/Trade.json";

const Exchange = () => {
  const { etherProvider, signer } = useContext(ApplicationContext);

  const [trades, setTrades] = useState([
    {
      tokenName: "DefaultName",
      symbol: "DFT",
      offer: "",
      for: "",
    },
    {
      tokenName: "DefaultName",
      symbol: "DFT",
      offer: "",
      for: "",
    },
  ]);

  const showTrades = trades.map((trade) => {
    return <p>{trade.tokenName}</p>;
  });

  const click = async () => {
    const trades = new ethers.Contract(
      "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
      TradesAbi.abi,
      etherProvider
    );
    console.log(trades);
    const test = await trades.test();
    console.log(test);
    const t = await trades.getTrades();
    console.log(t);
  };

  return (
    <>
      <button onClick={click}>Click</button>

      <h1>Exchange</h1>
      <h2>Available Trades:</h2>
      <section>{showTrades}</section>
      <h2>Offer Trade:</h2>
    </>
  );
};

export default Exchange;
