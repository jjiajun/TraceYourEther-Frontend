import React,{useState,useEffect,useContext} from "react";
import { userContext } from "../context";
import axios from "axios";
import MakeRequest from "./MakeRequest";
import InRequestBox from "./InRequestBox";
import OutRequestBox from "./OutRequestBox";
import { getAllRequestsForPayer, getAllRequestsForPayee } from "../solidityMethods";
const {REACT_APP_BACKEND} = process.env

export default function Requests() {
  const id = useContext(userContext);
  const [friendList,setFriendList] = useState();
  const [inRequestList,setInRequestList] = useState();
  const [outRequestList,setOutRequestList] = useState();
  console.log(id)
  
  useEffect(() => {
    axios.post(`${REACT_APP_BACKEND}/getuserprofilebyid`,{id}).then((response)=>{setFriendList(response.data.userProfile.friends);
      console.log(friendList)
    })
    getAllRequestsForPayer().then((response)=>{
      setInRequestList(response)
    })
    getAllRequestsForPayee().then((response)=>{
      setOutRequestList(response)
      
    })
      
    },[])
  return (
    <div>
      <h1>Requests</h1>
      <MakeRequest friends= {friendList}/>
      <InRequestBox requests = {inRequestList} />
      <OutRequestBox requests = {outRequestList} />
    </div>
  )
}