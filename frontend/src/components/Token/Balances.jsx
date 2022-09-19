import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { ApplicationContext } from "../../ApplicationContext";
import { ethers } from "ethers";
import TokenAbi from "../../artifacts/contracts/Token.sol/Token.json";

const Balances = ({ closeModal, address }) => {
  const { etherProvider, user } = useContext(ApplicationContext);

  const [balance, setBalance] = useState(-1);

  useEffect(() => {
    async function getBalances() {
      console.log(address);
      const token = new ethers.Contract(address, TokenAbi.abi, etherProvider);
      console.log(token);
      console.log(user.publicKey);
      const balances = await token.balanceOf(user.publicKey);
      setBalance(balances.toString());
    }
    getBalances();
  }, [etherProvider, address, user]);
  return (
    <>
      <Modal show="true" onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Balances</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your Balance for this token: {balance}</Modal.Body>
      </Modal>
    </>
  );
};

export default Balances;
