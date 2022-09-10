import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import NetworkInfo from "./NetworkInfo";
import UserInfos from "./UserInfos";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { ApplicationContext } from "../ApplicationContext";

//TODO: Listen on change of user account -> refetch Network and provider details
//TODO: Use Effect on User infos in case of tab switch
const Home = () => {
  const { etherProvider, user } = useContext(ApplicationContext);

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

  return (
    <>
      {!etherProvider && (
        <Alert variant="danger">Please install Metamask!</Alert>
      )}
      {etherProvider && (
        <>
          <NetworkInfo {...network} />
          <UserInfos {...user} />
        </>
      )}
    </>
  );
};
export default Home;
