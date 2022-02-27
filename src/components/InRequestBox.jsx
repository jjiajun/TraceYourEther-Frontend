import React from "react";
import InRequest from "./InRequest";

export default function InRequestBox(requests) {
  
  if(!requests.requests) return <div />;
  console.log(requests)
  if(!requests.requests[0]) {
    return(
      <div>
        <h2>No pending incoming requests currently</h2>
      </div>
    )
  }
  const requestList = requests.requests.map((request,index)=>(
    <InRequest key={index} oneRequest = {request} />
  ))

  return(
    <div>
      {requestList}
    </div>
  )
}