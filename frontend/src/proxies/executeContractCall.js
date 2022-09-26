/*
TODO: use provider.once(txHash, (transaction))
*/
export const executeContractCall = async (
  contractCall,
  provider,
  setTransaction
) => {
  let transaction;
  try {
    transaction = await contractCall();
  } catch (err) {
    setTransaction({
      hash: "",
      waiting: false,
      confirmed: false,
      error: true,
    });
    console.log(err.message);
    return;
  }
  setTransaction({
    hash: transaction.hash,
    waiting: true,
    confirmed: false,
    error: false,
  });

  await provider.waitForTransaction(transaction.hash);
  await new Promise((resolve) => setTimeout(resolve, 2000));

  setTransaction({
    hash: transaction.hash,
    waiting: false,
    confirmed: true,
    error: false,
  });
};
