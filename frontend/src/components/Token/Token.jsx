/*
Feedback that token has been created
Maybe a list with previously created tokens
*/

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { ApplicationContext } from "../../ApplicationContext";
import TokensAbi from "../../artifacts/contracts/Tokens.sol/Tokens.json";
import TransactionResult from "../util/TransactionResult";
import { executeContractCall } from "../../proxies/executeContractCall";
import TokenOverview from "./TokenOverview";

const Token = () => {
  const { etherProvider, signer, contractAddresses } =
    useContext(ApplicationContext);
  const [txHash, setTxHash] = useState({
    hash: "",
    waiting: false,
    confirmed: false,
    error: false,
  });
  const [tokenContract, setTokenContract] = useState(null);
  const [success, setSuccess] = useState(false);
  const [tokens, setTokens] = useState(null);

  useEffect(() => {
    async function fetchTokens() {
      if (!etherProvider || !signer) {
        return;
      }
      setSuccess(false);
      const tokens = new ethers.Contract(
        contractAddresses["Tokens"],
        TokensAbi.abi,
        signer
      );
      setTokenContract(tokenContract);
      const res = await tokens.getTokens();
      console.log(res);

      console.log("rwo");
      const res2 = await tokens.getTokenss();
      console.log(res2);
      const obj = res.addresses.map((addr, i) => {
        return {
          address: res.addresses[i],
          decimals: res.decimals[i].toString(),
          name: res.names[i],
          owner: res.owners[i],
          symbol: res.symbols[i],
          totalSupply: res.totalSupplies[i].toString(),
        };
      });
      setTokens(obj);
    }
    fetchTokens();
  }, [etherProvider, signer, success]);

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
    setSuccess(true);
  };

  return (
    <>
      <TokenOverview tokens={tokens} />
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
