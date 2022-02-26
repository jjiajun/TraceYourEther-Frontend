import axios from "axios";
import React, {useState,useContext} from "react";
import { userContext } from "../context";
import Message from "./Message"
const {REACT_APP_BACKEND} = process.env

export default function FriendBox() {
  const id = useContext(userContext);
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('');

  const addFriendAttempt = () =>{
    const data = {email :email,id:id,};
    

    axios.post(`${REACT_APP_BACKEND}/addfriendbyemail` , data).then((response)=>{
      if (response.data === 'No data'){
        setMessage('No such user found.Try again')
      }else {
        console.log(response)
        const {name,email} = response.data.friendProfile
        setMessage(`User ${name} with E-mail ${email} added as friend`)
      }
    })
  }

  return (
    <div>
      <input
            name="email"
            id="email"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
      <button className="btn sub-btn" type="submit" onClick={addFriendAttempt}>
            Add Friend
            {' '}
          </button>
      <Message displayMessage = {message} />
    </div>
  )
}