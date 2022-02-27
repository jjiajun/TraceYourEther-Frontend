import React from "react";
import OutRequest from "./OutRequest";

export default function OutRequestBox(requests) {
  
  if(!requests.requests) return <div />;
  console.log(requests)
  if(!requests.requests[0]) {
    return(
      <div>
        <h2>No pending out-going requests currently</h2>
      </div>
    )
  }
  const requestList = requests.requests.map((request,index)=>(
    <OutRequest key={index} oneRequest = {request} />
  ))

  return(
    <div>
      {requestList}
    </div>
  )
}