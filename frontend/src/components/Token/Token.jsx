/*
Feedback that token has been created
Maybe a list with previously created tokens
*/

import Button from "react-bootstrap/Button";
import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { ApplicationContext } from "../../ApplicationContext";
import TokensAbi from "../../artifacts/contracts/Tokens.sol/Tokens.json";
import TransactionResult from "../util/TransactionResult";
import { executeContractCall } from "../../proxies/executeContractCall";
import TokenOverview from "./TokenOverview";
import CreateTokenModal from "./CreateTokenModal";

const Token = () => {
  const { etherProvider, signer, contractAddresses } =
    useContext(ApplicationContext);
  const [txHash, setTxHash] = useState({
    hash: "",
    waiting: false,
    confirmed: false,
    error: false,
  });
  const [tokenContract, setTokenContract] = useState(null);
  const [reloadTokens, setReloadTokens] = useState(false);
  const [tokens, setTokens] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchTokens() {
      if (!etherProvider) {
        return;
      }
      setReloadTokens(false);
      const contract = new ethers.Contract(
        contractAddresses["Tokens"],
        TokensAbi.abi,
        etherProvider
      );
      setTokenContract(tokenContract);
      const tokens = await contract.getTokens();

      const obj = tokens.addresses.map((addr, i) => {
        return {
          address: tokens.addresses[i],
          decimals: tokens.decimals[i].toString(),
          name: tokens.names[i],
          owner: tokens.owners[i],
          symbol: tokens.symbols[i],
          totalSupply: tokens.totalSupplies[i].toString(),
        };
      });
      setTokens(obj);
    }
    fetchTokens();
  }, [etherProvider, reloadTokens, tokenContract, contractAddresses]);

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
