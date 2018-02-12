pragma solidity ^0.4.17;

contract Adoption {

  address[16] public adopters;
  uint[16] public petPrices;

  // Adopting a pet
  function adopt(uint petId) public payable returns (uint) {
    require(petId >= 0 && petId <= 15);
    require(msg.value >= petPrices[petId]);

    adopters[petId] = msg.sender;
    petPrices[petId] = msg.value;

    return petId;
  }

  // Retrieving the adopters
  function getAdopters() public view returns (address[16]) {
    return adopters;
  }

  function getPetPrices() public view returns (uint[16]) {
    return petPrices;
  }

  function getBalance() public view returns(uint){
    return this.balance;
  }


}
