import React,{useContext,useState,useEffect} from "react";
import { userContext,refreshContext } from "../context";
import DashBalance from "./DashBalance";
import DashRequests from "./DashRequests";
import DashTransactions from "./DashTransactions";
import { getAllRequestsForPayer } from "../solidityMethods";
import axios from "axios";
const {REACT_APP_BACKEND} = process.env

export default function Dashboard() {
  const id = useContext(userContext)
  const [requestList,setRequestList] = useState();
  const [refresh,useRefresh] = useState(true)
  const data = {
    state : refresh,
    setter : useRefresh
  }
  
  // useEffect(() => {
  //   // axios.post(`${REACT_APP_BACKEND}/getuserprofilebyid`,{id}).then((response)=>{
  //   //   const [first,second,third] = response.userProfile.requests
  //   //   setRequestList([first,second,third])
  //   // })
  //     getAllRequestsForPayer().then((response)=>{
  //       console.log('req res',response)
  //       const [first,second,third] = response
  //       setRequestList([first,second,third])
  //     })
  //   },[]) 

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>{`${id}`}</h2>
      <DashBalance/>
      <refreshContext.Provider value = {data}>
      <DashRequests requests={requestList}/>
      <DashTransactions/>
      </refreshContext.Provider>

    </div>
  )
}