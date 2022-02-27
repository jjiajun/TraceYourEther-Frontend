import React,{useState,useEffect} from "react";
import {  getAllRequestsForPayer } from "../solidityMethods";
import InRequestBox from "./InRequestBox";

export default function DashRequests () {
  const [requestList,setRequestList] = useState();
  useEffect(() => {
    // axios.post(`${REACT_APP_BACKEND}/getuserprofilebyid`,{id}).then((response)=>{
    //   const [first,second,third] = response.userProfile.requests
    //   setRequestList([first,second,third])
    // })
      getAllRequestsForPayer().then((response)=>{
        console.log('req res',response)
        const existingReq = response.filter((request)=>request.completed === false)
        console.log('filter', existingReq)
        const [first,second,third] = existingReq
        const threeRequest = []
        for (let i=0 ; i<existingReq.length; i+=1){
          if (i>2) break;
          threeRequest.push(existingReq[i])
        }
        console.log(threeRequest)
        setRequestList(threeRequest)
      })
    },[]) 
  return (
    <div>
      <h1>Dash Requests</h1>
      <InRequestBox requests = {requestList} />
    </div>
  )
}