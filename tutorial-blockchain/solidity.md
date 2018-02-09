<!-- page_number: true -->
<!-- footer: AEC 2017 | Tai, Klems, Eberhardt | ise.tu-berlin.de -->

# Smart Contract Development - Agenda

- Interactive Introduction
- The Ethereum Virtual Machine
- Programming Solidity
- Tooling

---

# Ethereum
- Blockchain Implementation
- Supports complex Smart Contracts
- Ethereum Virtual Machine executes these Smart Contracts
- The code executed is low level EVM code
- For usability, higher level programming languages which compile to EVM code have been developed
	- Solidity
	- Serpent
	- LLL

*Analogy: Java code compiles to Java Bytecode which is executed by the Java Virtual Machine*

---

# Interactive Introduction
An introduction to Solidity Smart Contracts for Ethereum

---

## Introduction - Contract with Storage

```
pragma solidity ^0.4.0;

contract SimpleStorage {
    uint storedData;

    function set(uint x) {
        storedData = x;
    }

    function get() constant returns (uint) {
        return storedData;
    }
}
```

---

## Introduction - Contracts

A contract in the sense of Solidity is
- a collection of code (its functions) and
- data (its state) that
- resides at a specific address on the Ethereum blockchain.

---

## Interactive Introduction to Remix

https://ethereum.github.io/browser-solidity/

<!--
## Introduction - Greeter Contract

```
contract greeter{
    /* define variable greeting of the type string */
    string greeting;
    /* this runs when the contract is executed */
    function greeter(string _greeting) public {
        greeting = _greeting;
    }
    /* main function */
    function greet() constant returns (string) {
        return greeting;
    }
}
```
---
## Introduction - Greeter with Inheritance

```
contract mortal {
    /* Define variable owner of the type address*/
    address owner;
    /* this function is executed at initialization and sets the owner of the contract */
    function mortal() { owner = msg.sender; }
    /* Function to recover the funds on the contract */
    function kill() { if (msg.sender == owner) selfdestruct(owner); }
}
contract greeter is mortal {
    /* define variable greeting of the type string */
    string greeting;
    /* this runs when the contract is executed */
    function greeter(string _greeting) public {
        greeting = _greeting;
    }
    /* main function */
    function greet() constant returns (string) {
        return greeting;
    }
}
```
-->

---

# The EVM
- Ethereum Virtual Machine is the runtime for Smart Contracts
- Virtual Machine that runs on every node in the network
- Isolated, no network or filesystem access to ensure determinism
- Account-based Transaction Model

---

## Accounts

Two types of accounts
- External Accounts: Controlled by Keypair
- Contract Accounts: Controlled by contract code stored

Both types are treated equally by the EVM

---

## Transactions

- A transaction is a message that is sent from one account to another account
- It always originates from an external account
- It can include binary data (its payload) and Ether
- If the target account is the the account with the address 0, the transaction creates a new contract

---

## Gas

- Upon creation, each transaction is charged with a certain amount of gas
	- purpose is to limit the amount of work that is needed to execute the transaction and to pay for this execution
	- While the EVM executes the transaction, the gas is gradually depleted according to specific rules

- The gas price is a value set by the creator of the transaction
	- she has to pay `gas_price * gas` up front from the sending account.
	- if some gas is left after the execution, it is refunded

- If the gas is used up at any point an out-of-gas exception is triggered, which reverts all modifications made to the state

---

## Storage, Memory and the Stack

- Each account has persistent memory called storage
	- key-value store
	- maps 256 bit words to 256 bit words
	- Access relatively costly
	- Contract only have access to its own storage

- A contract can use volatile memory during execution
	- cleared instance for each message call
	- linear and byte addressable
	- Cheap access

- EVM uses a stack internally during contract execution
	- Max size of 1024 elements, contains words of 256 bits

---

## Instruction Set

- Minimal instruction set to avoid incorrect implementations
	- Arithmetic, bit, logical and comparison operations
	- Conditional and unconditional jumps
	- Operations to access blockchain properties (e.g., block number, timestamp)
- All instructions operate on the basic data type, 256-bit words

---

## Message Calls

-  Contracts can send Messages to other contracts
	- call other contracts
	- send Ether to external accounts

- Messages are virtual objects that exist only inside the EVM

- Similarity to Transactions
	- have source, target, data payload, Ether, gas and return data 	
	- every transaction consists of a top-level message call
	- this message call can in turn create further message calls

---

# Programming Solidity
Introduction based on the official documentation
https://solidity.readthedocs.io

---
## Overview

Smart Contract programming language designed to target the Ethereum Virtual Machine (EVM)

- Contract-oriented high level language
- Syntax similar to JavaScript, allthough with types
- Statically typed, supports inheritance, libraries, and complex user-defined types

---

## Solidity Source File Layout

- Solidty source files can contain include and pragma directives, comments, and an arbitrary number of contract definitions,


- Single-line comments `(//)` and multi-line comments `(/*...*/)` are possible


- Should specify a version pragma to specify compatible compiler versions *(expressions as in npm)*
```
pragma solidity ^0.4.0; // version between 0.4.0 and 0.5.0
```
- Can import other source files
```
import "filename"; // imports all global symbols
import * as symbolName from "filename"; // names the import
```

---
## Structure of a Contract

- Similar to classes in object-oriented languages.
- Each contract can contain declarations of
	- State Variables
	- Functions
	- Function Modifiers
	- Events
	- Structs Types
	- Enum Types
- Contracts can inherit from other contracts.

---

### State Variables

State variables are values which are permanently stored in contract storage.
```
pragma solidity ^0.4.0;

contract SimpleStorage {
    uint storedData; // State variable
    // ...
}
```
---

### Functions

Functions are the executable units of code within a contract.

```
pragma solidity ^0.4.0;

contract SimpleAuction {
    function bid() payable { // Function accepting payments
        // ...
    }
}
```

---
### Function Modifiers

Function modifiers can be used to attach conditions to functions

```
pragma solidity ^0.4.11;

contract Purchase {
    address public seller;

    modifier onlySeller() { // Modifier
        require(msg.sender == seller);
        _;
    }

    function abort() onlySeller { // Modifier usage
        // ...
    }
}
```
---

### Events

Components outside of the EVM can be notified via Events

```
pragma solidity ^0.4.0;

contract SimpleAuction {
	// Event
    event HighestBidIncreased(address bidder, uint amount);

    function bid() payable {
        // ...

        // Triggering event
        HighestBidIncreased(msg.sender, msg.value);
    }
}
```

---

### Structs Types

Structs are custom defined types that can group several variables

```
pragma solidity ^0.4.0;

contract Ballot {
    struct Voter { // Struct
        uint weight;
        bool voted;
        address delegate;
        uint vote;
    }
}
```

---

### Enum Types

Enums can be used to create custom types with a finite set of values

```
pragma solidity ^0.4.0;

contract Purchase {
    enum State { Created, Locked, Inactive } // Enum
}
```

---

## Types

- Solidity is statically typed. Hence, the type of all variables (state and local) have to be specified at compile time
- Solidity provides several elementary types which can be combined to form complex types

Hereafter, we cover
- value types
- reference types

---

## Value Types

These types are also called value types because variables of these types will always be passed by value, i.e. they are always copied when they are used as function arguments or in assignments

#### Boolean
`bool`: The possible values are constants `true` and `false`

*Operators*
`!`, `&&`, `||`, `==`, `!=`

---

## Value Types

#### Integers
`int` / `uint`: Signed and unsigned integers of various sizes.

- Keywords uint8 to uint256 and int8 to int256 in steps of 8 (unsigned and signed of 8 up to 256 bits)
- `uint` and `int` are aliases for `uint256` and `int256`

*Operators*

Comparisons: `<=`, `<`, `==`, `!=`, `>=`, `>`
Bit operators: `&`, `|`, `^` (bitwise exclusive or), ~ (bitwise negation)
Arithmetic operators: `+`, `-`, `*`, `/`, `%`, `**`, `<<`, `>>`

---

## Value Types

#### Address

`address`: Holds a 20 byte value (size of an Ethereum address).

The *address* type serves as the base for all contracts, which hence contain all members

*Operators*
`<=`, `<`, `==`, `!=`, `>=` and `>`

*Members*
`balance` (property)
`transfer`, `send` to transfer value (functions)
`call`, `delegatecall` to call contracts

---

## Value Types

#### Function Type

```
function (<parameter types>) {internal|external}
[constant] [payable] [returns (<return types>)]
```

*Input Parameters*
Declared like variables

*Output Parameters*
	- Declared after returns keyword
	- Names can be omitted
	- Initialized to zero
	- Multiple values can be returned as tuple

---
#### Function Type

*Internal Functions*
- Functions are internal by default
- Internal functions can only be used inside the current contract, cannot be executed outside of the context of the current contract

*External Functions*
- External functions can be passed via and returned from external function calls. They consist of an address and a function signature

---

#### Function Type

*Payable*
- Marker which allows the function to receive value
- Without that marker, the function throws an exception on receiving value

*Constant*
- Functions declared constant promise not to modify the state
- This makes execution very efficient, since it can occur locally

---

## Reference Types - Data Location
Complex types, i.e. types which do not always fit into 256 bits have to be handled more carefully than the value-types we have already seen

Since copying them can be quite expensive, we have to think about whether we want them to be stored in memory (which is not persisting) or storage

Depending on the context, there is always a default, but it can be overridden by appending either `storage` or `memory` to the type
- The default for function parameters (including return parameters) is `memory`
- the default for local variables is `storage` and the location is forced to `storage` for state variables (obviously)
---

## Reference Types

#### Arrays
An array is written as
- T[k] is case of fixed size `k` and element type `T`
- T[] in case of dynamic size and element type `T`

- Variables of type 'bytes' and 'string' are special arrays
`string`: dynamically-sized array storing UTF-8-encoded string

*Members*
- `.length` member to hold the number of elements
-  Dynamic storage arrays can be resized by assigning `.length`. The `push` function can be used to append an element to such an array

---


## Reference Types

#### Structs
- Structs can be used to define new types based on other types
- A struct cannot a member of its own type

```
contract CrowdFunding {
    // Defines a new type with two fields.
    struct Funder {
        address addr;
        uint amount;
    }
    struct Campaign {
        address beneficiary;
        uint fundingGoal;
        uint numFunders;
        uint amount;
        mapping (uint => Funder) funders;
    }
}
```

---

## Reference Types

#### Mappings
Mapping types are declared as `mapping(_KeyType => _ValueType)`

- `_KeyType` can be any type except for a mapping, a dynamically sized array, a contract, an enum and a struct.
- `_ValueType` can be any type, including mappings

Mappings are not iterable!

---

## Units and Globally Available Variables
- Ether units as number literal suffix: `wei`, `finney`, `szabo` or `ether`
- Time Units as number literal suffix: `seconds`, `minutes`, `hours`, `days`, `weeks` and `years`

*Select Special Variables and Functions*
- `msg.sender(address)`: sender of the message (current call)
- `msg.value(uint)`: number of wei sent with the message
- `assert(bool condition)`: throws if the condition is not met.
- `keccak256(...) returns (bytes32)`:compute the Ethereum-SHA-3 (Keccak-256) hash of the arguments
- `selfdestruct(address recipient)`: destroy the current contract, sending its funds to the given Address

---

## Control Structures

- Most of the control structures from JavaScript are available in Solidity except for `switch` and `goto`
- So there is:
`if`, `else`, `while`, `do`, `for`, `break`, `continue`, `return`, `?:`,
with the usual semantics known from C or JavaScript.
- Parentheses can not be omitted for conditionals, but curly brances can be omitted around single-statement bodies.

---

## Scoping and Declarations

- Variables are initialized with an initial default value whose byte-representation is all zeros
  - The default value for a `bool` is `false`
  - The default value for the `uint` or `int` types is `0`
  - For dynamically-sized arrays, `bytes` and `string`, the default value is an empty array or string.
- A variable declared anywhere within a function will be in scope for the entire function, regardless of where it is declared.
This happens because Solidity inherits its scoping rules from JavaScript.

---
## Function Calls

```
name(<parameter types>)
```


*Internal Function Calls*
 - Only functions in the same contract can be called internally
 - Function access by name, e.g. `funct()`
 - Simple jumps inside the EVM, memory not cleared


*External Function Calls*
- Called via a message call, not a jump
- Function access by reference, e.g. `this.funct()`
- Functions of other contracts have to be called externally


---

## Exceptions
- `throw` instruction can be used to throw an exception manually
- in case of an exception, the currently executing call is stopped and reverted.
- the exception is also “bubbled up” through function calls
- catchting exceptions is not yet possible
- Solidity automatically generates runtime exceptions in many exceptional situations
- `assert` can be used to throw if a condition is not met, should be used for internal conditions
- `require` throws when called with an argument which evaluates to false, should be used to check input

---

## Function Visibility

Functions visibility is `public` by default, but it can be specified as

`external`: External functions are part of the contract interface, which means they can be called from other contracts and via transactions. An external function f cannot be called internally. External functions are sometimes more efficient when they receive large arrays of data.

`public`: Public functions are part of the contract interface and can be either called internally or via messages.

`internal`: Those functions can only be accessed internally (i.e. from within the current contract or contracts deriving from it), without using this.

`private`: Private state variables are only visible for the contract they are defined in and not in derived contracts.

---

## State Variable Visibility

For state variables, external is not possible and the default is internal.

`public`: For public state variables, an automatic getter function is generated.

`internal`: Those state variables can only be accessed internally (i.e. from within the current contract or contracts deriving from it), without using this.

`private`: Private state variables are only visible for the contract they are defined in and not in derived contracts.

---

## Contracts
#### Contract Creation

Contracts can be created
- “from outside” using an API or
- from Solidity contracts.

When a contract is created, its constructor (a function with the same name as the contract) is executed once.

A constructor is optional. Only one constructor is allowed, and this means overloading is not supported.

---

## Contracts
### Function Modifiers

Function modifiers can be used to attach conditions to functions

```
contract Purchase {
    address public seller;

    modifier onlySeller() { // Modifier
        require(msg.sender == seller);
        _;
    }

    function abort() onlySeller { // Modifier usage
        // ...
    }
}
```
Multiple modifiers are applied to a function by specifying them in a whitespace-separated list and are evaluated in the order presented.

---

## Contracts
### Constant State Variables

State variables can be declared as `constant`.
In this case, they have to be assigned from an expression which is a constant at compile time

```
pragma solidity ^0.4.0;

contract C {
    uint constant x = 32**22 + 8;
    string constant text = "abc";
    bytes32 constant myHash = keccak256("abc");
}
```

---

## Contracts
### Fallback Function

- A contract can have exactly one unnamed function
- This function cannot have arguments and cannot return anything
- It is executed on a call to the contract if none of the other functions match the given function identifier (or if no data was supplied at all)
- Furthermore, this function is executed whenever the contract receives plain Ether (without data).
- Contracts that receive Ether but do not define a payable fallback function throw an exception, sending back the Ether

---

## Contracts
### Events

Components outside of the EVM can be notified via Events
For example, can be used to call Javascript Callbacks

Events are inheritable members of contracts

```
contract SimpleAuction {
	// Event
    event HighestBidIncreased(address bidder, uint amount);

    function bid() payable {
        // ...

        // Triggering event
        HighestBidIncreased(msg.sender, msg.value);
    }
}
```

---



## Contracts
### Inheritance

- Solidity supports multiple inheritance by copying code including polymorphism.

- When a contract inherits from multiple contracts, only a single contract is created on the blockchain, and the code from all the base contracts is copied into the created contract.

```
contract A is B {
...
}
```

- Derived contracts can access all non-private members
 including internal functions and state variables. These
 cannot be accessed externally via `this`, though.

---

## Contracts
### Abstract Contracts

Contract functions can lack an implementation (terminated by `;)`

```
contract Feline {
    function utterance() returns (bytes32);
}
```
Such contracts cannot be compiled but used as base contracts

```
contract Cat is Feline {
    function utterance() returns (bytes32) { return "miaow"; }
}
```
If a contract inherits from an abstract contract and does not implement all non-implemented functions by overriding, it will itself be abstract.

---

## Contracts
### Interfaces

Interfaces are denoted by their own keyword:
```
interface Token {
    function transfer(address recipient, uint amount);
}
```

Interfaces are similar to abstract contracts, but they cannot have any functions implemented. There are further restrictions:

- Cannot inherit other contracts or interfaces
- Cannot define a constructor
- Cannot define variables
- Cannot define structs or enums
---

## Contracts
### Libraries

Libraries are similar to contracts, but their purpose is that they are deployed only once at a specific address and their code is reused

This means that if library functions are called, their code is executed in the context of the calling contract, i.e. `this` points to the calling contract, and especially the storage from the calling contract can be accessed

As a library is an isolated piece of source code, it can only access state variables of the calling contract if they are explicitly supplied (it would have no way to name them, otherwise)

---
## Contracts
### Libraries Example

```
library Math {
    // Computes the modular exponential (x ** k) % m.
    function modExp(uint x, uint k, uint m) returns (uint r) {
        r = 1;
        for (uint s = 1; s <= k; s *= 2) {
            if (k & s != 0)
                r = mulmod(r, x, m);
            x = mulmod(x, x, m);
        }
    }
}
```

---

## Contracts
### Using For

- The directive `using A for B;` can be used to attach library functions (from the library `A`) to any type (`B`)
- These functions will receive the object they are called on as their first parameter

**Example**

```
library Search {
    function indexOf(uint[] storage self, uint value) returns (uint) {
        for (uint i = 0; i < self.length; i++)
            if (self[i] == value) return i;
        return uint(-1);
    }
}
```

---

### Using For
**Example Continued**

```
contract C {
    using Search for uint[];
    uint[] data;

    function append(uint value) {
        data.push(value);
    }
    function replace(uint _old, uint _new) {
        // This performs the library function call
        uint index = data.indexOf(_old);
        if (index == uint(-1))
            data.push(_new);
        else
            data[index] = _new;
    }
}
```

---

# Tooling
- solc - Solidity compiler
- Running a node
- Interfacing with a node
- IDEs
- Frameworks

---

## solc - Solidity Compiler
Compiler for Solidity Code

*Install*
```
npm install -g solc
```
*Usage*
```
solc --help
```
*Compile*
```
solc --bin sourceFile.sol
```
---

## Smart Contract ABIs
- Contracts have an Application Binary Interface
- Defines method signatures and encoding of data types
- Determines the encoding of requests to and responses from deployed contracts
	- API is souce code level definition
	- ABI is machine code level definition
- ABI needs to be known to bind deployed contracts
---

## ABI Example
```
======= greeter =======
Contract JSON ABI
[{"constant":false,"inputs":[],"name":"kill",
  "outputs":[],"payable":false,"type":"function"},
  {"constant":true,"inputs":[],"name":"greet",
  "outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},
  {"inputs":[{"name":"msg","type":"string"}],"payable":false,"type":"constructor"}]
```

---

## Ethereum Clients
- Several client implementations following the [Ethereum Yellowpaper](https://ethereum.github.io/yellowpaper/paper.pdf).
  - Go Client - ["geth"](https://github.com/ethereum/go-ethereum)
  - Rust Client - ["parity"](https://github.com/paritytech/parity)
  - C++ Client - ["cpp-ethereum"](https://github.com/ethereum/cpp-ethereum)
  - ...

- Support Multiple Networks
	- Public Ethereum Network
	- Public Test Network
	- Private Networks

---

## Local Test Client

[Testrpc](https://github.com/ethereumjs/testrpc) - Ethereum client for local testing and development

*Install*
```
npm install -g ethereumjs-testrpc
```
*Run*
```
testrpc
```
---

## Interfacing with Smart Contracts

Ethereum Clients provide JSON-RPC API
- Exposes
- Standard JSON as data format
- Transfer agnostic: supports Sockets, HTTP, websockets, ...

```
// Example - Retrieving accounts owned by a client

// Request
curl -X POST --data '{"jsonrpc":"2.0",
"method":"eth_accounts","params":[],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
}
```

---

## Libraries
Several Wrapper-Libraries for convenient use
- [web3.js Javascript Library](https://github.com/ethereum/web3.js)
- [Go-bindings](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)
- [Python RPC Client](https://github.com/ConsenSys/ethjsonrpc)
- ...

---

## Web3 Setup

*Installation*
```
npm install web3
```
*Usage*

```
// import web3 API
var Web3 = require('web3');
// instanciate
var web3 = new Web3();
// link with local ethereum node
web3.setProvider(new web3.providers.HttpProvider());
```

---

## Web3 Example

*Retrieving an account's balance*

```
var balance = web3.eth.getBalance("0x40d6734...3a");

console.log(balance); // instanceof BigNumber
console.log(balance.toString(10)); // '1000000000000'
console.log(balance.toNumber()); // 1000000000000
```

---

## Web3 Contract Deployment

```
var msg = "Hello students";

// Specify Application Binary Interface (ABI)
var greeterContract =
web3.eth.contract([{"constant":false,"inputs":[],"name":"kill",
"outputs":[],"payable":false,"type":"function"},...]);

// Deploy contract
var greeter = greeterContract.new(
   msg, {
     from: web3.eth.accounts[0],
     data: '0x6060604052341561...70029', gas: '4700000'
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' +
	         contract.address;
         console.log(contract.greet());
    }
 })
```

---

## Development Environments
- Remix (Browser-Solidity)
- Atom, Emacs and Vim Plugins
- IntelliJ IDEA Plugin
- Visual Studio Extension

---

## Frameworks
Several frameworks for smart contract development with different functionalities

- Webpack-based Project
- OpenZeppelin
- Truffle
- Embark
- dApple
