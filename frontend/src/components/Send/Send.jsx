import { utils } from "ethers";
import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ApplicationContext } from "../../ApplicationContext";
import { withTransactionResult } from "../withTransactionResult";

const BasicSend = ({ executeContractCall }) => {
  const { signer, user, updateBalance } = useContext(ApplicationContext);
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
    updateBalance();
  };

  return (
    <>
      <h1 className="text-center">Send ETH</h1>
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
        {!signer && <p>Please connect first to be able to send ETH.</p>}
        <Button type="submit" disabled={!signer}>
          Submit
        </Button>
      </Form>
    </>
  );
};
const Send = withTransactionResult(BasicSend);

export default Send;
