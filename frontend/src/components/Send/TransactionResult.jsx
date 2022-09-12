import Alert from "react-bootstrap/Alert";
import { useState } from "react";

const TransactionResult = ({ txHash }) => {
  const [showAlert, setShowAlert] = useState(true);
  return (
    <>
      {txHash.error && (
        <Alert
          variant="danger"
          show={showAlert}
          dismissible
          onClose={() => setShowAlert(false)}
          className="mt-3"
        >
          <Alert.Heading>An Error occured</Alert.Heading>
          <p>Something went wrong, please see console for more information</p>
        </Alert>
      )}
      {txHash.waiting && (
        <Alert
          variant="warning"
          show={showAlert}
          dismissible
          onClose={() => setShowAlert(false)}
          className="mt-3"
        >
          <Alert.Heading>
            Transaction created! Waiting to be mined
          </Alert.Heading>
          <p>Transaction Hash: {txHash.hash}</p>
        </Alert>
      )}
      {txHash.confirmed && (
        <Alert
          variant="success"
          show={showAlert}
          dismissible
          onClose={() => setShowAlert(false)}
          className="mt-3"
        >
          <Alert.Heading>Transaction mined successfully!</Alert.Heading>
          <p>Transaction Hash: {txHash.hash}</p>
        </Alert>
      )}
    </>
  );
};
export default TransactionResult;
