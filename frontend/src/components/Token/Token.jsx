import Button from "react-bootstrap/Button";
import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { ApplicationContext } from "../../ApplicationContext";
import TokensAbi from "../../artifacts/contracts/Tokens.sol/Tokens.json";
import TransactionResult from "../util/TransactionResult";
import { executeContractCall } from "../../proxies/executeContractCall";
import TokenOverview from "./TokenOverview";
import CreateTokenModal from "./CreateTokenModal";
import { useTokens } from "../customHooks/useTokens";

const Token = () => {
  const { etherProvider, signer, contractAddresses } =
    useContext(ApplicationContext);
  const [txHash, setTxHash] = useState({
    hash: "",
    waiting: false,
    confirmed: false,
    error: false,
  });
  const [reloadTokens, setReloadTokens] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const tokens = useTokens(
    etherProvider,
    ethers,
    contractAddresses["Tokens"],
    reloadTokens
  );

  useEffect(() => {
    if (txHash.waiting) {
      setShowModal(false);
    }
  }, [txHash]);

  const createToken = async (event) => {
    event.preventDefault();
    const params = event.target;
    const tokens = new ethers.Contract(
      contractAddresses["Tokens"],
      TokensAbi.abi,
      signer
    );

    const contractCall = () =>
      tokens.createToken(
        params.name.value,
        params.symbol.value,
        params.totalSupply.value,
        params.decimals.value
      );

    await executeContractCall(contractCall, etherProvider, setTxHash);
    setShowModal(false);
    setReloadTokens(true);
  };

  return (
    <>
      <TokenOverview tokens={tokens} />
      {!signer && <p>Please connect on the overview page!</p>}
      <Button disabled={!signer} onClick={() => setShowModal(true)}>
        Create new Token
      </Button>

      {showModal && (
        <CreateTokenModal
          closeModal={() => setShowModal(false)}
          createToken={createToken}
        />
      )}
      <TransactionResult
        txHash={txHash}
        key={txHash.hash + txHash.waiting + txHash.confirmed + txHash.error}
      />
    </>
  );
};

export default Token;
