module.exports = {

  networks: {
    development: {
      network_id: 15,
      host: 'localhost',
      port: 8545,
      gas: 4000000,
      gasPrice: 20e9
    }
  },
  coverage: {
    host: "localhost",
    network_id: "*",
    port: 8555, // <-- If you change this, also set the port option in .solcover.js.
    gas: 0xfffffffffff, // <-- Use this high gas value
    gasPrice: 0x01 // <-- Use this low gas price
  },
  // mocha: {
  //   reporter: 'eth-gas-reporter',
  //   reporterOptions: {
  //     currency: 'NZD',
  //     gasPrice: 21
  //   }
  // }
}
