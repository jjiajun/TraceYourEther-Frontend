import axios from "axios";
import React, { useState, useContext } from "react";
import { userContext } from "../context";
import Message from "./Message";
const { REACT_APP_BACKEND } = process.env;

export default function FriendBox() {
  const id = useContext(userContext);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("sessionToken");
  // create authorization header
  const auth = { headers: { Authorization: `Bearer ${token}` } };

  const addFriendAttempt = () => {
    const data = { email: email, id: id };

    axios
      .post(`${REACT_APP_BACKEND}/addfriendbyemail`, data, auth)
      .then((response) => {
        if (response.data === "No data") {
          setMessage("No such user found.Try again");
        } else {
          console.log(response);
          const { name, email } = response.data.friendProfile;
          setMessage(`User ${name} with E-mail ${email} added as friend`);
        }
      });
  };

  return (
    <div className="flex flex-col w-screen py-3 px-5 bg-white rounded-t-3xl text-gray-900 items-center">
      <div className="flex flex-col w-96 py-5 px-5 rounded-2xl text-gray-900">
        <input
          name="email"
          className="mb-3 h-10 bg-white border-primary border-2 rounded-lg px-2"
          id="email"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <button
          className="btn sub-btn mb-3 mx-0 h-10 rounded-lg px-2 font-semibold"
          type="submit"
          onClick={addFriendAttempt}
        >
          Add Friend{" "}
        </button>
        <Message displayMessage={message} />
      </div>
    </div>
  );
}
