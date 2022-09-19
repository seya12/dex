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
import TradesAbi from "../../artifacts/contracts/Trades.sol/Trades.json";
import TradeModal from "./TradeModal";
import contractAddresses from "../../resources/addresses.json";
import { withTransactionResult } from "../withTransactionResult";
import { useTokens } from "../customHooks/useTokens";

const BasicExchange = ({ setTransaction }) => {
  const { etherProvider, signer } = useContext(ApplicationContext);
  const { tokens } = useTokens(
    etherProvider,
    signer,
    ethers,
    contractAddresses["Tokens"],
    setTransaction
  );
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
      contractAddresses["Trades"],
      TradesAbi.abi,
      etherProvider
    );

    const contractTrades = await trades.getTrades();
    setTrades(contractTrades);
  }, [etherProvider]);

  useEffect(() => {
    fetchContract();
  }, [fetchContract]);

  const makeTrade = async (e) => {
    e.preventDefault();

    const trades = new ethers.Contract(
      contractAddresses["Trades"],
      TradesAbi.abi,
      signer
    );
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
      <Button onClick={() => setShowModal(true)} disabled={!signer}>
        Offer Trade
      </Button>

      {showModal && (
        <TradeModal
          closeModal={() => setShowModal(false)}
          makeTrade={makeTrade}
          tokens={tokens}
        />
      )}
    </>
  );
};

const Exchange = withTransactionResult(BasicExchange);
export default Exchange;
