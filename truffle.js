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
  mocha: {
     reporter: 'eth-gas-reporter',
     reporterOptions : {
         currency: 'NZD',
         gasPrice: 21
     }
 }
}
