const writeContractAddress = async (name, address) => {
  const fs = require("fs");
  let parsed = readFile();

  parsed[name] = address;
  fs.writeFileSync(
    "../frontend/src/resources/addresses.json",
    JSON.stringify(parsed)
  );
};

const readFile = () => {
  const fs = require("fs");
  let parsed = {};
  try {
    const res = fs.readFileSync(
      "../frontend/src/resources/addresses.json",
      "utf8"
    );
    parsed = JSON.parse(res);
  } catch (exception) {
    console.log("error during read, probably resource does not exist");
  }
  return parsed;
};

module.exports = { writeContractAddress, readFile };
