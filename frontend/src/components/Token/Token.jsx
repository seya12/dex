/*
Feedback that token has been created
Maybe a list with previously created tokens
*/

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ethers } from "ethers";
import { useContext, useState } from "react";
import { ApplicationContext } from "../../ApplicationContext";
import TokensAbi from "../../artifacts/contracts/Tokens.sol/Tokens.json";
import TransactionHandler from "../TransactionHandler";
import TransactionResult from "../Send/TransactionResult";

const Token = () => {
  const { etherProvider, signer } = useContext(ApplicationContext);
  const [txHash, setTxHash] = useState({
    hash: "",
    waiting: false,
    confirmed: false,
    error: false,
  });

  const createToken = async (event) => {
    event.preventDefault();
    const params = event.target;
    const tokens = new ethers.Contract(
      "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
      TokensAbi.abi,
      signer
    );
    let transHandler = new TransactionHandler(etherProvider, setTxHash);
    await transHandler.execute(() =>
      tokens.createToken(
        params.name.value,
        params.symbol.value,
        params.totalSupply.value,
        params.decimals.value
      )
    );
    event.target.reset();
  };

  return (
    <>
      <h1>Create a new Token</h1>
      <Form onSubmit={createToken}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Token Name:</Form.Label>
          <Form.Control type="text" autoFocus />
        </Form.Group>
        <Form.Group className="mb-3" controlId="symbol">
          <Form.Label>Token Symbol:</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="totalSupply">
          <Form.Label>Total Supply:</Form.Label>
          <Form.Control type="number" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="decimals">
          <Form.Label>Token Decimals:</Form.Label>
          <Form.Control type="number" />
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

export default Token;
