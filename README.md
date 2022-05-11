# TraceYourEther

A decentralized e-payment app where users can request and approve payment on the Ethereum blockchain!

This is the frontend repo. Backend repo can be found [here](https://github.com/jjiajun/TraceYourEther-Project5-Backend).

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#usage--features">Usage / Features</a>
    </li>
    <li>
      <a href="#built-with">Built With</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#troubleshooting">Troubleshooting</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project
<br/>
<div align="center">
  <img src="https://user-images.githubusercontent.com/90031266/163436724-b09f4c4e-58ca-4d2f-b4c4-aee6e255b7d4.png" width="600px"/>
</div>
<br/>

TraceYourEther provides a decentralized solution for anyone to request payment from friends and family on the Ethereum blockchain.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage / Features

<br />1. You can sign up or log in.<br /><br />

<div align="center">
  <img src="https://user-images.githubusercontent.com/90031266/163436822-4e8a7914-e3f0-40de-b1b5-961a8a14900d.gif" width="480px" />
</div>

<br />2. Go to the "Friends" tab to add a friend whom you want to request money from.<br /><br />

<div align="center">
  <img src="https://user-images.githubusercontent.com/90031266/163436952-d75a0240-af30-4fbb-afd7-b92f463a1a8a.gif" width="480px"/>
</div>

</div>

<br />3. Go to the "Requests" tab to request a payment amount from your friend.<br /><br />

<div align="center">
  <img src="https://user-images.githubusercontent.com/90031266/163436969-86f0355a-c15e-4322-9222-0f684563f36f.gif" width="480px" />
</div>

<br />4. Your friend will see your requests in the "Dashboard" tab.<br /><br />

<div align="center">
  <img src="https://user-images.githubusercontent.com/90031266/163441114-f9c63f8c-5c7f-4b0e-a77b-855ee4e11b79.gif" width="480px"/>
</div>

<br />5. Your friend can choose to accept or reject your request. This process will take some time (> 12s). Solidity uses a proof of work mechanism which takes up significant time to confirm each transaction on the blockchain.<br /><br />

<div align="center">
  <img src="https://user-images.githubusercontent.com/90031266/163440785-3bd28220-159b-4b5e-8460-efde0df0e412.gif" width="480px"/>
</div>

</br>

<br />6. You may go to the "Transactions" tab to check all your past transactions at a glance.<br /><br />

<div align="center">
  <img src="https://user-images.githubusercontent.com/90031266/163440755-12db7233-8341-43e3-a504-8d0ee5961af8.png" width="480px"/>
</div>



## Built With

<strong>Frontend</strong>
* [React Native](https://reactnative.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Ethers.js](https://docs.ethers.io/v5/)

<strong>Backend</strong>
* [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/)
* [Solidity](https://docs.soliditylang.org/en/v0.8.13/)
* [Hardhat](https://www.google.com/search?q=hardhat&oq=hardhat&aqs=chrome..69i57j69i59l3j69i60l4.684j0j1&sourceid=chrome&ie=UTF-8)

<strong>Authentication</strong>
* [JWT](https://jwt.io/)

<strong>Functionality</strong>
* [Google Cloud Vision](https://cloud.google.com/vision)
* [Google Cloud Translate](https://cloud.google.com/translate)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

Backend

1. Go to the [backend repo](https://github.com/jjiajun/TraceYourEther-Project5-Backend).

2. Seed the data first: npm run seed

3. Start the backend server: npm run devStart

3. Deploy the local hardhat network

- npx hardhat node (to get 20 test hardhat accounts)
- npx hardhat run scripts/deploy.js --network localhost (deploy test accounts on localhost)

Frontend

4. Come back to this repo

5. Start the react-app: npm start

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Tristan: [GitHub](https://github.com/jjiajun) - teo.jia.jun.29@gmail.com

Dominique: [GitHub](https://github.com/dominiqueyeo) - dominiqueyeo@hotmail.com

<p align="right">(<a href="#top">back to top</a>)</p>


## Troubleshooting

Nonce too high error:

- Solve it by going to MetaMask > Settings > Advanced > Reset

If requests are not showing:

- Check that you are using the correct metamask wallet



```

```
