/*
TODO: call smart contract and make exchange
*/
import { ethers } from "ethers";
import { useContext, useState } from "react";
import { ApplicationContext } from "../ApplicationContext";
import TradesAbi from "../artifacts/contracts/Trades.sol/Trades.json";

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
      "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
      TradesAbi.abi,
      etherProvider
    );
    console.log(trades);
    const t = await trades.getArr();
    console.log(t);
    const structs = await trades.getStruct();
    console.log(structs);
    console.log(structs[0]);
    const s = structs[0];
    console.log(s.text);
    console.log(s[1]);
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
