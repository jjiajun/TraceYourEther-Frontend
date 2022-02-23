const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token contract", function () {
  let Token;
  let hardhatToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  // 'beforeEach' will run before each test, re-deploying the contract every time. It receives a callback, which can be async

  this.beforeEach(async function () {
    Token = await ethers.getContractFactory("Token");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    hardhatToken = await Token.deploy();
  });

  describe("Deployment", function () {
    // 'it' is another Mocha function. This is the one that you use to define your tests.

    it("Should set the right owner", async function () {});
  });

  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("Token");
    const hardhatToken = await Token.deploy();
    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });
});
