import Card from "react-bootstrap/Card";

const NetworkInfo = (props) => {
  return (
    <Card className="mt-3 text-center">
      <Card.Header as="h2" className="mt-0">
        Network infos
      </Card.Header>
      <Card.Body className="pb-0">
        <p>
          <strong>Network ID:</strong> {props.id}
        </p>
        <p>
          <strong>Network Name:</strong> {props.name}
        </p>
        <p>
          <strong>Block Number:</strong> {props.blockNumber}
        </p>
      </Card.Body>
    </Card>
  );
};
export default NetworkInfo;
