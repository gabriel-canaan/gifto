let Gifto = artifacts.require("Gifto");
const assertFail = require("./helpers/assertFail");
const BigNumber = require("bignumber.js");

let giftoDeployed;

contract("Gifto Crowdsale Tests", async function([deployer, investor, vandal, wallet]) {
   beforeEach(async () => {
       giftoDeployed = await Gifto.new();
   });

   it("Can’t purchase gifto for less than the minimum buy amount", async () => {
       await assertFail(async () => {
           await giftoDeployed.MultiSigWallet(0x0,1,{ from: investor, value: web3.toWei(0.1, "ether") });
       });
   });

   it("Only owner can add a new owner", async () => {
     await assertFail(async () => {
       await giftoDeployed.addOwner(!owner)
     });
   });

});
