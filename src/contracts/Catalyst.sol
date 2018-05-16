pragma solidity ^0.4.23;

// Users should be able to store bounties on their questions
// Only our server should be able to submit more questions in contention for the bounty
// users should be able to vote on their favorite questions if approved by users
// at a certain time the votes should end and the payout should be payed out to the questions address
// Should there be a different contract for each contract?  Don't know the overhead with making contracts

contract Question {
  
    // by default questions will be open for one day
    uint duration = 1 days;
    uint endTime = uint32(now + duration);

    // the Anwer struct stores information about individual answers submitted. 
    struct Answer {
        // the address the payout will go to should this answer win
        address answerOwner;
        // a unique id identifying the answer.  
        uint16 id;
        // how many upvotes and downvotes a question has
        uint16 upvotes;
        uint16 downvotes;
    }

    // we want to store the answers in an array
    Answer[] public answers;

    function questionEnd() public {
        // conditions
        require(now >= endTime);
        // effects

        // interactions
    }

    // everything below is what gives us ownership of the contract and could be moved to a seperate contract
    // and instead inhereted 
    // this is our address and unique to us
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
