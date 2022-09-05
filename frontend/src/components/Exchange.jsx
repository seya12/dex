/*
TODO: 
- call smart contract and make exchange
- write contract address in config file and fetch it from there
- 
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
      "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
      TradesAbi.abi,
      signer
    );

    const t = await trades.getTrades();
    console.log(t);
    const partners = [
      {
        participant: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        token: "TEST",
        amount: 1,
      },
      {
        participant: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
        token: "COUNTER",
        amount: 10,
      },
    ];
    const trade = {
      partnerOne: partners[0],
      partnerTwo: partners[1],
      open: true,
    };
    const trans = await trades.addTrade(trade);
    console.log(trans);
    const confirmedTx = await trans.wait();
    console.log(confirmedTx);
    const abc = await trades.getTrades();
    console.log(abc);
    // console.log(trades);
    // const t = await trades.getArr();
    // console.log(t);
    // const structs = await trades.getStruct();
    // console.log(structs);
    // console.log(structs[0]);
    // const s = structs[0];
    // console.log(s.text);
    // console.log(s[1]);
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
