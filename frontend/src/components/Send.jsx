/*
TODO: Form with input and submit button
make sure signer is available, make transaction, listen for event
*/

import { utils } from "ethers";
import { useState, useContext } from "react";
import { ApplicationContext } from "../ApplicationContext";

const Send = () => {
  const { etherProvider, signer, user } = useContext(ApplicationContext);
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState(0);
  const [txHash, setTxHash] = useState({
    hash: "",
    waiting: false,
    confirmed: false,
  });

  const sendTransaction = async (event) => {
    event.preventDefault();

    //TODO: Wait for mined transaction, display hash...
    const tx = {
      from: user.publicKey,
      to: receiver,
      value: utils.parseEther(amount),
    };

    let trans;
    try {
      trans = await signer.sendTransaction(tx);
    } catch (err) {
      console.log(err.message);
      return;
    }
    console.log("Sent Transaction... " + trans);
    setTxHash({
      hash: trans.hash,
      waiting: true,
      confirmed: false,
    });

    await etherProvider.waitForTransaction(trans.hash);
    await new Promise((resolve) => setTimeout(resolve, 10000));

    console.log("Transaction finished!");
    setTxHash({
      hash: trans.hash,
      waiting: false,
      confirmed: true,
    });
    setReceiver("");
    setAmount(0);
  };

  return (
    <>
      <h1>Send ETH</h1>
      <form onSubmit={sendTransaction}>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            name="amount"
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="receiver">To:</label>
          <input
            name="receiver"
            id="receiver"
            type="text"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
          ></input>
        </div>
        {!signer && <p>Please connect on the overview page!</p>}
        <input type="submit" value="Submit" disabled={!signer}></input>
      </form>
      {txHash.waiting && (
        <p>Waiting for transaction to be mined{txHash.hash}</p>
      )}
      {txHash.confirmed && <p>Transaction mined! Hash: {txHash.hash}</p>}
    </>
  );
};

export default Send;
