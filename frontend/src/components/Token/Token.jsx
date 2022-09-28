import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { ApplicationContext } from "../../ApplicationContext";
import { useTokens } from "../customHooks/useTokens";
import { withTransactionResult } from "../withTransactionResult";
import CreateTokenModal from "./CreateTokenModal";
import TokenOverview from "./TokenOverview";

const BasicToken = ({ transaction, executeContractCall }) => {
  const { signer } = useContext(ApplicationContext);
  const [showModal, setShowModal] = useState(false);
  const { tokens, createToken } = useTokens(executeContractCall);

  useEffect(() => {
    if (transaction.waiting || transaction.error) {
      setShowModal(false);
    }
  }, [transaction]);

  const submitToken = async (event) => {
    event.preventDefault();
    await createToken(event.target);
  };

  return (
    <>
      <TokenOverview tokens={tokens} signer={signer} />
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
