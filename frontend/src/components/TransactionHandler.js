export default class TransactionHandler {
  constructor(provider, setTransaction) {
    this.provider = provider;
    this.setTransaction = setTransaction;
    this.tx = {
      from: "",
      to: "",
      value: 0,
    };
  }
  async execute(callFunction) {
    let trans;

    try {
      trans = await callFunction();
    } catch (err) {
      this.setTransaction({ ...this.tx, error: true });
      console.log(err.message);
      return;
    }

    this.setTransaction({
      hash: trans.hash,
      waiting: true,
      confirmed: false,
      error: false,
    });

    await this.provider.waitForTransaction(trans.hash);
    await new Promise((resolve) => setTimeout(resolve, 10000));

    this.setTransaction({
      hash: trans.hash,
      waiting: false,
      confirmed: true,
      error: false,
    });
  }
}
