import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Message from "./Message";
const { REACT_APP_BACKEND } = process.env;

export default function LoginBox({ user }) {
  //React hook to change to home page on successful login
  const navigate = useNavigate();
  // State and setter for login details
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // State and setter for signup and login message
  const [message, setMessage] = useState("");




  const loginAttempt = () => {
    const data = {
      email: email,
      password: password,
    };

    axios.post(`${REACT_APP_BACKEND}/login`, data).then((response) => {
      console.log(response);
      // Inform user if they did not key in username or password
      if (response.data === "details missing") {
        setMessage("Please enter an email and password");
      }
      // If username or password incorrect, inform player
      if (response.data === "The email or password is incorrect") {
        setMessage("Invalid login. Please try again.");
      }
      // If successful, redirect to home page
      if (response.data.success === true) {
        const { userId } = response.data;
        // On successful login, redirect to home page
        user.userSetter(userId);
        navigate("/");
      }
    });
  };





  return (
    <div className="flex grow flex-col justify-around">
      <div >
        <input className="text-3xl my-2"
          name="email"
          id="email"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <input className="text-3xl my-2"
          name="password"
          id="password"
          type="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div className="justify-self-end my-2">
        <button
          className="btn text-3xl"
          type="submit"
          onClick={loginAttempt}
        >
          Login{" "}
        </button>
      </div>
      {message !== '' && <Message displayMessage={message} />}
    </div>
  )
}
