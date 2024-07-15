# SimpleAccount and SimpleAccountFactory Contracts

## Description

The SimpleAccount and SimpleAccountFactory contracts are smart contracts written in Solidity that allow for the creation and management of smart contract wallets. These contracts are part of the Account Abstraction (EIP-4337) implementation.

### Features

* SimpleAccount: A smart contract wallet that can execute transactions and manage funds.
* SimpleAccountFactory: A factory contract for creating SimpleAccount instances.
* Compatibility with EIP-4337 EntryPoint contract.
* User operation validation and execution.

### Main Contracts

* SimpleAccount: The smart contract wallet implementation.
* SimpleAccountFactory: Factory contract for creating SimpleAccount instances.

### Key Functions

#### SimpleAccount

* `execute(address dest, uint256 value, bytes calldata func)`: Executes a transaction from the account.
* `executeBatch(address[] calldata dest, uint256[] calldata value, bytes[] calldata func)`: Executes a batch of transactions.
* `initialize(address anOwner)`: Initializes the account with an owner.
* `validateUserOp(UserOperation calldata userOp, bytes32 userOpHash, uint256 missingAccountFunds)`: Validates a user operation.
* `getDeposit()`: Returns the account's deposit in the EntryPoint.
* `addDeposit()`: Adds to the account's deposit in the EntryPoint.
* `withdrawDepositTo(address payable withdrawAddress, uint256 amount)`: Withdraws from the account's deposit.

#### SimpleAccountFactory

* `createAccount(address owner, uint256 salt)`: Creates a new SimpleAccount instance.
* `getAddress(address owner, uint256 salt)`: Computes the counterfactual address of an account.

## Getting Started

### Executing program

To run this program, you can use Remix, an online Solidity IDE. To get started, go to the Remix website at https://remix.ethereum.org/.

Once you are on the Remix website, create new files for SimpleAccount.sol and SimpleAccountFactory.sol. Copy and paste the respective contract code into these files.

To compile the code, click on the "Solidity Compiler" tab in the left-hand sidebar. Make sure the "Compiler" option is set to "0.8.23" (or another compatible version), and then click on the "Compile" button for each contract.

To deploy the contracts:

1. Deploy the SimpleAccountFactory contract, passing an EntryPoint address as a constructor parameter.
2. Use the SimpleAccountFactory to create SimpleAccount instances.

Once the contracts are deployed, you can interact with them by calling their respective functions. Use the Remix interface to call these functions with the required parameters.

## User Interface

The user interface for interacting with these contracts typically includes:

1. Connecting a wallet (e.g., MetaMask)
2. Creating or accessing a smart contract wallet
3. Displaying the smart contract wallet address and balance
4. Sending funds from the smart contract wallet
5. Depositing funds into the smart contract wallet

## Authors

Aleonomoh Joseph


