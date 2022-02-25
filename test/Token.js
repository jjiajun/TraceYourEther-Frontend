// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("Token contract", function () {
//   let Token;
//   let hardhatToken;
//   let owner;
//   let addr1;
//   let addr2;
//   let addrs;

//   // 'beforeEach' will run before each test, re-deploying the contract every time. It receives a callback, which can be async

//   this.beforeEach(async function () {
//     Token = await ethers.getContractFactory("Token");
//     [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
//     hardhatToken = await Token.deploy();
//   });

//   describe("Deployment", function () {
//     // 'it' is another Mocha function. This is the one that you use to define your tests.

//     it("Should set the right owner", async function () {
//       expect(await hardhatToken.owner()).to.equal(owner.address); // what other methods are available besides .address?
//     });

//     it("Should assign the total supply of tokens to the owner", async function () {
//       const ownerBalance = await hardhatToken.balanceOf(owner.address); // use contract method to get ownerBalance
//       expect(await hardhatToken.totalSupply()).to.equal(ownerBalance); // compare total supply == ownerBalance
//     });
//   });

//   describe("Transactions", function () {
//     // should transfer token between accounts
//     it("Should transfer token between accounts", async function () {
//       // transfer 100 tokens from owner to addr1
//       await hardhatToken.transfer(addr1.address, 100);
//       const addr1Balance = await hardhatToken.balanceOf(addr1.address);
//       expect(addr1Balance).to.equal(100);

//       // transfer 50 tokens from addr1 to addr2
//       await hardhatToken.connect(addr1).transfer(addr2.address, 50);
//       const addr2Balance = await hardhatToken.balanceOf(addr2.address);
//       expect(addr2Balance).to.equal(50);
//     });

//     // // should fail if sender dont have enough tokens
//     // it("Should fail if sender dont have enough tokens", async function () {});
//     // // should update balance after transfers
//   });
// });
