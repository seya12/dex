/*
TODO: Form with input and submit button
make sure signer is available, make transaction, listen for event
*/

import { useState, useContext } from "react";
import { ApplicationContext } from "../ApplicationContext";

const Send = () => {
  const { signer } = useContext(ApplicationContext);
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState(0);

  const sendTransaction = async (event) => {
    event.preventDefault();
    console.log(await signer.getAddress());

    //TODO: Finish sending
    const tx = {
      from: "",
    };

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
    </>
  );
};

export default Send;
