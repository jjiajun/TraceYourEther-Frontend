import React from "react";

export default function Request(oneRequest){
  if(!oneRequest) return <div />;

  return (
    <div>
      <div className="requestType">{oneRequest.type}</div>
      <div className="requestDetails">
        <h4>{oneRequest.party}</h4>
        <h5>{oneRequest.amount}</h5>
        <p>{oneRequest.description}</p>
      </div>
    </div>
  )
}