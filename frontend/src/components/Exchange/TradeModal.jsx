import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import React from "react";

const TradeModal = ({ closeModal, makeTrade, tokens, user }) => {
  const ownedTokens = () => {
    return tokenOptions(true);
  };
  const allTokens = () => {
    return tokenOptions(false);
  };
  const tokenOptions = (filtered) => {
    let tempTokens = tokens;
    if (filtered) {
      tempTokens = tokens?.filter((token) => token.owner === user.publicKey);
    }

    return tempTokens?.map(({ address, symbol }) => (
      <option key={address} value={address}>
        {symbol}
      </option>
    ));
  };

  return (
    <>
      <Modal show="true" onHide={closeModal}>
        <Form onSubmit={makeTrade}>
          <Modal.Header closeButton>
            <Modal.Title>Make Trade</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="offerToken">
              <Form.Label>Offer Token</Form.Label>
              <Form.Select>{ownedTokens()}</Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="offerAmount">
              <Form.Label>Offer amount</Form.Label>
              <Form.Control type="number" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="forToken">
              <Form.Label>For Token</Form.Label>
              <Form.Select>{allTokens()}</Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="forAmount">
              <Form.Label>For amount</Form.Label>
              <Form.Control type="number" required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
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

export default TradeModal;
