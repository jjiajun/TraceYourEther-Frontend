import React, { useState, useEffect, useContext } from "react";
import { getBalance } from "../solidityMethods";
import { userContext } from "../context";
import axios from "axios";
const { REACT_APP_BACKEND } = process.env;

export default function DashBalance() {
  const [balance, setBalance] = useState("");
  const [wallet, setWallet] = useState("");
  const id = useContext(userContext);
  const [profileData, setProfileData] = useState("");

  useEffect(() => {
    getBalance().then((response) => {
      console.log("lala", response);
      setBalance(response.intBalance / 10 ** 18);
      setWallet(response.userAddress);
    });

    axios
      .post(`${REACT_APP_BACKEND}/getuserprofilebyid`, { id })
      .then((response) => {
        setProfileData(response.data.userProfile);
        console.log("hey", profileData);
      });
  }, []);

  return (
    <div className="flex flex-col w-screen py-5 px-5">
      <div className="my-2">
        <h5>Available Balance</h5>
        <h2 className="text-3xl text-secondary">
          {Math.round(balance * 1000) / 1000} ether
        </h2>
      </div>
      <div className="my2">
        <h5 className="text-base text-gray-300">Wallet Address</h5>
        <h3>{wallet}</h3>
      </div>
    </div>
  );
}
