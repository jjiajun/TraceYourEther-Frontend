import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../context";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { HiOutlineUserCircle } from "react-icons/hi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const { REACT_APP_BACKEND } = process.env;

export default function Profile() {
  const id = useContext(userContext);
  const [profileData, setProfileData] = useState();
  console.log(id);
  // get token from localStorage
  const token = localStorage.getItem("sessionToken");
  // create authorization header
  const auth = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    axios
      // add auth beside id
      .post(`${REACT_APP_BACKEND}/getuserprofilebyid`, { id }, auth)
      .then((response) => {
        setProfileData(response.data.userProfile.name);
        console.log(profileData);
      });
  }, []);

  const navigate = useNavigate();

  const goToMainPage = () => {
    localStorage.removeItem("sessionToken");
    navigate("/main");
  };

  return (
    <div className="flex h-24 w-screen justify-between px-5 p-3 bg-primary text-white">
      <div className="flex">
        <div className="px-2 mx-2 my-auto">
          {<HiOutlineUserCircle size="40" />}
        </div>
        <div className="px-2 my-auto justify-start text-left">
          <h5>Welcome back! </h5>
          <h2>Hello, {`${profileData}`}</h2>
        </div>
      </div>
      <button className="flex space-x-2 my-auto px-2" onClick={goToMainPage}>
        {<RiLogoutBoxRLine size="28" />}
        <h3>Log out</h3>
      </button>
    </div>
  );
}
