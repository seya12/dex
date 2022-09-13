/*
TODO: 
- call smart contract and make exchange
- write contract address in config file and fetch it from there
*/
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { ethers } from "ethers";
import { useContext, useState, useEffect, useCallback } from "react";

import { ApplicationContext } from "../../ApplicationContext";
import Trades from "./Trades";
import TokensAbi from "../../artifacts/contracts/Tokens.sol/Tokens.json";
import TradesAbi from "../../artifacts/contracts/Trades.sol/Trades.json";

const Exchange = () => {
  const { etherProvider, signer } = useContext(ApplicationContext);
  const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const { availableTokens, setAvailableTokens } = useState();
  const [showModal, setShowModal] = useState(false);
  const [trades, setTrades] = useState([
    {
      seller: {
        participant: "",
        token: "",
        amount: 0,
      },
      buyer: {
        participant: "",
        token: "",
        amount: 0,
      },
      open: true,
    },
  ]);

  const fetchContract = useCallback(async () => {
    if (!etherProvider) {
      return;
    }
    const trades = new ethers.Contract(
      CONTRACT_ADDRESS,
      TradesAbi.abi,
      etherProvider
    );

    const contractTrades = await trades.getTrades();
    setTrades(contractTrades);
    console.log(contractTrades);
    console.log("trades set from solidity...");
  }, [etherProvider]);

  useEffect(() => {
    console.log("in use effect...");
    fetchContract();
  }, [fetchContract]);

  useEffect(() => {
    async function fetchTokens() {
      const tokens = new ethers.Contract(
        "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
        TokensAbi.abi,
        etherProvider
      );
      const tokenNames = await tokens.getTokenNames();
      console.log(`Names: ${tokenNames}`);
    }
    fetchTokens();
  });
  const showClosedTrades = async () => {};

  const closeMakeTrade = () => {
    setShowModal(false);
  };

  const makeTrade = async (e) => {
    e.preventDefault();
    console.log(e.target.offerAmount.value);

    const partners = [
      {
        participant: await signer.getAddress(),
        token: e.target.offerToken.value,
        amount: e.target.offerAmount.value,
      },
      {
        participant: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        token: e.target.forToken.value,
        amount: e.target.forAmount.value,
      },
    ];
    const trade = {
      seller: partners[0],
      buyer: partners[1],
      open: true,
    };
    const trades = new ethers.Contract(CONTRACT_ADDRESS, TradesAbi.abi, signer);

    const tx = await trades.addTrade(trade);
    setShowModal(false);
    await tx.wait();

    fetchContract();
  };

  return (
    <>
      <h1>Exchange</h1>
      <h2>Available Trades:</h2>
      <Trades trades={trades} />
      <h2>Past Trades</h2>
      <section>{showClosedTrades}</section>
      <Button onClick={() => setShowModal(true)} disabled={!signer}>
        Offer Trade
      </Button>

      <Modal show={showModal} onHide={closeMakeTrade}>
        <Form onSubmit={makeTrade}>
          <Modal.Header closeButton>
            <Modal.Title>Make Trade</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="offerToken">
              <Form.Label>Offer Token</Form.Label>
              <Form.Control type="text" autoFocus />
            </Form.Group>
            <Form.Group className="mb-3" controlId="offerAmount">
              <Form.Label>Offer amount</Form.Label>
              <Form.Control type="number" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="forToken">
              <Form.Label>For Token</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="forAmount">
              <Form.Label>For amount</Form.Label>
              <Form.Control type="number" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeMakeTrade}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Exchange;
