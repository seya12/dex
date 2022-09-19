import Button from "react-bootstrap/Button";
import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { ApplicationContext } from "../../ApplicationContext";
import TokenOverview from "./TokenOverview";
import CreateTokenModal from "./CreateTokenModal";
import { useTokens } from "../customHooks/useTokens";
import { withTransactionResult } from "../withTransactionResult";

const BasicToken = ({ transaction, setTransaction }) => {
  const { etherProvider, signer } = useContext(ApplicationContext);
  const [showModal, setShowModal] = useState(false);
  const { tokens, createToken } = useTokens(
    etherProvider,
    signer,
    ethers,
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
    </>
  );
};

const Token = withTransactionResult(BasicToken);
export default Token;
