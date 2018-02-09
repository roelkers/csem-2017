# Exercise 10

Submission deadline: 14.02.2018, end of day

Please extend the Pet Shop DApp http://truffleframework.com/tutorials/pet-shop with the following features:

- Pet adopters need to pay >= 0 Ether to adopt a pet
- Pet adopters can enter an amount of Ether in an input field below the "Adopt" button.
- A pet adoption is only successful if the amount submitted is higher that the current price (initially zero).
- The price that a pet has been sold for is displayed next to the "Adopt" button (initially zero).
- When a pet has been adopted, the payment is transferred to the "Adoption" smart contract.
- The current balance of the "Adoption" smart contract is displayed when the application starts (initially zero) and refreshed after an adoption.

**Hints:**

- Ethereum returns numbers in BigNumber format. To parse a BigNumber object (which has `s`, `c`, and `e` properties), you can execute the `toNumber()` method.
- Payments are denoted in wei when sending a payment to a smart contract. You need to use the `web3.fromWei()` and `web3.toWei()` methods.

**Out of scope:**

- No error handling needed
- No unit tests needed
- Front-end HTML and CSS can be kept simple