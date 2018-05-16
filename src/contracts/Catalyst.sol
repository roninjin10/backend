pragma solidity ^0.4.19;

// Users should be able to store bounties on their questions
// Only our server should be able to submit more questions in contention for the bounty
// users should be able to vote on their favorite questions if approved by users
// at a certain time the votes should end and the payout should be payed out to the questions address

contract Catalyst {
  
    // by default questions will be open for one day
    uint duration = 1 days;
    // uint endTime = uint32(now + cooldownTime);

    // the Anwer struct stores information about individual answers submitted. 
    struct Answer {
        address payout;
        uint id;
        uint qid;
        uint upvotes;
        uint downvotes;
    }

    Answer[] public answers;

    address public owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    // this modifier makes it so some functions can only be called by us
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    // allows us to transfer ownership to a different address should we want to
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0));
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    // constructor function runs when contract is created
    constructor() public {
        owner = msg.sender;
    }
}
