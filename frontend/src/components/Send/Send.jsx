import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { utils } from "ethers";
import { useState, useContext } from "react";
import { ApplicationContext } from "../../ApplicationContext";
import { withTransactionResult } from "../withTransactionResult";

const BasicSend = ({ executeContractCall }) => {
  const { signer, user } = useContext(ApplicationContext);
  const [isAmountNegative, setIsAmountNegative] = useState(false);

  const sendEther = async (event) => {
    event.preventDefault();
    const receiver = event.target.receiver.value;
    const amount = event.target.amount.value;

    if (amount <= 0) {
      setIsAmountNegative(true);
      return;
    }

    const tx = {
      from: user.publicKey,
      to: receiver,
      value: utils.parseEther(amount),
    };

    const contractCall = () => signer.sendTransaction(tx);
    await executeContractCall(contractCall);

    setIsAmountNegative(false);
    event.target.reset();
  };

  return (
    <>
      <h1>Send ETH</h1>
      <Form onSubmit={sendEther}>
        <Form.Group className="mb-3" controlId="receiver">
          <Form.Label>Receiver Public Key:</Form.Label>
          <Form.Control type="text" autoFocus required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="amount">
          <Form.Label>ETH to be sent:</Form.Label>
          <Form.Control type="number" required isInvalid={isAmountNegative} />
          <Form.Control.Feedback type="invalid">
            Number must greater than 0
          </Form.Control.Feedback>
        </Form.Group>
        {!signer && <p>Please connect via the "Connect" button!</p>}
        <Button type="submit" disabled={!signer}>
          Submit
        </Button>
      </Form>
    </>
  );
};

const Send = withTransactionResult(BasicSend);

export default Send;
