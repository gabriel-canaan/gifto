const assertFail = require("./helpers/assertFail");
// const Gifto = artifacts.require("./helpers/MockMultiSigWallet");
const Gifto = artifacts.require("Gifto");
const MSW = artifacts.require("MultiSigWallet");
const utils = require("./helpers/Utils");
const BigNumber = require("bignumber.js");

let giftoDeployed, mswDeployed;

contract("MultiSigWallet Tests", async function([deployer, investor, vandal, wallet]) {
  beforeEach(async () => {
    giftoDeployed = await Gifto.new();
    mswDeployed = await MSW.new([wallet],1,{gas: 4700000});
  });

  it("Can’t purchase gifto for less than the minimum buy amount", async () => {
    await assertFail(async () => {
      await giftoDeployed.MultiSigWallet(0x0, 1, {
        from: investor,
        value: web3.toWei(0.1, "ether")
      });
    });
  });

  it("Users can be added to investor list", async () => {
    await giftoDeployed.addInvestorList([investor], { from: deployer });
    assert.equal(await giftoDeployed.isApprovedInvestor(investor), true);
    assert.equal(await giftoDeployed.isApprovedInvestor(vandal), false);
  });

  it("Functions from Gifto()", async () => {
      assert.isOk(await giftoDeployed.turnOnSale({ from: deployer }));
      assert.isOk(await giftoDeployed.totalSupply({ from: deployer }));
  });

  it('Initialising the Gifto contract should trigger a transfer event which generates the tokens', async function () {
  let event = giftoDeployed.Transfer({});
  event.watch(function(err, res) {
      if (!err) {
        assert.equal(res['event'], 'Transfer');
        event.stopWatching();
      }
  });
});





});
