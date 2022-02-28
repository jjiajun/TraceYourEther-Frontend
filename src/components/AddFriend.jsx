import React,{useState,useContext,useEffect} from "react";
import FriendBox from "./FriendBox";
import { userContext } from "../context";
import axios from "axios";
import FriendList from "./FriendList";

const {REACT_APP_BACKEND} = process.env

export default function AddFriend(){
  const id = useContext(userContext);
  const [profileData,setProfileData] = useState();
  console.log(id)

  useEffect(() => {
    axios.post(`${REACT_APP_BACKEND}/getuserprofilebyid`,{id}).then((response)=>{
      console.log(response)
      setProfileData(response.data.userProfile.friends);
      console.log(profileData)})
    
  },[])

  console.log(profileData)
  return(
    <div className="flex-grow bg-primary text-white">
        <h1>Add Friend</h1>
        <FriendBox/>
      <div className="flex flex-col w-screen bg-white py-5 px-5 rounded-3xl text-gray-900 " >

        {profileData && <FriendList friends= {profileData} />}
      </div>
    </div>
  )
}