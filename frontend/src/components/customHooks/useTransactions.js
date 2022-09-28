import { useContext, useState } from "react";
import { ApplicationContext } from "../../ApplicationContext";

export function useTransactions() {
  const { etherProvider } = useContext(ApplicationContext);
  const defaultTransaction = {
    hash: "",
    waiting: false,
    confirmed: false,
    error: false,
    visible: true,
  };

  const [transaction, setTransaction] = useState({ ...defaultTransaction });

  const transactionKey =
    transaction.hash +
    transaction.waiting +
    transaction.confirmed +
    transaction.error;

  const executeContractCall = async (contractCall) => {
    let trans;
    try {
      trans = await contractCall();
    } catch (err) {
      setTransaction({
        ...defaultTransaction,
        error: true,
      });
      console.log(err.message);
      return false;
    }

    setTransaction({
      ...defaultTransaction,
      hash: trans.hash,
      waiting: true,
    });

    await etherProvider.waitForTransaction(trans.hash);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setTransaction({
      ...defaultTransaction,
      hash: trans.hash,
      confirmed: true,
    });
    return true;
  };

  return { transaction, transactionKey, setTransaction, executeContractCall };
}
