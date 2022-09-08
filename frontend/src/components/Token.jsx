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

const Token = () => {
  const { etherProvider, signer } = useContext(ApplicationContext);
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState("");

  const createToken = async (event) => {
    event.preventDefault();
    console.log(await signer.getAddress());

    //TODO: Finish sending
    const tx = {
      from: "",
    };

    setName("");
    setAmount(0);
  };

  const click = async () => {
    const token = new ethers.Contract(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      TokenAbi.abi,
      etherProvider
    );
    console.log(token.address);
    const name = await token.name();
    console.log(name);
  };

  return (
    <>
      <button onClick={click}>Click</button>
      <h1>Create new Token</h1>
      <Form onSubmit={createToken}>
        <Form.Group className="mb-3" controlId="tokenName">
          <Form.Label>Token Name:</Form.Label>
          <Form.Control type="text" autoFocus />
        </Form.Group>
        <Form.Group className="mb-3" controlId="totalSupply">
          <Form.Label>Total Supply:</Form.Label>
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
