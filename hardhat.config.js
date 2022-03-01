/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");
require("dotenv/config");

const { HARDHAT_PORT } = process.env;

module.exports = {
  solidity: "0.7.3",
  networks: {
    localhost: { url: `http://127.0.0.1:${HARDHAT_PORT}` },
    hardhat: {
      accounts: [{"privateKey":"0x79c1ffe07e81d92a2c6d039a7e13201e89c419be54e5c646dc49517c3806293b","balance":"1000000000000000000000"},{"privateKey":"0x577cd8e3fb510645a9c31ee72a2162ed9628da3ced86a1663d85cf2778788c44","balance":"1000000000000000000000"},{"privateKey":"0x325fda5fe0df75972a4086f6c918b06654db9ffc4abc5ac95b926ad5bf7e7c20","balance":"1000000000000000000000"},{"privateKey":"0x0127fb4f8dc6d6b8467cc5a8443920592302e09575cb7d0c9f3cbeccd1098e75","balance":"1000000000000000000000"},{"privateKey":"0x10b0141be2b918b3e8213a15caaed948c5f613cfba544f00e5dc5632bc099b1f","balance":"1000000000000000000000"},{"privateKey":"0xb3a2669f6830b430ec9e3263d7c01abb5ad904c9e839666b0c4cddf0e8dcf3b8","balance":"1000000000000000000000"},{"privateKey":"0x27859e87fe8badd4ef7d4fabed62ea1d2ed934f44328801cf9a0ec3f5d02c8eb","balance":"1000000000000000000000"},{"privateKey":"0x9bf55c5f4ca399df6988fea140f9f0300a95032e28a72c9f9f4de8f7d2c7efc0","balance":"1000000000000000000000"},{"privateKey":"0x58b8ee2cead7c77772aa8dd35519df4ce57f1bc50b54df7c6d961a09c75de219","balance":"1000000000000000000000"},{"privateKey":"0x9cf99469d2a813b110daa806b5958adf245a2b68360220f4c2865fc1c061c6b3","balance":"1000000000000000000000"}]
    },
  },
  paths: {
    sources: './contracts',
    tests: './__tests__/contracts',
    cache: './cache',
    artifacts: './artifacts',
  },
};