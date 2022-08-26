/*
create new ERC20 token + swap function
swap function: remember address and open "change"
OR
unique swap contract with owner rights, only I can make the swaps?
*/

import { useContext, useState } from "react";
import { ApplicationContext } from "../ApplicationContext";

const Token = () => {
  const { signer } = useContext(ApplicationContext);
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState("");

  const sendTransaction = async (event) => {
    event.preventDefault();
    console.log(await signer.getAddress());

    //TODO: Finish sending
    const tx = {
      from: "",
    };

    setName("");
    setAmount(0);
  };
  return (
    <>
      <h1>Create new Token</h1>
      <form onSubmit={sendTransaction}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            name="name"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
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
        {!signer && <p>Please connect on the overview page!</p>}
        <input type="submit" value="Submit" disabled={!signer}></input>
      </form>
    </>
  );
};

export default Token;
