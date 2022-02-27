import React,{useContext,useEffect,useState} from "react";
import { userContext } from "../context";
import axios from "axios";
import UserProfile from "./UserProfile";
const {REACT_APP_BACKEND} = process.env

export default function Profile() {
  const id = useContext(userContext);
  const [profileData,setProfileData] = useState();
  console.log(id)

  useEffect(() => {
    axios.post(`${REACT_APP_BACKEND}/getuserprofilebyid`,{id}).then((response)=>{setProfileData(response.data.userProfile);
      console.log(profileData)})
    
  },[])

  
  return (
    <div>
      <h1>Profile</h1>
      <UserProfile userData={profileData}/>
    </div>
  )
}