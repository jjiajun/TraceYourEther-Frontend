import axios from "axios";
import React, { useState, useContext } from "react";
import { refreshContext, userContext } from "../context";
import Message from "./Message";
import { createRequest } from "../solidityMethods";
const { REACT_APP_BACKEND } = process.env;

export default function MakeRequest(friends) {
  console.log(friends);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [friendWallet, setFriendWallet] = useState("");
  const refresh = useContext(refreshContext);

  if (!friends.friends) return <div />;
  if (!friends.friends[0]) {
    return (
      <div>
        <h2>Add friends to make requests</h2>
      </div>
    );
  }
  const friendOptions = friends.friends.map((friend, index) => (
    <option key={index} value={`${friend.address}`}>{`${friend.name}`}</option>
  ));
  console.log("fri", friendOptions);

  const requestAttempt = () => {
    console.log("makereq", amount, description, friendWallet);
    createRequest(friendWallet, amount, description).then((response) => {
      setTimeout(() => {
        refresh.setter(!refresh.state);
      }, 15000);
    });
  };

  return (
    <div className="flex flex-col w-screen py-3 px-5 bg-white rounded-t-3xl text-gray-900 items-center">
      <div className="w-1/2 bg-white flex flex-col my-3">
        <select
          className="mb-3 h-10 bg-white border-primary border-2 rounded-lg px-2"
          id="friends"
          onChange={(event) => setFriendWallet(event.target.value)}
        >
          <option className="">Choose friend</option>
          {friendOptions}
        </select>
        <input
          name="amount"
          className="mb-3 h-10 bg-white border-primary border-2 rounded-lg px-2"
          id="amount"
          placeholder="Amount (ETH)"
          onChange={(event) => setAmount(Number(event.target.value))}
        />
        <input
          name="description"
          className="mb-3 h-10 bg-white border-primary border-2 rounded-lg px-2"
          id="description"
          placeholder="Description"
          onChange={(event) => setDescription(event.target.value)}
        />
        <button
          className="btn sub-btn mb-3 mx-0 h-10 rounded-lg px-2 font-semibold"
          type="submit"
          onClick={requestAttempt}
        >
          Submit request{" "}
        </button>
        {/* <Message displayMessage = {message} /> */}
      </div>
    </div>
  );
}
