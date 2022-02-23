import MakeRequest from "./MakeRequest";
import React,{useState,useEffect,useContext} from "react";
import { userContext } from "../context";
import axios from "axios";
const {REACT_APP_BACKEND} = process.env

export default function Requests() {
  const id = useContext(userContext);
  const [friendList,setFriendList] = useState();
  console.log(id)
  
  useEffect(() => {
    axios.post(`${REACT_APP_BACKEND}/getuserprofilebyid`,{id}).then((response)=>{setFriendList(response.data.userProfile.friends);
      console.log(friendList)})
      
    },[])
  return (
    <div>
      <h1>Requests</h1>
      <MakeRequest friends= {friendList}/>
    </div>
  )
}