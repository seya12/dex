import Modal from "react-bootstrap/Modal";
import { useToken } from "../customHooks/useToken";

const Balances = ({ closeModal, address }) => {
  const { balance } = useToken(address);

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
