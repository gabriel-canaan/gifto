const Gifto = artifacts.require("Gifto");

let giftoStart;
let newMultiSigWallet;

// contract("Gifto", async function(accounts) {
//   beforeEach(async () => {
//       giftoStart = await giftoStart.new({from: accounts[0]});
//     });

contract("MultiSigWallet", function(accounts) {
  // beforeEach(async () => {
  //
  // });

  it('sets initial owners', async => {
    newMultiSigWallet = await Gifto.new(0x0, 1, {from: accounts[0]});
    // assert.isOk(newMultiSigWallet([msg.sender]));
  });
});
