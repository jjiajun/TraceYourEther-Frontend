import React,{useState,useEffect,useContext} from "react";
import { userContext } from "../context";
import axios from "axios";
const {REACT_APP_BACKEND} = process.env

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