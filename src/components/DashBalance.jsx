import React, {useState,useEffect} from "react";
import {getBalance} from "../solidityMethods"

export default function DashBalance () {
  const [balance,setBalance] = useState('')
  const [wallet,setWallet] =  useState('')
  
  useEffect(() => {
    getBalance().then((response)=>{
      console.log('lala',response)
      setBalance(response.intBalance/10**18)
      setWallet(response.userAddress)

    })
  })

    
  return (
    <div>
      <h1>Dash Balance</h1>
      <h2>Amount: {balance} ether</h2>
      <h3>Wallet Address : {wallet}</h3>
    </div>
  )
}