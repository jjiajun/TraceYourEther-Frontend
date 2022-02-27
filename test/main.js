const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

describe("Main contract", function () {
  let Main;
  let mainContract;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  // 'beforeEach' will run before each test, re-deploying the contract every time. It receives a callback, which can be async

  this.beforeEach(async function () {
    Main = await ethers.getContractFactory("Main");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    mainContract = await Main.deploy();
    // done in deploy.js
  });

  describe("Deployment", function () {
    // 'it' is another Mocha function. This is the one that you use to define your tests.

    it("Should console.log everything I want to see", async function () {
      console.log("OWNER: ", owner);
      await mainContract.createRequest(
        addr2.address,
        1,
        "requesting 1 eth to test"
      );

      await mainContract.createRequest(
        addr2.address,
        2,
        "requesting 2 eth to test"
      );

      await mainContract
        .connect(addr1)
        .createRequest(addr2.address, 3, "requesting 3 eth to test");

      /** Returns promise with request details
       * Keys: payeeAddress, amount, description, approved, completed
       */
      async function getRequestDetails(id) {
        result = await mainContract.requests(id);
        // console.log("result:", result);
        return result;
      }

      /** Returns an array of requestObjs by the payerAddress
       * Each object contains the following keys:
       * payeeAddress, amount, description, approved, completed
       */
      async function getAllRequestsByPayer(payerAddress) {
        /** get array of requestIds by payerAddress */
        const allPayerRequests = await mainContract.getAllPayerRequests(
          payerAddress
        );
        // initialize new array to store requestObjs
        const arrayOfRequestObjs = [];
        // loop through array to return array of requestObjs
        for (let i = 0; i < allPayerRequests.length; i += 1) {
          const request = await getRequestDetails(i);
          const requestObj = {
            id: allPayerRequests[i].toNumber(),
            payeeAddress: request.payeeAddress,
            amount: request.amount.toNumber(),
            description: request.description,
            approved: request.approved,
            completed: request.completed,
          };
          // console.log(requestObj);
          arrayOfRequestObjs.push(requestObj);
        }
        return arrayOfRequestObjs;
      }
      // const array2 = await getAllRequestsByPayer(addr2.address);
      const array2 = await getAllRequestsByPayer(addr2.address);

      console.log("array2", array2);
    });
  });

  describe("Transactions", function () {
    it("Should transfer eth between accounts", async function () {
      // owner request 1 eth from addr2
      await mainContract.createRequest(
        "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc",
        999,
        "requesting 999 eth to test"
      );

      // Get balance of owner's account
      const provider = waffle.provider;
      const ownerBalance = await provider.getBalance(owner.address);

      console.log("OWNER BALANCE: ", ownerBalance);

      // Get ID of request by payer address
      const arrayOfRequests = await mainContract.getAllPayerRequests(
        addr2.address
      );
      console.log(arrayOfRequests);

      /** Returns promise with request details
       * Keys: payeeAddress, payerAddress, amount, description, approved, completed
       */
      async function getRequestDetails(id) {
        result = await mainContract.requests(id);
        // console.log("result:", result);
        return result;
      }

      // Send 1 ether to an address / ens name.
      async function approveRequest(requestId) {
        const requestDetails = await getRequestDetails(requestId);
        const payeeAddress = requestDetails.payeeAddress;
        const amount = requestDetails.amount;

        await payer.sendTransaction({
          to: payeeAddress,
          value: ethers.utils.parseEther(amount.toString()),
        });
        // console.log("mainContract: ", mainContract);
        // console.log("mainContract.address: ", mainContract.address);
        // console.log("addr2.address: ", addr2.address);
        await mainContract.markAsApproved(requestId);
      }

      await approveRequest(0);

      const ownerBalance2 = await provider.getBalance(owner.address);

      console.log("OWNER BALANCE AFTER TRF: ", ownerBalance2);

      // Send 1 ether to an address / ens name.
      async function rejectRequest(requestId) {
        await mainContract.markAsRejected(requestId);
      }
    });
  });
});
