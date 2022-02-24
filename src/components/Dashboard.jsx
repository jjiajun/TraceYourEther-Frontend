import React,{useContext,useState,useEffect} from "react";
import { userContext } from "../context";
import DashBalance from "./DashBalance";
import DashRequests from "./DashRequests";
import DashTransactions from "./DashTransactions";
import axios from "axios";
const {REACT_APP_BACKEND} = process.env

export default function Dashboard() {
  const id = useContext(userContext)
  const [requestList,setRequestList] = useState();
  
  useEffect(() => {
    axios.post(`${REACT_APP_BACKEND}/getuserprofilebyid`,{id}).then((response)=>{
      const [first,second,third] = response.userProfile.requests
      setRequestList([first,second,third])
    })
      
    },[])

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>{`${id}`}</h2>
      <DashBalance/>
      <DashRequests requests={requestList}/>
      <DashTransactions/>

    </div>
  )
}