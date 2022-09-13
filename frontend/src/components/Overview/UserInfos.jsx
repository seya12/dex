import Card from "react-bootstrap/Card";

const UserInfos = (props) => {
  return (
    <Card className="mt-3 text-center">
      <Card.Header as="h2" className="mt-0">
        User Infos
      </Card.Header>
      <Card.Body className="pb-0">
        <p>
          <strong>Balance:</strong> {props.balance}
        </p>
        <p>
          <strong>Public Key:</strong> {props.publicKey}
        </p>
      </Card.Body>
    </Card>
  );
};
export default UserInfos;
