import React,{useContext} from "react";
import { userContext } from "../context";
import DashBalance from "./DashBalance";
import DashRequests from "./DashRequests";
import DashTransactions from "./DashTransactions";

export default function Dashboard() {
  const user = useContext(userContext)
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>{`${user}`}</h2>
      <DashBalance/>
      <DashRequests/>
      <DashTransactions/>

    </div>
  )
}