import React from "react";

export default function FriendList({friends}) {
  console.log(friends)
  const listOfFriends  = friends.map((friend,index)=>(
    <div>
      <h1>{friend.name}</h1>
      <h2>{friend.address}</h2>
      <h2>{friend.email}</h2>
    </div>
  ))
  return (
    <div>
      {listOfFriends}
    </div>
  )
}