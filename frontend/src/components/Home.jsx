import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { ApplicationContext } from "../ApplicationContext";

//TODO: Listen on change of user account -> refetch Network and provider details
//TODO: Use Effect on User infos in case of tab switch
const Home = () => {
  const { etherProvider, signer, setSigner, user, setUser } =
    useContext(ApplicationContext);

  const [network, setNetwork] = useState({
    id: 0,
    name: "",
    blockNumber: 0,
  });

  useEffect(() => {
    async function fetchNetwork() {
      if (!etherProvider) {
        return;
      }
      let network = await etherProvider.getNetwork();
      let blockNumber = await etherProvider.getBlockNumber();
      console.log(`blocknumber: ${blockNumber}`);
      setNetwork({
        id: network.chainId,
        name: network.name,
        blockNumber: blockNumber,
      });
    }
    console.log("use");
    fetchNetwork();
  }, [etherProvider]);

  const connect = async () => {
    const accounts = await etherProvider.send("eth_requestAccounts", []);
    setSigner(etherProvider.getSigner());
    let balance = await etherProvider.getBalance(accounts[0]);
    balance = ethers.utils.formatEther(balance);
    setUser({
      publicKey: accounts[0],
      balance: balance.toString(),
    });
  };

  return (
    <>
      {etherProvider && (
        <>
          <h1>Network infos</h1>
          <p>Network ID: {network.id}</p>
          <p>Network Name: {network.name}</p>
          <p>Block Number: {network.blockNumber}</p>
        </>
      )}
      {!etherProvider ? (
        <Alert variant="danger">Please install Metamask!</Alert>
      ) : (
        <>
          <Button onClick={connect}>Connect</Button>{" "}
          {signer !== undefined ? "Connected" : "Not Connected"}
        </>
      )}

      <h1>User Infos:</h1>
      <p>Balance: {user.balance} ETH</p>
      <p>Public Key: {user.publicKey}</p>
    </>
  );
};
export default Home;
