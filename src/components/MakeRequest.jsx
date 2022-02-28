import axios from "axios";
<<<<<<< HEAD
import React, { useState, useContext } from "react";
import { userContext } from "../context";
import Message from "./Message";
=======
import React, {useState,useContext} from "react";
import { refreshContext, userContext } from "../context";
import Message from "./Message"
>>>>>>> dom
import { createRequest } from "../solidityMethods";
const { REACT_APP_BACKEND } = process.env;

export default function MakeRequest(friends) {
<<<<<<< HEAD
  console.log(friends);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [friendWallet, setFriendWallet] = useState("");
=======
  console.log(friends)
  const [amount,setAmount] = useState('');
  const [description , setDescription] = useState('');
  const [friendWallet, setFriendWallet] = useState('');
  const refresh = useContext(refreshContext)
>>>>>>> dom

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

<<<<<<< HEAD
  const requestAttempt = () => {
    console.log("makereq", amount, description, friendWallet);
    createRequest(friendWallet, amount, description);
  };
=======
    const requestAttempt = () => {
      console.log('makereq',amount,description,friendWallet)
      createRequest(friendWallet,amount,description).then((response)=>{
      setTimeout(()=>{refresh.setter(!refresh.state)},15000)
    })
    }
>>>>>>> dom

  return (
    <div>
<<<<<<< HEAD
      <select
        id="friends"
        onChange={(event) => setFriendWallet(event.target.value)}
      >
=======
      <select id='friends' onChange={(event) => setFriendWallet(event.target.value)}>
>>>>>>> dom
        <option>Choose friend</option>
        {friendOptions}
      </select>
      <input
        name="amount"
        id="amount"
        placeholder="Amount"
        onChange={(event) => setAmount(Number(event.target.value))}
      />
      <input
        name="description"
        id="description"
        placeholder="Description"
        onChange={(event) => setDescription(event.target.value)}
      />
      <button className="btn sub-btn" type="submit" onClick={requestAttempt}>
        Submit request{" "}
      </button>
      {/* <Message displayMessage = {message} /> */}
    </div>
  );
}
