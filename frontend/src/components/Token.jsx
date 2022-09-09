/*
create new ERC20 token
no swap function as mentioned before as ERC20 has allowances
*/

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ethers } from "ethers";
import { useContext, useState } from "react";
import { ApplicationContext } from "../ApplicationContext";
import TokenAbi from "../artifacts/contracts/Token.sol/Token.json";
import TokensAbi from "../artifacts/contracts/Tokens.sol/Tokens.json";

const Token = () => {
  const { etherProvider, signer } = useContext(ApplicationContext);

  const click = async () => {
    const tokens = new ethers.Contract(
      "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
      TokensAbi.abi,
      signer
    );
    const create = await tokens.createToken("FH Token", "FH", 10, 0);
    await create.wait();
    console.log("finito");
    const tokenAddresses = await tokens.getTokens();
    console.log(tokenAddresses);
  };

  const clickTwo = async () => {
    const tokenOne = new ethers.Contract(
      "0x75537828f2ce51be7289709686A69CbFDbB714F1",
      TokenAbi.abi,
      signer
    );
    const name = await tokenOne.name();
    console.log(name);
  };

  const createToken = async (event) => {
    event.preventDefault();
    const params = event.target;
    const newToken = new ethers.ContractFactory(
      TokenAbi.abi,
      TokenAbi.bytecode,
      signer
    );
    const contract = await newToken.deploy(
      params.name.value,
      params.symbol.value,
      params.totalSupply.value,
      params.decimals.value
    );
    console.log(contract.address);
    await contract.deployed();
    console.log("finito");
  };

  return (
    <>
      <h1>Create new Token</h1>
      <button onClick={click}>click</button>
      <button onClick={clickTwo}>click2</button>
      <Form onSubmit={createToken}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Token Name:</Form.Label>
          <Form.Control type="text" autoFocus />
        </Form.Group>
        <Form.Group className="mb-3" controlId="symbol">
          <Form.Label>Token Symbol:</Form.Label>
          <Form.Control type="text" autoFocus />
        </Form.Group>
        <Form.Group className="mb-3" controlId="totalSupply">
          <Form.Label>Total Supply:</Form.Label>
          <Form.Control type="number" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="decimals">
          <Form.Label>Token Decimals:</Form.Label>
          <Form.Control type="number" autoFocus />
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
