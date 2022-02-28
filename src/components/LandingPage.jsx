import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginBox from "./LoginBox";
import SignupBox from "./SignupBox";
const { REACT_APP_BACKEND } = process.env;

export default function LandingPage({ user }) {
  const [signUpVisible, setSignUpVisible] = useState(false);
  const [logInVisible, setLogInVisible] = useState(true);

  const toggleLogIn = () => {
    setLogInVisible(true);
    setSignUpVisible(false);
  };
  const toggleSignUp = () => {
    setLogInVisible(false);
    setSignUpVisible(true);
  };

  return (
    <div className="flex flex-grow bg-primary text-gray-900 items-center justify-center">
      <div className="">
        <div className="text-7xl font-mono font-bold mb-12 text-white">
          Trace<span className="text-secondary">YourEther</span>
        </div>
        <div className="flex justify-center">
          <div className=" shadow-background w-96 h-80 rounded-lg bg-white my-5">
            <div className="flex flex-row justify-center">
              <h6
                className="bg-primary w-2/4 text-2xl p-2 border-l-2 border-t-2 rounded-tl-lg text-white"
                onClick={toggleLogIn}
              >
                Log In
              </h6>
              <h6
                className="bg-primary w-2/4 text-2xl p-2 border-r-2 border-t-2 rounded-tr-lg text-white"
                onClick={toggleSignUp}
              >
                Sign Up
              </h6>
            </div>
            {logInVisible && <LoginBox user={user} />}
            {signUpVisible && <SignupBox />}
          </div>
        </div>
      </div>
    </div>
  );
}
