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
import TransactionResult from "../util/TransactionResult";
import { executeContractCall } from "../../proxies/executeContractCall";
import contractAddresses from "../../resources/addresses.json";

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
      contractAddresses["Tokens"],
      TokensAbi.abi,
      signer
    );
    const contractCall = () =>
      tokens.createToken(
        params.name.value,
        params.symbol.value,
        params.totalSupply.value,
        params.decimals.value
      );

    await executeContractCall(contractCall, etherProvider, setTxHash);
    event.target.reset();
  };

  const connect = async () => {
    const tokens = new ethers.Contract(
      contractAddresses["Tokens"],
      TokensAbi.abi,
      signer
    );
    const res = await tokens.getTokenNames();
    console.log(res);
  };

  return (
    <>
      <Button onClick={connect}>Click</Button>
      <h1>Create a new Token</h1>
      <Form onSubmit={createToken}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Token Name:</Form.Label>
          <Form.Control type="text" autoFocus required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="symbol">
          <Form.Label>Token Symbol:</Form.Label>
          <Form.Control type="text" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="totalSupply">
          <Form.Label>Total Supply:</Form.Label>
          <Form.Control type="number" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="decimals">
          <Form.Label>Token Decimals:</Form.Label>
          <Form.Control type="number" required />
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
