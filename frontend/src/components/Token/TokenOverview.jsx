import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/esm/Table";
import Balances from "./Balances";

function TokenOverview({ tokens, signer }) {
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState(0);
  const closeModal = () => setShowModal(false);
  const openModal = (event) => {
    if (signer) {
      setShowModal(true);
      setAddress(event.target.value);
    }
  };

  return (
    <>
      <h1>Latest Tokens</h1>
      <Table striped bordered hover>
        <thead className="text-center">
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Address</th>
            <th>Total Supply</th>
            <th>Decimals</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {tokens?.map((token, index) => {
            return (
              <tr key={index}>
                <td className="p-1">
                  <Button
                    className="p-1"
                    variant="link"
                    onClick={(e) => openModal(e)}
                    value={token.address}
                  >
                    {token.name}
                  </Button>
                </td>
                <td>{token.symbol}</td>
                <td>{token.address}</td>
                <td>{token.totalSupply}</td>
                <td>{token.decimals}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {showModal && <Balances closeModal={closeModal} address={address} />}
    </>
  );
}

export default TokenOverview;
