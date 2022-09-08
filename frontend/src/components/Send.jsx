/*
TODO: Form with input and submit button
make sure signer is available, make transaction, listen for event
*/
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { utils } from "ethers";
import { useState, useContext } from "react";
import { ApplicationContext } from "../ApplicationContext";

const Send = () => {
  const { etherProvider, signer, user } = useContext(ApplicationContext);
  const [txHash, setTxHash] = useState({
    hash: "",
    waiting: false,
    confirmed: false,
  });

  const sendTransaction = async (event) => {
    event.preventDefault();
    const receiver = event.target.receiver.value;
    const amount = event.target.amount.value;

    //TODO: Wait for mined transaction, display hash...
    const tx = {
      from: user.publicKey,
      to: receiver,
      value: utils.parseEther(amount),
    };

    let trans;
    try {
      trans = await signer.sendTransaction(tx);
    } catch (err) {
      console.log(err.message);
      return;
    }
    console.log("Sent Transaction... " + trans);
    setTxHash({
      hash: trans.hash,
      waiting: true,
      confirmed: false,
    });

    await etherProvider.waitForTransaction(trans.hash);
    await new Promise((resolve) => setTimeout(resolve, 10000));

    console.log("Transaction finished!");
    setTxHash({
      hash: trans.hash,
      waiting: false,
      confirmed: true,
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
          <Form.Control type="amount" autoFocus />
        </Form.Group>
        {!signer && <p>Please connect on the overview page!</p>}
        <Button type="submit" disabled={!signer}>
          Submit
        </Button>
      </Form>
      {txHash.waiting && (
        <p>Waiting for transaction to be mined{txHash.hash}</p>
      )}
      {txHash.confirmed && <p>Transaction mined! Hash: {txHash.hash}</p>}
    </>
  );
};

export default Send;
