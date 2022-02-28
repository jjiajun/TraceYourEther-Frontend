import React, { useState, useEffect } from "react";
import { getBalance } from "../solidityMethods";

export default function DashBalance() {
  const [balance, setBalance] = useState("");
  const [wallet, setWallet] = useState("");

  useEffect(() => {
    getBalance().then((response) => {
      console.log("lala", response);
      setBalance(response.intBalance / 10 ** 18);
      setWallet(response.userAddress);
    });
  });

  return (
    <div className="flex flex-col w-screen py-5 px-5">
      <div className="my-2">
        <h5>Available Balance</h5>
        <h2 className="text-3xl text-secondary">
          {Math.round(balance * 1000) / 1000} ether
        </h2>
      </div>
      {/* <div className="my2">
        <h5 className="text-base text-gray-300">Wallet Address</h5>
        <h3>{wallet}</h3>
      </div> */}
    </div>
  );
}
