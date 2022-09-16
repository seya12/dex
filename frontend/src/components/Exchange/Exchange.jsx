/*
TODO: 
- call smart contract and make exchange
- write contract address in config file and fetch it from there
*/
import Button from "react-bootstrap/Button";

import { ethers } from "ethers";
import { useContext, useState, useEffect, useCallback } from "react";

import { ApplicationContext } from "../../ApplicationContext";
import Trades from "./Trades";
import TokensAbi from "../../artifacts/contracts/Tokens.sol/Tokens.json";
import TradesAbi from "../../artifacts/contracts/Trades.sol/Trades.json";
import TradeModal from "./TradeModal";

const Exchange = () => {
  const { etherProvider, signer } = useContext(ApplicationContext);
  const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const [availableTokens, setAvailableTokens] = useState();
  const [showModal, setShowModal] = useState(false);
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

  const fetchContract = useCallback(async () => {
    if (!etherProvider) {
      return;
    }
    const trades = new ethers.Contract(
      CONTRACT_ADDRESS,
      TradesAbi.abi,
      etherProvider
    );

    const contractTrades = await trades.getTrades();
    setTrades(contractTrades);
    console.log(contractTrades);
    console.log("trades set from solidity...");
  }, [etherProvider]);

  useEffect(() => {
    console.log("in use effect...");
    fetchContract();
  }, [fetchContract]);

  useEffect(() => {
    async function fetchTokens() {
      const tokens = new ethers.Contract(
        "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        TokensAbi.abi,
        etherProvider
      );
      const tokenNames = await tokens.getTokenNames();
      console.log(`Names: ${tokenNames}`);
      const t = await tokens.getTokenMappings();
      const addresses = t[0];
      const names = t[1];
      const map = new Map();
      for (let i = 0; i < addresses?.length; i++) {
        map.set(addresses[i], names[i]);
      }
      console.log(map);
      setAvailableTokens(map);
    }
    fetchTokens();
  }, [etherProvider]);

  const showClosedTrades = async () => {};

  const makeTrade = async (e) => {
    e.preventDefault();

    const trades = new ethers.Contract(CONTRACT_ADDRESS, TradesAbi.abi, signer);
    const form = e.target;
    const tx = await trades.addTrade(
      form.offerToken.value,
      form.offerAmount.value,
      form.forToken.value,
      form.forAmount.value
    );
    setShowModal(false);
    await tx.wait();

    fetchContract();
  };

  return (
    <>
      <h1>Exchange</h1>
      <h2>Available Trades:</h2>
      <Trades trades={trades} />
      <h2>Past Trades</h2>
      <section>{showClosedTrades}</section>
      <Button onClick={() => setShowModal(true)} disabled={!signer}>
        Offer Trade
      </Button>

      {showModal && (
        <TradeModal
          closeModal={() => setShowModal(false)}
          makeTrade={makeTrade}
          tokens={availableTokens}
        />
      )}
    </>
  );
};

export default Exchange;
