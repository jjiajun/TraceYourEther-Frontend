import React from "react";
import RequestBox from "./RequestBox";

export default function DashRequests (requests) {
  return (
    <div>
      <h1>Dash Requests</h1>
      <RequestBox requests = {requests} />
    </div>
  )
}