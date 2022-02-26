import React from "react";
import Request from "./Request";

export default function RequestBox(requests) {
  console.log(requests)
 
  if(!requests.requests) return <div />;
  if(!requests.requests[0]) {
    return(
      <div>
        <h2>No requests currently</h2>
      </div>
    )
  }
  const requestList = requests.requests.map((request,index)=>{
    <Request key={index} oneRequest = {request} />
  })

  return(
    <div>
      {requestList}
    </div>
  )
}