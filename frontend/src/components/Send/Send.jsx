/*
TODO: hint that you need to be connected with signer
better feedback that transaction is mined / to be mined
*/
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { utils } from "ethers";
import { useState, useContext } from "react";
import { ApplicationContext } from "../../ApplicationContext";
import TransactionResult from "./TransactionResult";

const Send = () => {
  const { etherProvider, signer, user } = useContext(ApplicationContext);
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

    const tx = {
      from: user.publicKey,
      to: receiver,
      value: utils.parseEther(amount),
    };

    let trans;

    try {
      trans = await signer.sendTransaction(tx);
    } catch (err) {
      setTxHash({ ...txHash, error: true });
      console.log(err.message);
      return;
    }

    setTxHash({
      hash: trans.hash,
      waiting: true,
      confirmed: false,
      error: false,
    });

    await etherProvider.waitForTransaction(trans.hash);
    await new Promise((resolve) => setTimeout(resolve, 10000));

    setTxHash({
      hash: trans.hash,
      waiting: false,
      confirmed: true,
      error: false,
    });
  };

  return (
    <>
      <h1>Send ETH</h1>
      <Form onSubmit={sendTransaction}>
        <Form.Group className="mb-3" controlId="receiver">
          <Form.Label>Receiver Public Key:</Form.Label>
          <Form.Control type="text" autoFocus />
        </Form.Group>
        <Form.Group className="mb-3" controlId="amount">
          <Form.Label>Amount to be sent:</Form.Label>
          <Form.Control type="amount" />
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
