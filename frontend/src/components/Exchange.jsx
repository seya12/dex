/*
TODO: 
- call smart contract and make exchange
- write contract address in config file and fetch it from there
- 
*/
import Table from "react-bootstrap/Table";
import { ethers } from "ethers";
import { useContext, useState, useEffect } from "react";
import { ApplicationContext } from "../ApplicationContext";
import TradesAbi from "../artifacts/contracts/Trades.sol/Trades.json";

const Exchange = () => {
  const { etherProvider, signer } = useContext(ApplicationContext);
  const CONTRACT_ADDRESS = "0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82";

  const [trades, setTrades] = useState([
    {
      seller: {
        participant: "",
        token: "",
        amount: 0,
      },
      buyer: {
        participant: "",
        token: "",
        amount: 0,
      },
      open: true,
    },
  ]);

  useEffect(() => {
    async function fetchContract() {
      if (!etherProvider) {
        return;
      }
      const trades = new ethers.Contract(
        CONTRACT_ADDRESS,
        TradesAbi.abi,
        etherProvider
      );

      const t = await trades.getTrades();
      setTrades(t);
      console.log("set trades");
      console.log(t);
    }
    console.log("test");
    fetchContract();
  }, [etherProvider]);

  const showTradess = () => {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Offer Token</th>
            <th>Offer Amount</th>
            <th>For Token</th>
            <th>For Amount</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => {
            console.log(trade.seller.amount);
            return (
              <tr>
                <td>{trade.seller.token}</td>
                <td>{trade.seller.amount.toString()}</td>
                <td>{trade.buyer.token}</td>
                <td>{trade.buyer.amount.toString()}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  };

  const click = async () => {
    if (!signer) {
      console.log("signer not set... return");
      return;
    }
    const trades = new ethers.Contract(CONTRACT_ADDRESS, TradesAbi.abi, signer);

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
      seller: partners[0],
      buyer: partners[1],
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

  const showClosedTrades = async () => {};

  return (
    <>
      <h1>Exchange</h1>
      <h2>Available Trades:</h2>
      <section>{showTradess()}</section>
      <h2>Past Trades</h2>
      <section>{showClosedTrades}</section>
      <h2>Offer Trade:</h2>
      <button onClick={click}>Click</button>
    </>
  );
};

export default Exchange;
