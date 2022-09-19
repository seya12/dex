import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import React from "react";

const CreateTokenModal = ({ closeModal, createToken }) => {
  return (
    <>
      <Modal show="true" onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create a new Token</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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

            <Button type="submit">Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateTokenModal;
