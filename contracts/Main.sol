//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "./ownable.sol";
import "./safemath.sol";

/** We are going to add all the request and transfer logic within this contract */

contract Main is Ownable {

    using SafeMath for uint256;
    using SafeMath32 for uint32;
    using SafeMath16 for uint16;

    event NewRequest(
        uint256 requestId,
        address payeeAddress,
        address payerAddress,
        uint256 amount,
        string description,
        uint256 timestamp
    );

    event NewTransaction(
        uint256 requestId,
        address payeeAddress,
        address payerAddress,
        uint256 amount,
        string description,
        uint256 timestamp
    );

    struct Request {
        address payeeAddress;
        address payerAddress;
        uint256 amount;
        string description;
        uint8 approved; // 0: pending; 1: approved; 2: rejected
        bool completed; // if you approved or rejected, request is counted as completed
        uint256 timestamp;
    }

    // Instantiate array of all the payment requests that exist
    Request[] public requests;

    // to map request ID to the payee address
    mapping(uint256 => address) public requestToPayee;
    // to map request ID to the payer address
    mapping(uint256 => address) public requestToPayer;
    // to map payee to array of request IDs
    mapping(address => uint256[]) payeeToRequestIds;
    // to map payer to array of request IDs
    mapping(address => uint256[]) payerToRequestIds;

    /** 
    1. Creates new request
    2. Push new Request into requests array
    3. Map request to payee and payer address
    4. Mapping...
    3. Emit NewRequest event so that we can retrieve the latest event transactions in future
    */
    function createRequest(
        address _payerAddress,
        uint256 _amount,
        string calldata _description
    ) public {
        /** Push new request into requests array */
        requests.push(
            Request(msg.sender, _payerAddress, _amount, _description, 0, false, block.timestamp)
        );

        uint256 requestId = requests.length - 1;

        /** Map request to payee address*/
        requestToPayee[requestId] = msg.sender;

        /** Map request to payer address*/
        requestToPayer[requestId] = msg.sender;

        /** Map payee to array of request IDs */
        payeeToRequestIds[msg.sender].push(requestId);

        /** Map payer to array of request IDs */
        payerToRequestIds[_payerAddress].push(requestId);

        /** Emit event so that payer can be notified */
        emit NewRequest(
            requestId,
            msg.sender,
            _payerAddress,
            _amount,
            _description,
            block.timestamp // block.timestamp is a uint256 value in seconds since the epoch
        );
    }

    /** Initialize "payees" as array of addresses so that we can use this to pay multiple payees at once */
    address payable[] payees;

    /** Mark request as approved & completed */
    function markAsApproved(uint _requestId) public {
        Request storage myRequest = requests[_requestId];
        require(msg.sender == myRequest.payerAddress);
        address _payeeAddress = myRequest.payeeAddress;
        uint256 _paymentAmount = myRequest.amount;
        string memory _paymentDescription = myRequest.description;

        emit NewTransaction(
            _requestId,
            _payeeAddress,
            msg.sender,
            _paymentAmount,
            _paymentDescription,
            block.timestamp // block.timestamp is a uint256 value in seconds since the epoch
        );
        // sendEther(_requestId);
        /** Everytime a request is approved, update Request.approved as 1 & Request.completed as true */
        myRequest.approved = 1;
        myRequest.completed = true;
    }

    /** Send ether to payee + mark request as approved & completed */
    function markAsRejected(uint _requestId) public {
        Request storage myRequest = requests[_requestId];
        require(msg.sender == myRequest.payerAddress);
        /** Everytime a request is rejected, update Request.approved as 2 & Request.completed as true */
        myRequest.approved = 2;
        myRequest.completed = true;
    }

    /** Insert function to send ether to multiple payees at once */

    /** Get all past transactions by account address */

    /** Get array of request IDs by payer address */
    function getAllPayerRequests(address _payerAddress) public view returns (uint[] memory) {
      return payerToRequestIds[_payerAddress];
    }

    /** Get array of request IDs by payee address */
    function getAllPayeeRequests(address _payeeAddress) public view returns (uint[] memory) {
      return payeeToRequestIds[_payeeAddress];
    }
}
