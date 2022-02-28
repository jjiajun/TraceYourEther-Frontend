import axios from "axios";
import React, { useState } from "react";
import Message from "./Message";
const { REACT_APP_BACKEND } = process.env;

export default function SignupBox() {
  // State and setter for login details
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // State and setter for signup and login message
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const signUpAttempt = () => {
    //data to send to backend
    const data = {
      email: email,
      password: password,
      name: name,
      address: address,
    };
    axios.post(`${REACT_APP_BACKEND}/signup`, data).then((response) => {
      if (response.data === "Something went wrong when creating a new user") {
        setMessage("Something went wrong when creating a new user");
      }
      // Inform user if username already exists
      if (response.data === "user exists") {
        setMessage("Username taken. Please try a different username.");
      }
      // If successful, inform user to login
      if (response.data === "sign up success") {
        setMessage("Sign up successful, please login!");
      }
    });
  };

  return (
    <div className="flex grow flex-col justify-around py-4">
      <div>
        <input
          className="text-xl mb-1 px-2 w-5/6 h-10 rounded-lg"
          name="email"
          id="email"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          className="text-xl my-1 px-2 w-5/6 h-10 rounded-lg"
          name="password"
          id="password"
          type="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <input
          className="text-xl my-1 px-2 w-5/6 h-10 rounded-lg"
          name="name"
          id="name"
          placeholder="Name"
          onChange={(event) => setName(event.target.value)}
        />
        <input
          className="text-xl my-1 px-2 w-5/6 h-10 rounded-lg"
          name="address"
          id="address"
          placeholder="Address"
          onChange={(event) => setAddress(event.target.value)}
        />
      </div>
      <div className="justify-self-end my-1">
        <button
          className="btn text-xl px-4 py-2"
          type="submit"
          onClick={signUpAttempt}
        >
          Sign Up{" "}
        </button>
      </div>

      <Message displayMessage={message} />
    </div>
  );
}
