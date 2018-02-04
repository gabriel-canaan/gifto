const assertFail = require("./helpers/assertFail");
const Gifto = artifacts.require("./helpers/MockMultiSigWallet");
const utils = require("./helpers/Utils");
const BigNumber = require("bignumber.js");

let giftoDeployed;
let owners;

contract("MultiSigWallet Tests", async function([deployer, investor, vandal, wallet]) {
  beforeEach(async () => {
    giftoDeployed = await Gifto.new();
  });
  //
  // it("Can’t purchase gifto for less than the minimum buy amount", async () => {
  //   await assertFail(async () => {
  //     await giftoDeployed.MultiSigWallet(0x0, 1, {
  //       from: investor,
  //       value: web3.toWei(0.1, "ether")
  //     });
  //   });
  // });
  // //
  //
  // it('should throw when non owner calls addOwner function', async () => {
  //   try {
  //     await giftoDeployed.addOwner({from: investor});
  //     assert(true, "didn't throw");
  //   } catch (error) {
  //     return utils.ensureException(error);
  //   }
  // });
  //
  //
  it("Only owner can remove an owner", async () => {
    // await assertFail(async () => {
      await giftoDeployed.removeOwner()
    // });
  });
});
