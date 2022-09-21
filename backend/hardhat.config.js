const { task, extendEnvironment } = require("hardhat/config");

require("@nomicfoundation/hardhat-toolbox");

task("init", "Initially deploy contracts").setAction(async () => {
  await hre.run("run", { script: "scripts/deployTrades.js" });
  await hre.run("run", { script: "scripts/deployTokens.js" });
  await hre.run("run", { script: "scripts/addTestData.js" });
});

extendEnvironment((hre) => {
  const { readFile } = require("./scripts/fileUtils.js");
  const contracts = readFile();
  hre.tradesContractAddress = contracts["Trades"];
  hre.tokensContractAddress = contracts["Tokens"];
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  paths: {
    artifacts: "../frontend/src/artifacts",
  },
};
