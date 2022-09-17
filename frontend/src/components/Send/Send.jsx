/*
TODO: hint that you need to be connected with signer
better feedback that transaction is mined / to be mined
*/
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { utils } from "ethers";
import { useState, useContext } from "react";
import { ApplicationContext } from "../../ApplicationContext";
import TransactionResult from "../util/TransactionResult";
import { executeContractCall } from "../../proxies/executeContractCall";

const Send = () => {
  const { etherProvider, signer, user } = useContext(ApplicationContext);
  const [amountError, setAmountError] = useState(false);

  const [txHash, setTxHash] = useState({
    hash: "",
    waiting: false,
    confirmed: false,
    error: false,
  });

  const sendTransaction = async (event) => {
    event.preventDefault();
    const receiver = event.target.receiver.value;
    const amount = event.target.amount.value;

    if (amount <= 0) {
      setAmountError(true);
      return;
    }

    const tx = {
      from: user.publicKey,
      to: receiver,
      value: utils.parseEther(amount),
    };

    const contractCall = () => signer.sendTransaction(tx);
    await executeContractCall(contractCall, etherProvider, setTxHash);

    setAmountError(false);
    event.target.reset();
  };

  return (
    <>
      <h1>Send ETH</h1>
      <Form onSubmit={sendTransaction}>
        <Form.Group className="mb-3" controlId="receiver">
          <Form.Label>Receiver Public Key:</Form.Label>
          <Form.Control type="text" autoFocus required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="amount">
          <Form.Label>ETH to be sent:</Form.Label>
          <Form.Control type="number" required isInvalid={amountError} />
          <Form.Control.Feedback type="invalid">
            Number must greater than 0
          </Form.Control.Feedback>
        </Form.Group>
        {!signer && <p>Please connect on the overview page!</p>}
        <Button type="submit" disabled={!signer}>
          Submit
        </Button>
      </Form>
      <TransactionResult
        txHash={txHash}
        key={txHash.hash + txHash.waiting + txHash.confirmed + txHash.error}
      />
    </>
  );
};

export default Send;
