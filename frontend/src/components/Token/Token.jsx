import Button from "react-bootstrap/Button";
import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { ApplicationContext } from "../../ApplicationContext";
import TransactionResult from "../util/TransactionResult";
import TokenOverview from "./TokenOverview";
import CreateTokenModal from "./CreateTokenModal";
import { useTokens } from "../customHooks/useTokens";

const Token = () => {
  const { etherProvider, signer, contractAddresses } =
    useContext(ApplicationContext);
  const [transaction, setTransaction] = useState({
    hash: "",
    waiting: false,
    confirmed: false,
    error: false,
  });
  const [showModal, setShowModal] = useState(false);
  const { tokens, createToken } = useTokens(
    etherProvider,
    signer,
    ethers,
    contractAddresses["Tokens"],
    setTransaction
  );

  useEffect(() => {
    if (transaction.waiting) {
      setShowModal(false);
    }
  }, [transaction]);

  const submitToken = async (event) => {
    event.preventDefault();
    await createToken(event.target);
  };

  return (
    <>
      <TokenOverview tokens={tokens} />
      {!signer && <p>Please connect on the overview page!</p>}
      <Button disabled={!signer} onClick={() => setShowModal(true)}>
        Create new Token
      </Button>

      {showModal && (
        <CreateTokenModal
          closeModal={() => setShowModal(false)}
          createToken={submitToken}
        />
      )}
      <TransactionResult
        txHash={transaction}
        key={
          transaction.hash +
          transaction.waiting +
          transaction.confirmed +
          transaction.error
        }
      />
    </>
  );
};

export default Token;
