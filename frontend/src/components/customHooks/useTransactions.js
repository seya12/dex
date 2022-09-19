import { useState } from "react";

export function useTransactions() {
  const [transaction, setTransaction] = useState({
    hash: "",
    waiting: false,
    confirmed: false,
    error: false,
  });
  const transactionKey =
    transaction.hash +
    transaction.waiting +
    transaction.confirmed +
    transaction.error;

  return { transaction, setTransaction, transactionKey };
}
