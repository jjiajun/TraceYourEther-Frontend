import React from "react";
import InRequest from "./InRequest";

export default function InRequestBox({requests, setInRequest}) {
  
  if(!requests) return <div />;
  console.log(requests)
  if(!requests[0]) {
    return(
      <div>
        <h2>No pending incoming requests currently</h2>
      </div>
    )
  }
  const requestList = requests.map((request,index)=>(
    <InRequest key={index} oneRequest = {request} allRequest = {requests} setter = {setInRequest} />
  ))

  return(
    <div>
      {requestList}
    </div>
  )
}