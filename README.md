# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

# Basics

### What is waffle?

It is a library for writing and testing smart contracts.

### What is chai?

Chai is an assertion library. It makes testing much easier by giving you lots of assertions you can run against your code.

### Hardhat Introduction.

Every time you're running Hardhat from the CLI, you are running a task. E.g. "npx hardhat compile" is running the "compile" task.

### What is Mocha

Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser

# Debugging Errors In HardHat

## Nonce too high error:

- Solve it by going to MetaMask > Settings > Advanced > Reset

# Unutilized code

## How to get all past events:

```
let eventFilter = contract.filters.EventName();
let events = await contract.queryFilter(eventFilter);
events.forEach((e) => {
console.log(e.args.amount);
console.log(e.args.description);
});
```

# To get this app to work:

1. Seed the data first --> in cryptopay-backend: npm run seed
2. Start the backend server --> in cryptopay-backend: npm run devStart
3. Deploy the local hardhat network

- npx hardhat node (to get 20 test hardhat accounts)
- npx hardhat run scripts/deploy.js --network localhost (deploy test accounts on localhost)

4. Start the react-app --> in project_5_FE: npm start

```

```
