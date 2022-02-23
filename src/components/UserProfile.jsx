import React from "react";

export default function UserProfile(userData) {
  if(!userData.userData){
    return <div />;
  } 
  console.log(userData)
  return (
    <div>
      <h2>Name :{`${userData.userData.name}`}</h2>
      <h2>Wallet Balance :{`add code here`}</h2>
      <h2>Wallet Address :{`${userData.userData.address}`}</h2>
    </div>
  )
}