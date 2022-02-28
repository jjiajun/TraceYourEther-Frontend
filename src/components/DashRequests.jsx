<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { getAllRequestsForPayer } from "../solidityMethods";
=======
import React,{useState,useEffect, useContext} from "react";
import {  getAllRequestsForPayer } from "../solidityMethods";
>>>>>>> 097dd584b4789a8d764be1b73d5ac88f138e8c87
import InRequestBox from "./InRequestBox";
import { refreshContext } from "../context";

<<<<<<< HEAD
export default function DashRequests() {
  const [requestList, setRequestList] = useState();
=======
export default function DashRequests () {
  const [requestList,setRequestList] = useState();
  const refresh = useContext(refreshContext)
  
>>>>>>> 097dd584b4789a8d764be1b73d5ac88f138e8c87
  useEffect(() => {
    // axios.post(`${REACT_APP_BACKEND}/getuserprofilebyid`,{id}).then((response)=>{
    //   const [first,second,third] = response.userProfile.requests
    //   setRequestList([first,second,third])
    // })
<<<<<<< HEAD
    getAllRequestsForPayer().then((response) => {
      console.log("req res", response);
      const existingReq = response.filter(
        (request) => request.completed === false
      );
      console.log("filter", existingReq);
      const [first, second, third] = existingReq;
      const threeRequest = [];
      for (let i = 0; i < existingReq.length; i += 1) {
        if (i > 2) break;
        threeRequest.push(existingReq[i]);
      }
      console.log(threeRequest);
      setRequestList(threeRequest);
    });
  }, []);
  return (
    <div className="flex flex-col h-1/4 w-screen bg-white py-5 px-5 rounded-t-3xl text-gray-900">
      <h1>Request List</h1>
      <InRequestBox requests={requestList} />
=======
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
      
>>>>>>> 097dd584b4789a8d764be1b73d5ac88f138e8c87
    </div>
  );
}
