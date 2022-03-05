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
      setBalance(response.intBalance / 10 ** 18);
      setWallet(response.userAddress);
    });

    axios
      .post(`${REACT_APP_BACKEND}/getuserprofilebyid`, { id })
      .then((response) => {
        setProfileData(response.data.userProfile);
      });
  }, []);

  return (
    <div className="flex flex-col w-screen pb-3 px-5">
      <div className="mb-4">
        <h5 className="mb-2">Available Balance</h5>
        <span className="text-4xl text-secondary font-semibold">
          {Math.round(balance * 10000) / 10000}
        </span>
        <span className="text-3xl text-secondary font-bold"> ETH</span>
      </div>
    </div>
  );
}
