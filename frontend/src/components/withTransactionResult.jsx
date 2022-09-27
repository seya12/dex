import { useTransactions } from "./customHooks/useTransactions";
import TransactionResult from "./util/TransactionResult";

export const withTransactionResult = (WrappedComponent) => (props) => {
  const { transaction, setTransaction, executeContractCall, transactionKey } =
    useTransactions();
  return (
    <>
      <WrappedComponent
        transaction={transaction}
        setTransaction={setTransaction}
        executeContractCall={executeContractCall}
        {...props}
      />
      <TransactionResult transaction={transaction} key={transactionKey} />
    </>
  );
};
