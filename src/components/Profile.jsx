import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../context";
import axios from "axios";
import { HiOutlineUserCircle } from "react-icons/hi";
const { REACT_APP_BACKEND } = process.env;

export default function Profile() {
  const id = useContext(userContext);
  const [profileData, setProfileData] = useState();
  console.log(id);

  useEffect(() => {
    axios
      .post(`${REACT_APP_BACKEND}/getuserprofilebyid`, { id })
      .then((response) => {
        setProfileData(response.data.userProfile.name);
        console.log(profileData);
      });
  }, []);

  return (
    <div className="flex h-24 w-screen">
      <div className="px-2 mx-2 my-auto">
        {<HiOutlineUserCircle size="40" />}
      </div>
      <div className="px-2 my-auto justify-start text-left">
        <h5>Welcome back! </h5>
        <h2>Hello, {`${profileData}`}</h2>
      </div>
    </div>
  );
}
