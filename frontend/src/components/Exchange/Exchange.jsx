import Button from "react-bootstrap/Button";

import { ethers } from "ethers";
import { useContext, useState, useEffect } from "react";

import { ApplicationContext } from "../../ApplicationContext";
import Trades from "./Trades";
import TradeModal from "./TradeModal";
import { withTransactionResult } from "../withTransactionResult";
import { useTokens } from "../customHooks/useTokens";
import { useTrades } from "../customHooks/useTrades";
import TokenAbi from "../../artifacts/contracts/Token.sol/Token.json";
import contractAddresses from "../../resources/addresses.json";

const BasicExchange = ({ transaction, setTransaction }) => {
  const { etherProvider, signer, user } = useContext(ApplicationContext);
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
    const token = new ethers.Contract(
      e.target.offerToken.value,
      TokenAbi.abi,
      signer
    );
    await token.approve(
      contractAddresses["Trades"],
      e.target.offerAmount.value
    );

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
      <Trades trades={trades} takeTrade={takeTrade} user={user} />
      <Button onClick={() => setShowModal(true)} disabled={!signer}>
        Offer Trade
      </Button>

      {showModal && (
        <TradeModal
          closeModal={() => setShowModal(false)}
          makeTrade={makeTrade}
          tokens={tokens}
          user={user}
        />
      )}
    </>
  );
};

const Exchange = withTransactionResult(BasicExchange);
export default Exchange;
