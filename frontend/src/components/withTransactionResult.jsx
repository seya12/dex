import { useTransactions } from "./customHooks/useTransactions";
import TransactionResult from "./util/TransactionResult";

export const withTransactionResult = (WrappedComponent) => (props) => {
  const { transaction, setTransaction, modifyTransactions } = useTransactions();
  return (
    <>
      <WrappedComponent
        transaction={transaction}
        setTransaction={setTransaction}
        {...props}
      />
      <TransactionResult transaction={transaction} key={transaction.key} />
    </>
  );
};
