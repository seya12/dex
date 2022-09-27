import Alert from "react-bootstrap/Alert";
import InfoCard from "./InfoCard";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { ApplicationContext } from "../../ApplicationContext";

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
      setNetwork({
        id: network.chainId,
        name: network.name,
        blockNumber: blockNumber,
      });
    }
    fetchNetwork();
  }, [etherProvider]);

  const networkBody = {
    "Network ID": network.id,
    "Network Name": network.name,
    "Block Number": network.blockNumber,
  };

  const userBody = {
    Balance: user.balance,
    "Public Key": user.publicKey,
  };

  return (
    <>
      {!etherProvider && (
        <Alert variant="danger">Please install Metamask!</Alert>
      )}
      {etherProvider && (
        <>
          <InfoCard header="Network Infos" body={networkBody} />
          <InfoCard header="User Infos" body={userBody} />
        </>
      )}
    </>
  );
};
export default Home;
