import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const Trades = ({ trades }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Offer Token</th>
          <th>Offer Amount</th>
          <th>For Token</th>
          <th>For Amount</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {trades.map((trade) => {
          return (
            <tr>
              <td>{trade.seller.token}</td>
              <td>{trade.seller.amount.toString()}</td>
              <td>{trade.buyer.token}</td>
              <td>{trade.buyer.amount.toString()}</td>
              <td>
                <Button variant="dark">Take Trade</Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
export default Trades;
