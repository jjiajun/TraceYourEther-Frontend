import React, { useState, useEffect, useContext } from "react";
import { userContext } from "../context";
import axios from "axios";
import MakeRequest from "./MakeRequest";
import InRequestBox from "./InRequestBox";
import OutRequestBox from "./OutRequestBox";
import DashBalance from "./DashBalance";
import Profile from "./Profile";
import {
  getAllRequestsForPayer,
  getAllRequestsForPayee,
} from "../solidityMethods";
import { refreshContext } from "../context";
import Divider from "./Divider";
import Trial from "./Trial";

const { REACT_APP_BACKEND } = process.env;

export default function Requests() {
  const id = useContext(userContext);
  const [friendList, setFriendList] = useState();
  const [inRequestList, setInRequestList] = useState();
  const [outRequestList, setOutRequestList] = useState();
  const [refresh, useRefresh] = useState(true);
  const data = {
    state: refresh,
    setter: useRefresh,
  };

  const token = localStorage.getItem("sessionToken");
  // create authorization header
  const auth = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    axios
      .post(`${REACT_APP_BACKEND}/getuserprofilebyid`, { id }, auth)
      .then((response) => {
        console.log("RESP: ", response);
        setFriendList(response.data.userProfile.friends);
        console.log(friendList);
      });
    getAllRequestsForPayer().then((response) => {
      const existingReq = response.filter(
        (request) => request.completed === false
      );
      setInRequestList(existingReq);
    });
    getAllRequestsForPayee().then((response) => {
      console.log("ALL REQUESTS FOR PAYEE: ", response);
      const existingReq = response.filter(
        (request) => request.completed === false
      );
      setOutRequestList(existingReq);
    });
    console.log("triggered");
  }, [refresh]);

  return (
    <div className="bg-primary text-white">
      <Profile />
      <DashBalance />
      <refreshContext.Provider value={data}>
        <MakeRequest friends={friendList} />
        <div className="bg-white text-gray-900 overflow-y-auto pb-20">
          <Divider msg={"Incoming Requests"} />
          <InRequestBox
            requests={inRequestList}
            setInRequest={setInRequestList}
          />
          <Divider msg={"Outgoing Requests"} />
          <OutRequestBox requests={outRequestList} />
        </div>
      </refreshContext.Provider>
    </div>
  );
}
