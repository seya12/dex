import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

const Trades = ({ trades, takeTrade, user, signer }) => {
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
        {trades
          ?.filter((trade) => trade.open)
          .map((trade) => {
            return (
              <tr key={trade.id?.toString() ?? 0}>
                <td>{trade.seller.tokenSymbol}</td>
                <td>{trade.seller.amount.toString()}</td>
                <td>{trade.buyer.tokenSymbol}</td>
                <td>{trade.buyer.amount.toString()}</td>
                <td>
                  <Button
                    onClick={() => takeTrade(trade)}
                    disabled={
                      !signer || trade.seller.participant === user.publicKey
                    }
                    variant="dark"
                  >
                    Take Trade
                  </Button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};
export default Trades;
