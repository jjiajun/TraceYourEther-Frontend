import React from "react";
import OutRequest from "./OutRequest";

export default function OutRequestBox(requests) {
  if (!requests.requests) return <div />;
  console.log("ALL OUT REQUESTS: ", requests);
  if (!requests.requests[0]) {
    return (
      <div className="bg-white">
        <h4 className="text-gray-400">
          You haven't asked anyone to give you ETH yet.
        </h4>
      </div>
    );
  }
  const requestList = requests.requests.map((request, index) => (
    <OutRequest key={index} oneRequest={request} />
  ));

  return <div className="grow flex justify-center bg-white">{requestList}</div>;
}
