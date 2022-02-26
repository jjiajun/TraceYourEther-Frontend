import { ethers } from "ethers";
import Main from "./artifacts/contracts/main.sol/Main.json";
const mainContractAddress = "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0";

// const [me] = await hre.ethers.getSigners();

/** Request access to wallet - this is needed for transactions that happen on the blockchain */
export async function requestAccount() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
}

/** To get the wallet balance */
export async function getBalance() {
  if (typeof window.ethereum !== "undefined") {
    const [userAddress] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log("account: ", userAddress);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(userAddress);
    // return balance;
    console.log("balance: ", balance.toString());
  }
}

/** To create request
 * @param {string} address
 * @param {number} amount
 * @param {string} description
 */
export async function createRequest(address, amount, description) {
  if (typeof window.ethereum !== "undefined") {
    // request access to wallet
    await requestAccount();
    // set provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // get signer
    const signer = provider.getSigner();
    // get contract. We need to add "signer" as the third argument instead of "provider" in order to enable transaction on the blockchain to take place
    const contract = new ethers.Contract(mainContractAddress, Main.abi, signer);
    console.log("CONTRACT: ", contract);
    // call createRequest method from main.sol
    await contract.createRequest(address, amount, description);
    console.log("CONTRACT: ", contract);
    console.log(`request created (${address}, ${amount}, ${description})`);
  }
}

/** Returns promise with request details
 * Keys: payeeAddress, amount, description, approved, completed
 */
export async function getRequestDetails(id) {
  if (typeof window.ethereum !== "undefined") {
    // request access to wallet
    await requestAccount();
    // set provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // get contract
    const contract = new ethers.Contract(
      mainContractAddress,
      Main.abi,
      provider
    );
    const result = await contract.requests(id);
    // console.log("result:", result);
    return result;
  }
}

/** Returns an array of requestObjs by the payerAddress
 * Each object contains the following keys:
 * payeeAddress, amount, description, approved, completed
 */
export async function getAllRequestsForPayer() {
  if (typeof window.ethereum !== "undefined") {
    // request access to wallet + get address of metamask
    const [userAddress] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log("Address: ", userAddress);
    // set provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // get contract
    const contract = new ethers.Contract(
      mainContractAddress,
      Main.abi,
      provider
    );
    // get array of payer requests
    const allPayerRequests = await contract.getAllPayerRequests(userAddress);
    console.log("allPayerRequests", allPayerRequests);
    // initialize new array to store requestObjs
    const arrayOfRequestObjs = [];
    // loop through array to return array of requestObjs
    for (let i = 0; i < allPayerRequests.length; i += 1) {
      const request = await getRequestDetails(i);
      // create requestObj for each i to push into array
      const requestObj = {
        id: allPayerRequests[i].toNumber(),
        payeeAddress: request.payeeAddress,
        payerAddress: request.payerAddress,
        amount: request.amount.toNumber(),
        description: request.description,
        approved: request.approved,
        completed: request.completed,
      };
      arrayOfRequestObjs.push(requestObj);
    }

    console.log("arrayOfRequestObjs: ", arrayOfRequestObjs);
    return arrayOfRequestObjs;
  }
}

export async function getAllRequestsForPayee() {
  if (typeof window.ethereum !== "undefined") {
    // request access to wallet + get address of metamask
    const [userAddress] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log("Address: ", userAddress);
    // set provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // get contract
    const contract = new ethers.Contract(
      mainContractAddress,
      Main.abi,
      provider
    );
    // get array of payer requests
    const allPayeeRequests = await contract.getAllPayeeRequests(userAddress);
    console.log("allPayeeRequests", allPayeeRequests);
    // initialize new array to store requestObjs
    const arrayOfRequestObjs = [];
    // loop through array to return array of requestObjs
    for (let i = 0; i < allPayeeRequests.length; i += 1) {
      const request = await getRequestDetails(i);
      // create requestObj for each i to push into array
      const requestObj = {
        id: allPayeeRequests[i].toNumber(),
        payeeAddress: request.payeeAddress,
        payerAddress: request.payerAddress,
        amount: request.amount.toNumber(),
        description: request.description,
        approved: request.approved,
        completed: request.completed,
      };
      arrayOfRequestObjs.push(requestObj);
    }

    console.log("arrayOfRequestObjs: ", arrayOfRequestObjs);
    return arrayOfRequestObjs;
  }
}

// Send 1 ether to an address / ens name
export async function approveRequest(requestId) {
  if (typeof window.ethereum !== "undefined") {
    // request access to wallet
    await requestAccount();
    // set provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // get signer
    const signer = provider.getSigner();
    // get contract. We need to add "signer" as the third argument instead of "provider" in order to enable transaction on the blockchain to take place
    const contract = new ethers.Contract(mainContractAddress, Main.abi, signer);

    const requestDetails = await getRequestDetails(requestId);
    const payeeAddress = requestDetails.payeeAddress;
    const amount = requestDetails.amount;

    // await signer.sendTransaction({
    //   to: payeeAddress,
    //   value: ethers.utils.parseEther(amount.toString()),
    // });
    console.log("signer: ", signer);
    await contract.markAsApproved(requestId);
  }
}
