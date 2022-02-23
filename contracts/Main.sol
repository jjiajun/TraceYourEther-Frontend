//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "./ownable.sol";

/** We are going to add all the request and transfer logic within this contract */

contract Main is Ownable {

    event NewRequest(
        uint requestId,
        address payeeAddress,
        address payerAddress,
        uint16 amount,
        string description
    );

    event NewTransaction(
        uint requestId,
        address payeeAddress,
        address payerAddress,
        uint16 amount,
        string description
    );

    struct Request {
        address payeeAddress;
        address payerAddress;
        uint16 amount;
        string description;
        bool completed;
    }

    // Instantiate array of all the payment requests that exist
    Request[] public requests;

    // to map request ID to the payee address
    mapping (uint => address payable) public requestToPayee;
    // to map request ID to the payer address
    mapping (uint => address payable) public requestToPayer;
    // to map payee to array of request IDs
    mapping (address => uint[]) payeeToRequestIds;
    // to map payer to array of request IDs
    mapping(address => uint[]) payerToRequestIds;

    /** 
    1. Creates new request
    2. Push new Request into requests array
    3. Map request to payee and payer address
    4. Push request ID into 
    3. Emit NewRequest event so that we can retrieve the latest event transactions in future
    */
    function _createRequest(
        address _payerAddress,
        uint16 _amount,
        string _description
    ) internal {
        /** Push new request into requests array */
        uint requestId = requests.push(Request(
            msg.sender,
            _payerAddress, 
            _amount, 
            _description,
            false
        )) - 1;

        /** Map request to payee address*/
        requestToPayee[requestId] = msg.sender;

        /** Map request to payer address*/
        requestToPayer[requestId] = msg.sender;

        /** Map payee to array of request IDs */
        payeeToRequestIds[msg.sender].push(requestId);

        /** Map payer to array of request IDs */
        payerToRequestIds[msg.sender].push(requestId);

        /** Emit event so that payer can be notified */
        emit NewRequest(
            requestId, 
            msg.sender,
            _payerAddress, 
            _amount, 
            _description
        );
    }

    /** Initialize "payees" as array of addresses so that we can use this to pay multiple payees at once */ 
    address payable[] payees;

    /** Function to send predetermined amt of Ether to payee based on requestId */
    function sendEther(uint _requestId) external payable {
        uint _payeeAddress = requestToPayee[_requestId]; // payee address payable
        uint _paymentAmount = requests[_requestId].amount;
        require(msg.value == _paymentAmount ether); // NEED TO FIGURE THIS OUT
        uint _paymentDescription = requests[_requestId].description;
        _payeeAddress.transfer(msg.value);
        emit NewTransaction(
            _requestId,
            _payeeAddress
            msg.sender,
            _paymentAmount,
            _paymentDescription

        )
    };



    /** Listing all the methods I need to create for MVP
    1. Get balanceOf of User // NO NEED - will be done on ethers.js
    2. Make mapping (uint => PaymentRequest) userToPayment // DONE
`   4. When a payment request is made to someone, paymentRequests.push(PaymentRequest(_name, _requestAmount, _requestDescription)) // DONE
    5. Get all payment requests by address // DONE
    6. initialize "recipients" as array of address i.e. address payable[] recipients // DONE
    6. Transfer eth to receiver 
    i.e. function sendEther(address payable recipient, uint amount) external payable {
        recipient.transfer( amount ether)
    } // DONE
    7. Emit event whenever transaction take place // DONE
    8. Get all past transactions by account address
    9. Everytime a new request is fired, update payment request by requestee
     */

    // string private greeting;

    // constructor(string memory _greeting) {
    //     console.log("Deploying a Greeter with greeting:", _greeting);
    //     greeting = _greeting;
    // }

    // function greet() public view returns (string memory) {
    //     return greeting;
    // }

    // function setGreeting(string memory _greeting) public {
    //     console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
    //     greeting = _greeting;
    // }
}
