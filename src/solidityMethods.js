import { ethers } from "ethers";
import Main from "./artifacts/contracts/Main.sol/Main.json"; // need to update this whenever you deploy the contract
import { DateTime } from "luxon";
const mainContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

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
    const intBalance = parseInt(balance);
    console.log("balance: ", intBalance);
    return { userAddress, intBalance };
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
    console.log("address: ", address);
    await contract.createRequest(address.toLowerCase(), amount, description);
    console.log("CONTRACT: ", contract);
    console.log(`request created (${address}, ${amount}, ${description})`);
  }
}
// 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
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
    console.log(userAddress);
    // get array of payer requests
    const allPayerRequests = await contract.getAllPayerRequests(userAddress);
    console.log("allPayerRequests", allPayerRequests);
    // initialize new array to store requestObjs
    const arrayOfRequestObjs = [];
    // loop through array to return array of requestObjs
    for (let i = 0; i < allPayerRequests.length; i += 1) {
      const request = await getRequestDetails(allPayerRequests[i]);
      // convert timestamp to UTCString()
      const timestamp = request.timestamp;
      const newDate = new Date();
      newDate.setTime(Number(timestamp) * 1000);
      const dateString = `${newDate.toLocaleDateString(
        "en-SG"
      )} ${newDate.toLocaleTimeString("en-SG", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
      //const dateString =DateTime.fromISO(newDate)
      // create requestObj for each i to push into array
      const requestObj = {
        id: allPayerRequests[i].toNumber(),
        payeeAddress: request.payeeAddress,
        payerAddress: request.payerAddress,
        amount: request.amount.toNumber(),
        description: request.description,
        approved: request.approved,
        completed: request.completed,
        timestamp: dateString,
        noOfSecSinceEpoch: request.timestamp.toNumber(),
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
    // get array of payee requests
    const allPayeeRequests = await contract.getAllPayeeRequests(userAddress);
    console.log("allPayeeRequests", allPayeeRequests);
    // initialize new array to store requestObjs
    const arrayOfRequestObjs = [];
    // loop through array to return array of requestObjs
    for (let i = 0; i < allPayeeRequests.length; i += 1) {
      const request = await getRequestDetails(allPayeeRequests[i]);
      // convert timestamp to UTCString()
      const timestamp = request.timestamp;
      const newDate = new Date();
      newDate.setTime(timestamp * 1000);
      // const dateString = newDate.toUTCString();
      const dateString = `${newDate.toLocaleDateString(
        "en-SG"
      )} ${newDate.toLocaleTimeString("en-SG", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
      // create requestObj for each i to push into array
      const requestObj = {
        id: allPayeeRequests[i].toNumber(),
        payeeAddress: request.payeeAddress,
        payerAddress: request.payerAddress,
        amount: request.amount.toNumber(),
        description: request.description,
        approved: request.approved,
        completed: request.completed,
        timestamp: dateString,
        noOfSecSinceEpoch: request.timestamp.toNumber(),
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
    const requestDetails = await getRequestDetails(requestId);
    console.log("requestDetails: ", requestDetails);
    const payerAddress = requestDetails.payerAddress;
    const payeeAddress = requestDetails.payeeAddress;
    const amount = requestDetails.amount;

    // get address of user
    const [userAddress] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    // set provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // log that user is incorrect and break the code here
    if (userAddress.toLowerCase() !== payerAddress.toLowerCase()) {
      console.log("You are not the correct payer");
      return;
    }
    // get signer
    const signer = provider.getSigner();
    // get contract. We need to add "signer" as the third argument instead of "provider" in order to enable transaction on the blockchain to take place
    const contract = new ethers.Contract(mainContractAddress, Main.abi, signer);
    // send x esther to payee address
    await signer.sendTransaction({
      to: payeeAddress,
      value: ethers.utils.parseEther(amount.toString()),
    });
    // mark request.approved = 1, mark request.completed = true
    await contract.markAsApproved(requestId);
    console.log("Request approved");
  }
}

// Reject request - mark request as rejected
export async function rejectRequest(requestId) {
  if (typeof window.ethereum !== "undefined") {
    const requestDetails = await getRequestDetails(requestId);
    // Get payerAddress to verify if user is the payer of this request
    const payerAddress = requestDetails.payerAddress;
    // get address of user + request access to wallet
    const [userAddress] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    // log that user is incorrect and break the code here
    if (userAddress.toLowerCase() !== payerAddress.toLowerCase()) {
      console.log("You are not the correct payer");
      return;
    }
    // set provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // get signer
    const signer = provider.getSigner();
    // get contract. We need to add "signer" as the third argument instead of "provider" in order to enable transaction on the blockchain to take place
    const contract = new ethers.Contract(mainContractAddress, Main.abi, signer);
    // mark request.approved = 2, mark request.completed = true;
    await contract.markAsRejected(requestId);
  }
}
