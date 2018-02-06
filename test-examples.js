beforeEach(async function() {
  await db.clear();
  await db.save([tobi, loki, jane]);
});

describe('#find()', function() {
  it('responds with matching records', async function() {
    const users = await db.find({ type: 'User' });
    users.should.have.length(3);
  });
});

let Gifto = artifacts.require("Gifto");
const assertFail = require("./helpers/assertFail");
const BigNumber = require("bignumber.js");

let giftoDeployed;

contract("Gifto Crowdsale Tests", async function([deployer, investor, vandal, wallet]) {
  beforeEach(async () => {
      giftoDeployed = await Gifto.new();
    });

  it("Can't purchase gifto for less than the minimum buy amount", async () => {
    await giftoDeployed.turnOnSale({ from: deployer });
    await giftoDeployed.addInvestorList([investor], { from: deployer });
    await assertFail(async () => {
    await giftoDeployed.buyGifto({ from: investor, value: web3.toWei(0.1, 'ether') });
    });
  });
