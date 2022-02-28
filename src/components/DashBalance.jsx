import React, {useState,useEffect,useContext} from "react";
import {getBalance} from "../solidityMethods"
import { userContext } from "../context";
import axios from "axios";
const {REACT_APP_BACKEND} = process.env

export default function DashBalance () {
  const [balance,setBalance] = useState('')
  const [wallet,setWallet] =  useState('')
  const id = useContext(userContext);
  const [profileData,setProfileData] = useState('');
  
  useEffect(() => {
    getBalance().then((response)=>{
      console.log('lala',response)
      setBalance(response.intBalance/10**18)
      setWallet(response.userAddress)

    })

     axios.post(`${REACT_APP_BACKEND}/getuserprofilebyid`,{id}).then((response)=>{setProfileData(response.data.userProfile);
      console.log('hey',profileData)})
   
  },[])

    
  return (
    <div>
      <h1>Dash Balance</h1>
      <h2>User : {profileData.name}</h2>
      <h2>Amount: {balance} ether</h2>
      <h3>Wallet Address : {wallet}</h3>
    </div>
  )
}