import { useState } from "react";

/*
TODO: manage multiple transactions
*/

export function useTransactions() {
  const [transaction, setTransaction] = useState([
    {
      hash: "",
      waiting: false,
      confirmed: false,
      error: false,
      visible: true,
      get key() {
        return this.hash + this.waiting + this.confirmed + this.error;
      },
    },
  ]);
  const transactionKey =
    transaction.hash +
    transaction.waiting +
    transaction.confirmed +
    transaction.error;

  const modifyTransactions = (trans) => {
    const newTransactions = [...transaction];
    const index = newTransactions.findIndex(({ hash }) => hash === trans.hash);
    if (index === -1) {
      newTransactions.push(trans);
    } else {
      newTransactions[index] = trans;
    }
    setTransaction(newTransactions);
  };

  return { transaction, setTransaction, transactionKey, modifyTransactions };
}
