import React, { useEffect, useState } from "react";
import { approveRequest } from "../solidityMethods";
import axios from "axios";
const { REACT_APP_BACKEND } = process.env;

export default function OutRequest({ oneRequest }) {
  const [requester, setRequester] = useState("");

  useEffect(() => {
    axios
      .post(`${REACT_APP_BACKEND}/getuserprofilebywallet`, {
        address: oneRequest.payeeAddress.toString(),
      })
      .then((response) => {
        setRequester(response.data.userProfile.name);
      });
  }, []);

  if (!oneRequest) return <div />;

  return (
    <div>
      <div className="outgoingReq shadow-xl shadow-background w-48 h-48 rounded-lg bg-white my-5 mx-4">
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
      </div>
    </div>
  );
}
