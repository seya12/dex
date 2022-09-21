// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  if (!hre.tradesContractAddress || !hre.tokensContractAddress) {
    console.log("contracts not set... exit");
    return;
  }
  const signers = await hre.ethers.getSigners();
  let tradesContract = await hre.ethers.getContractAt(
    "Trades",
    hre.tradesContractAddress,
    signers[1]
  );
  let tokensContract = await hre.ethers.getContractAt(
    "Tokens",
    hre.tokensContractAddress
  );

  //to receive the address, basically do not changae the state, just a simulation
  const lsAddress = await tokensContract.callStatic.createToken(
    "LS",
    "LS",
    100,
    0
  );
  let tx = await tokensContract.createToken("LS", "LS", 100, 0);
  await tx.wait();

  const lsToken = await hre.ethers.getContractAt("Token", lsAddress);

  await lsToken.approve(hre.tradesContractAddress, 10);

  tokensContract = tokensContract.connect(signers[1]);
  const mgAddress = await tokensContract.callStatic.createToken(
    "MG",
    "MG",
    50,
    0
  );

  tx = await tokensContract.createToken("MG", "MG", 50, 0);
  await tx.wait();
  const mgToken = await hre.ethers.getContractAt(
    "Token",
    mgAddress,
    signers[1]
  );
  await mgToken.approve(hre.tradesContractAddress, 10);

  tradesContract.addTrade(mgAddress, 10, lsAddress, 10);
  console.log("finished adding test data");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
