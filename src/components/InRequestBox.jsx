import React from "react";
import InRequest from "./InRequest";

<<<<<<< HEAD
export default function InRequestBox({ requests, setInRequest }) {
  if (!requests) return <div />;
  console.log(requests);
  if (!requests[0]) {
    return (
      <div className="grow align-middle content-center">
=======
export default function InRequestBox({requests, setInRequest}) {
  
  if(!requests) return <div />;
  console.log('box',requests)
  if(!requests[0]) {
    return(
      <div>
>>>>>>> 097dd584b4789a8d764be1b73d5ac88f138e8c87
        <h2>No pending incoming requests currently</h2>
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

  return <div className="grow">{requestList}</div>;
}
