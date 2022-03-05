import React, { useState, useEffect, useContext } from "react";
import { getAllRequestsForPayer } from "../solidityMethods";
import InRequestBox from "./InRequestBox";
import { refreshContext } from "../context";

export default function DashRequests() {
  const [requestList, setRequestList] = useState();
  const refresh = useContext(refreshContext);

  useEffect(() => {
    getAllRequestsForPayer().then((response) => {
      const existingReq = response.filter(
        (request) => request.completed === false
      );
      const threeRequest = [];
      for (let i = 0; i < existingReq.length; i += 1) {
        if (i > 2) break;
        threeRequest.push(existingReq[i]);
      }
      setRequestList(threeRequest);
    });
  }, [refresh.state]);
  return (
    <div className="flex flex-col w-screen bg-gradient-to-t from-white to-background py-5 px-5 rounded-t-3xl text-gray-900">
      <h3 className="font-bold mb-5">Request List</h3>

      <InRequestBox requests={requestList} />
    </div>
  );
}
