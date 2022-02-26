import axios from "axios";
import React, {useState,useContext} from "react";
import { userContext } from "../context";
import Message from "./Message"
const {REACT_APP_BACKEND} = process.env

export default function MakeRequest(friends) {
  console.log(friends)
  const [amount,setAmount] = useState('');
  const [description , setDescription] = useState('');

 
  if(!friends.friends) return <div />;
  if(!friends.friends[0]) {
    return(
      <div>
        <h2>Add friends to make requests</h2>
      </div>
    )
  }
  const friendOptions = friends.friends.map((friend,index)=>(
         <option key={index} value={`${friend._id}`}>{`${friend.name}`}</option>
  ))
  console.log('fri',friendOptions)

    const requestAttempt = () => {

    }

  return(
    <div>
      <select id='friends'>
        {friendOptions}
      </select>
      <input
            name="amount"
            id="amount"
            placeholder="Amount"
            onChange={(event) => setAmount(event.target.value)}
          />
      <input
            name="description"
            id="description"
            placeholder="Description"
            onChange={(event) => setDescription(event.target.value)}
          />
      <button className="btn sub-btn" type="submit" onClick={requestAttempt} >
            Submit request
            {' '}
          </button>
      {/* <Message displayMessage = {message} /> */}

    </div>
  )
}