import React,{useState,useEffect, useContext} from "react";
import {  getAllRequestsForPayer } from "../solidityMethods";
import InRequestBox from "./InRequestBox";
import { refreshContext } from "../context";

export default function DashRequests () {
  const [requestList,setRequestList] = useState();
  const refresh = useContext(refreshContext)
  
  useEffect(() => {
    // axios.post(`${REACT_APP_BACKEND}/getuserprofilebyid`,{id}).then((response)=>{
    //   const [first,second,third] = response.userProfile.requests
    //   setRequestList([first,second,third])
    // })
      getAllRequestsForPayer().then((response)=>{
        console.log('req res',response)
        const existingReq = response.filter((request)=>request.completed === false)
        const threeRequest = []
        for (let i=0 ; i<existingReq.length; i+=1){
          if (i>2) break;
          threeRequest.push(existingReq[i])
        }
        console.log(threeRequest)
        setRequestList(threeRequest)
      })
    },[refresh.state]) 
  return (
    <div>
      <h1>Dash Requests</h1>
      
      <InRequestBox requests = {requestList} />
      
    </div>
  )
}