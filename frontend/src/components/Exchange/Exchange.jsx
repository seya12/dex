import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

import { useContext, useEffect, useState } from "react";

import { ApplicationContext } from "../../ApplicationContext";
import { useTokens } from "../customHooks/useTokens";
import { useTrades } from "../customHooks/useTrades";
import { withTransactionResult } from "../withTransactionResult";
import TradeModal from "./TradeModal";
import Trades from "./Trades";

const BasicExchange = ({ transaction, executeContractCall }) => {
  const { signer, user } = useContext(ApplicationContext);
  const [showModal, setShowModal] = useState(false);
  const { tokens } = useTokens(executeContractCall);
  const { trades, createTrade, takeTrade, swapSuccess, setSwapSuccess } =
    useTrades(executeContractCall);

  //close modal after user confirmed the metamask window
  useEffect(() => {
    if (transaction.waiting || transaction.error) {
      setShowModal(false);
    }
  }, [transaction]);

  return (
    <>
      {swapSuccess && (
        <ToastContainer position="top-end">
          <Toast onClose={() => setSwapSuccess(false)}>
            <Toast.Header>
              <strong className="me-auto">Successfull Swap!</strong>
            </Toast.Header>
            <Toast.Body>Your Swap has been confirmed.</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
      <h1 className="text-center">Exchange</h1>
      <h2>Available Trades:</h2>
      <Trades
        trades={trades}
        takeTrade={takeTrade}
        user={user}
        signer={signer}
      />
      <Button onClick={() => setShowModal(true)} disabled={!signer}>
        Offer Trade
      </Button>

      {showModal && (
        <TradeModal
          closeModal={() => setShowModal(false)}
          createTrade={createTrade}
          tokens={tokens}
          user={user}
        />
      )}
    </>
  );
};

const Exchange = withTransactionResult(BasicExchange);
export default Exchange;
