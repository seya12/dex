/*
TODO: call smart contract and make exchange
*/

import { useState } from "react";

const Exchange = () => {
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
  return (
    <>
      <h1>Exchange</h1>
      <h2>Available Trades:</h2>
      <section>{showTrades}</section>
      <h2>Offer Trade:</h2>
    </>
  );
};

export default Exchange;
