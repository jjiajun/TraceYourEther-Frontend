import React, { useContext, useEffect, useState } from "react";
import { approveRequest, rejectRequest } from "../solidityMethods";
import axios from "axios";
import { refreshContext } from "../context";
const { REACT_APP_BACKEND } = process.env;

export default function InRequest({ oneRequest, allRequest, setter }) {
  const [requester, setRequester] = useState("");
  const refresh = useContext(refreshContext);


  const token = localStorage.getItem("sessionToken");
  // create authorization header
  const auth = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    axios
      .post(
        `${REACT_APP_BACKEND}/getuserprofilebywallet`,
        {
          address: oneRequest.payeeAddress.toString(),
        },
        auth
      )
      .then((response) => {
        setRequester(response.data.userProfile.name);
      });
  }, []);

  useEffect(() => {
    axios
      .post(
        `${REACT_APP_BACKEND}/getuserprofilebywallet`,
        {
          address: oneRequest.payeeAddress.toString(),
        },
        auth
      )
      .then((response) => {
        setRequester(response.data.userProfile.name);
      });
  }, []);

  const approveThisRequest = () => {
    approveRequest(oneRequest.id).then((response) => {
      setTimeout(() => {
        refresh.setter(!refresh.state);
      }, 15000);
    });
  };

  const rejectThisRequest = () => {
    rejectRequest(oneRequest.id).then((response) => {
      setTimeout(() => {
        refresh.setter(!refresh.state);
      }, 15000);
    });
  };

  return (
    <div>
      <div className="incomingReq shadow-xl shadow-background w-48 h-52 rounded-lg bg-white my-5 mx-4">
        <div className="bg-primary text-gray-100 h-10 rounded-t-lg flex align-middle justify-center">
          <h3 className="mt-1 justify-self-center align-self-center font-semibold mb-4">
            {requester}
          </h3>
        </div>
        <div className="my-5">
          <span className="font-bold text-3xl text-primary">
            {oneRequest.amount}
          </span>
          <span className="text-base text-primary font-bold"> ETH</span>
          <p className="my-2">{oneRequest.description}</p>
        </div>
        <div className="flex flex-row">
          <div>
            <button
              className="btn approve-btn"
              type="submit"
              onClick={approveThisRequest}
            >
              Approve
            </button>
            <button
              className="btn reject-btn"
              type="submit"
              onClick={rejectThisRequest}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
