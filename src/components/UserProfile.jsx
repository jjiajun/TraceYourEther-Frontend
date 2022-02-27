import React,{useState,useEffect} from "react";
import { getBalance } from "../solidityMethods";

export default function UserProfile(userData) {
  
  const [balance,setBalance] = useState('')
  const [wallet,setWallet] =  useState('')
  
  useEffect(() => {
    getBalance().then((response)=>{
      console.log('lala',response)
      setBalance(response.intBalance/10**18)
      setWallet(response.userAddress)

    })
  })
  if(!userData.userData){
    return <div />;
  } 
  return (
    <div>
      <h2>Name :{`${userData.userData.name}`}</h2>
      <h2>Wallet Balance :{balance}</h2>
      <h2>Wallet Address :{wallet}</h2>
    </div>
  )
}