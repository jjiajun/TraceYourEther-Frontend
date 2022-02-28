import React, { useState, useEffect, useContext } from "react";
import { userContext } from "../context";
import axios from "axios";
import MakeRequest from "./MakeRequest";
import InRequestBox from "./InRequestBox";
import OutRequestBox from "./OutRequestBox";
import {
  getAllRequestsForPayer,
  getAllRequestsForPayee,
} from "../solidityMethods";
import { refreshContext } from "../context";
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

  useEffect(() => {
    axios
      .post(`${REACT_APP_BACKEND}/getuserprofilebyid`, { id })
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
      const existingReq = response.filter(
        (request) => request.completed === false
      );
      setOutRequestList(existingReq);
    });
    console.log("triggered");
  }, [refresh]);

  return (
    <div>
      <h1>Requests</h1>

      <refreshContext.Provider value={data}>
        {refresh && <Trial />}
        <MakeRequest friends={friendList} />
        <InRequestBox
          requests={inRequestList}
          setInRequest={setInRequestList}
        />
        <OutRequestBox requests={outRequestList} />
      </refreshContext.Provider>
    </div>
  );
}
