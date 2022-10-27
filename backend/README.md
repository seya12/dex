# Hardhat project for DEX on Ethereum

This project is based on hardhat. It includes the necessary smart contracts and custom scripts for easier deployment.

Run following task to start a local blockchain network:

```shell
npx hardhat node
```

Scripts can be executed with following task:

```shell
npx hardhat run scripts/deployTokens.js
```

Following custom command deploys the Trades and Tokens contract plus some test data. Please make sure that your local blockchain network is running before running the task.

```shell
npx hardhat init --network localhost
```
