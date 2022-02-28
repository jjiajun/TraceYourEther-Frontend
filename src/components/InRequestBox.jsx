import React from "react";
import InRequest from "./InRequest";

export default function InRequestBox({ requests, setInRequest }) {
  if (!requests) return <div />;
  console.log(requests);
  if (!requests[0]) {
    return (
      <div className="grow align-middle content-center">
        <h4 className="text-gray-400">
          None. Phew, you can keep the precious ETH to yourself.
        </h4>
      </div>
    );
  }
  const requestList = requests.map((request, index) => (
    <InRequest
      key={index}
      oneRequest={request}
      allRequest={requests}
      setter={setInRequest}
    />
  ));

  return <div className="grow flex justify-center">{requestList}</div>;
}
