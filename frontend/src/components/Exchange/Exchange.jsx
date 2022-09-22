import Button from "react-bootstrap/Button";

import { useContext, useEffect, useState } from "react";

import { ApplicationContext } from "../../ApplicationContext";
import { useToken } from "../customHooks/useToken";
import { useTokens } from "../customHooks/useTokens";
import { useTrades } from "../customHooks/useTrades";
import { withTransactionResult } from "../withTransactionResult";
import TradeModal from "./TradeModal";
import Trades from "./Trades";

const BasicExchange = ({ transaction, setTransaction }) => {
  const { signer, user } = useContext(ApplicationContext);
  const [showModal, setShowModal] = useState(false);
  const { approveTradesContract } = useToken("");
  const { tokens } = useTokens(setTransaction);
  const { trades, createTrade, takeTrade } = useTrades(setTransaction);

  const makeTrade = async (e) => {
    e.preventDefault();
    await approveTradesContract(
      e.target.offerToken.value,
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
          makeTrade={(e) => {
            makeTrade(e);
          }}
          tokens={tokens}
          user={user}
        />
      )}
    </>
  );
};

const Exchange = withTransactionResult(BasicExchange);
export default Exchange;
