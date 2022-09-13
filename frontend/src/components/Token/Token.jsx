/*
Feedback that token has been created
Maybe a list with previously created tokens
*/

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ethers } from "ethers";
import { useContext, useState } from "react";
import { ApplicationContext } from "../../ApplicationContext";
import TokenAbi from "../../artifacts/contracts/Token.sol/Token.json";
import TokensAbi from "../../artifacts/contracts/Tokens.sol/Tokens.json";
import { useEffect } from "react";

const Token = () => {
  const { signer } = useContext(ApplicationContext);

  const createToken = async (event) => {
    event.preventDefault();
    const params = event.target;
    const tokens = new ethers.Contract(
      "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
      TokensAbi.abi,
      signer
    );
    const create = await tokens.createToken(
      params.name.value,
      params.symbol.value,
      params.totalSupply.value,
      params.decimals.value
    );
    await create.wait();
    console.log("finito");
    const tokenAddresses = await tokens.getTokens();
    console.log(tokenAddresses);
  };

  return (
    <>
      <h1>Create new Token</h1>
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
    </>
  );
};

export default Token;
