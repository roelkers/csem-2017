pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Adoption.sol";

contract TestAdoption {
  Adoption adoption = Adoption(DeployedAddresses.Adoption());

  function testInitialBalanceIsZero() public {
    uint balance = adoption.getBalance();

    uint expected = 0;

    Assert.equal(balance, expected, "Initial Contract Balance should be 0 ETH");
  }

  function testInitialAdoptersAreZero(){
    address[16] memory adopters = adoption.getAdopters();

    for(int i = 0; i<16; i++){
      Assert.equal(adopters[i],'0x0000000000000000000000000000000000000000',"Initial adopter adress should be zero.");
    }
  }

  function testUserCanAdoptPet() public {
    uint returnedId = adoption.adopt(8);

    uint expected = 8;

    Assert.equal(returnedId, expected, "Adoption of pet ID 8 should be recorded.");
  }

  // Testing retrieval of a single pet's owner
  function testGetAdopterAddressByPetId() public {
    // Expected owner is this contract
    address expected = this;

    address adopter = adoption.adopters(8);

    Assert.equal(adopter, expected, "Owner of pet ID 8 should be recorded.");
  }

  function testInitialPetPricesZero() public {

    uint[16] memory petPrices = adoption.getPetPrices();

    uint expected = 0;

    Assert.equal(petPrices[0], expected, "Initial pet price should be 0 ETH");
  }
  /*
  function testAdoptAndPetPriceChanged() {

    uint returnedId = adoption.send(8);

    uint expected = 8;

    Assert.equal(returnedId, expected, "Adoption of pet ID 8 should be recorded.");
  }*/
}
