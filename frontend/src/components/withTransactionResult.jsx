import { useTransactions } from "./customHooks/useTransactions";
import TransactionResult from "./util/TransactionResult";

export const withTransactionResult = (WrappedComponent) => (props) => {
  const { transaction, setTransaction, transactionKey } = useTransactions();
  return (
    <>
      <WrappedComponent
        transaction={transaction}
        setTransaction={setTransaction}
        {...props}
      />
      <TransactionResult txHash={transaction} key={transaction.key} />
    </>
  );
};
