import { useContext } from "react";
import { useState } from "react";
import { ApplicationContext } from "../../ApplicationContext";

/*
TODO: manage multiple transactions
*/

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
      return;
    }
    setTransaction({
      ...defaultTransaction,
      hash: trans.hash,
      waiting: true,
    });

    await etherProvider.waitForTransaction(trans.hash);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setTransaction({
      ...transaction,
      hash: trans.hash,
      waiting: false,
      confirmed: true,
    });
  };

  return { transaction, transactionKey, setTransaction, executeContractCall };
}
