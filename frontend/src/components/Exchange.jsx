/*
TODO: 
- call smart contract and make exchange
- write contract address in config file and fetch it from there
- 
*/
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ethers } from "ethers";
import { useContext, useState, useEffect, useCallback } from "react";
import { ApplicationContext } from "../ApplicationContext";
import TradesAbi from "../artifacts/contracts/Trades.sol/Trades.json";

const Exchange = () => {
  const { etherProvider, signer } = useContext(ApplicationContext);
  const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

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

  const showTradess = () => {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Offer Token</th>
            <th>Offer Amount</th>
            <th>For Token</th>
            <th>For Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => {
            return (
              <tr>
                <td>{trade.seller.token}</td>
                <td>{trade.seller.amount.toString()}</td>
                <td>{trade.buyer.token}</td>
                <td>{trade.buyer.amount.toString()}</td>
                <td>
                  <button>Take Trade</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  };

  const click = async () => {
    if (!signer) {
      console.log("signer not set... return");
      return;
    }
    const trades = new ethers.Contract(CONTRACT_ADDRESS, TradesAbi.abi, signer);

    const t = await trades.getTrades();
    console.log(t);
    const partners = [
      {
        participant: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        token: "TEST",
        amount: 1,
      },
      {
        participant: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
        token: "COUNTER",
        amount: 10,
      },
    ];
    const trade = {
      seller: partners[0],
      buyer: partners[1],
      open: true,
    };
    const trans = await trades.addTrade(trade);
    console.log(trans);
    const confirmedTx = await trans.wait();
    console.log(confirmedTx);
    const abc = await trades.getTrades();
    console.log(abc);
  };

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
    console.log("w11111hä");

    const confirmedTx = await tx.wait();
    console.log("confirmed");

    fetchContract();
    setShowModal(false);
  };

  return (
    <>
      <h1>Exchange</h1>
      <h2>Available Trades:</h2>
      <section>{showTradess()}</section>
      <h2>Past Trades</h2>
      <section>{showClosedTrades}</section>
      <button onClick={() => setShowModal(true)} disabled={!signer}>
        Offer Trade
      </button>

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
