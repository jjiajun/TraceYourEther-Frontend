import React from "react";

export default function MakeRequest(friends) {
  console.log(friends)
 
  if(!friends.friends) return <div />;
  if(!friends.friends[0]) {
    return(
      <div>
        <h2>Add friends to make requests</h2>
      </div>
    )
  }

  return(
    <div>
      <select id='friends'>
        {friends.map((friend)=>{
          <option value={`${friend}`}>{`${friend}`}</option>
        })}
      </select>
    </div>
  )
}