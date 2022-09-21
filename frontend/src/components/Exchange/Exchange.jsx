/*
TODO: 
- call smart contract and make exchange
- write contract address in config file and fetch it from there
*/
import Button from "react-bootstrap/Button";

import { ethers } from "ethers";
import { useContext, useState, useEffect } from "react";

import { ApplicationContext } from "../../ApplicationContext";
import Trades from "./Trades";
import TradeModal from "./TradeModal";
import { withTransactionResult } from "../withTransactionResult";
import { useTokens } from "../customHooks/useTokens";
import { useTrades } from "../customHooks/useTrades";

const BasicExchange = ({ transaction, setTransaction }) => {
  const { etherProvider, signer } = useContext(ApplicationContext);
  const [showModal, setShowModal] = useState(false);
  const { tokens } = useTokens(etherProvider, signer, ethers, setTransaction);
  const { trades, createTrade, takeTrade } = useTrades(
    etherProvider,
    signer,
    ethers,
    setTransaction
  );

  const makeTrade = async (e) => {
    e.preventDefault();

    await createTrade(e.target);
  };

  useEffect(() => {
    if (transaction.waiting) {
      setShowModal(false);
    }
  }, [transaction]);

  return (
    <>
      <h1>Exchange</h1>
      <h2>Available Trades:</h2>
      <Trades trades={trades} takeTrade={takeTrade} />
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
