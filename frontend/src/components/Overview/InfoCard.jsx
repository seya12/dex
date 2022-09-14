import Card from "react-bootstrap/Card";

const InfoCard = ({ header, body }) => {
  const bodyResults = () =>
    Object.entries(body).map(([key, value]) => {
      return (
        <p key={key}>
          <strong>{key}:</strong> {value}
        </p>
      );
    });

  return (
    <Card className="mt-3 text-center">
      <Card.Header as="h2" className="mt-0">
        {header}
      </Card.Header>
      <Card.Body className="pb-0">{bodyResults()}</Card.Body>
    </Card>
  );
};
export default InfoCard;
