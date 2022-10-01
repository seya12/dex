import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/esm/Table";
import Balances from "./Balances";

function TokenOverview({ tokens, signer }) {
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState(0);

  const openModal = (event) => {
    setAddress(event.target.value);
    setShowModal(true);
  };

  return (
    <>
      <h1 className="text-center">Latest Tokens</h1>
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
                    onClick={openModal}
                    value={token.address}
                    disabled={!signer}
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
      {showModal && (
        <Balances closeModal={() => setShowModal(false)} address={address} />
      )}
    </>
  );
}

export default TokenOverview;
