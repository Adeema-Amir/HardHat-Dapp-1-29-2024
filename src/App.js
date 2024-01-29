/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { ethers } from "ethers";
import contract from "./Lock.sol/Lock.json";

function App() {
  const { ethereum } = window;
  const [address, setAddress] = useState('Connect Wallet');
  const [balance, setBalnce] = useState('');
  const [greeting, setGreeting] = useState('');

  const contractAddress = "0x326473FfBDE976A45b6BfDBCC4080ba25Bab43c0";

  const alchemyProvider = new ethers.providers.JsonRpcProvider(
    "https://eth-sepolia.g.alchemy.com/v2/S2TOD1a90UZUb6Wd0LjOBhSt_JyKW8rK"
  );
  const walletProvider = new ethers.providers.Web3Provider(
    ethereum
  );

  const getContractData = new ethers.Contract(
    contractAddress,
    contract.abi,
    alchemyProvider
  )

  const sendContracttx = new ethers.Contract(
    contractAddress,
    contract.abi,
    (walletProvider.getSigner())
  )

  useEffect(() => {
    ethereum.on("accountsChanged", (accounts) => {

      setAddress(accounts[0]);
      const getbal = async () => {
        const balance = await ethereum.request({
          method: "eth_getBalance",
          params: [accounts[0], 'latest']
        })
        setBalnce(ethers.utils.formatEther(balance));
      }
      getbal();
    })
    ethereum.on("chainChanged", (chain) => {
      console.log(chain);
    });
  });

  const getGreeting = async () => {
    const data = await getContractData.greet();
    setGreeting(data);
  };

  const setData = async () => {
    const sendData = await sendContracttx.setGreeting("السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ");
  };

  const chainChange = async (chain) => {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [
        {
          chainId: `0x13881`,
        }
      ]
    });
  };


  const sendTx = async () => {
    await ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          to: '0x8F6b10E06e307a5d17493F02E2f4B03DB7606018',
          from: address,
          value: `0x${(parseInt(ethers.utils.parseEther('0.1'))).toString(16)}`,
          chainId: '0x3'
        }
      ]
    })
  };

  const requsetAccount = async () => {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" })
    setAddress(accounts[0]);
    const balance = await ethereum.request({
      method: "eth_getBalance",
      params: [accounts[0], 'latest']
    })
    setBalnce(ethers.utils.formatEther(balance));
  };

  return (
    <div className="App">
      <nav class="navbar">
        <div class="navbar-container container">
          <input type="checkbox" name="" id="" />
          <div class="hamburger-lines">
            <span class="line line1"></span>
            <span class="line line2"></span>
            <span class="line line3"></span>
          </div>
          <ul class="menu-items">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
          </ul>
          <h1 class="logo"><a href='#'>Navbar</a></h1>
        </div>
      </nav>
      <br /><br /><br /><br /><br /><br /><br /><br />

      <div class="container">
        <header class="codrops-header">
          <h1>My First Dapp</h1>
          <div class="codrops-links">
            <a class="codrops-icon codrops-icon--prev" href="#"></a>
            <a class="codrops-icon codrops-icon--drop" href="#"></a>
          </div>
        </header>
        <section class="content">
          <h2><a className="App-link" href='#' onClick={requsetAccount}>{address}</a></h2>
          <br />
          <span id='span'>{balance}</span>
          <div class="box bg-1">
            <button class="button button--winona button--border-thin button--round-s" data-text="Open Project"><span><a
                className="Apgh"
                onClick={sendTx}
              >
                Send Transaction
              </a></span></button>
        <button class="button button--winona button--border-thin button--round-s" data-text="Create New"><span> <a
                className="Appghhh"
                onClick={getGreeting}
              >
                Get Greeting
              </a></span></button>
        <button class="button button--winona button--border-thin button--round-s" data-text="Publish"><span>   <a
                className="Appkjj"
                onClick={setData}
              >
                Set Greeting
              </a></span></button>
      
            <header className="App-header">
              {/* <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p> */}
              <a
                className="hyApp"

              >
                {greeting}
              </a>
              <br /><br /><br /><br /><br />
            
            </header>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;