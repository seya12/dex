import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { ApplicationContext } from "../ApplicationContext";

const Home = () => {
  const { etherProvider, signer, setSigner } = useContext(ApplicationContext);
  const [balance, setBalance] = useState(0);

  const connect = async () => {
    const accounts = await etherProvider.send("eth_requestAccounts", []);
    setSigner(etherProvider.getSigner());

    let balance = await etherProvider.getBalance(accounts[0]);
    setBalance(ethers.utils.formatEther(balance));
  };

  return (
    <>
      {!etherProvider ? (
        <Alert variant="danger">Please install Metamask!</Alert>
      ) : (
        <>
          <Button onClick={connect}>Connect</Button>{" "}
          {signer !== undefined ? "Connected" : "Not Connected"}
        </>
      )}

      <h1>Balance</h1>
      <span>{balance && balance.toString()} ETH</span>
      {etherProvider && (
        <>
          <h2>Network infos:</h2>
          <p>Network ID:</p>
          <p>Block Number</p>
        </>
      )}
    </>
  );
};
export default Home;
