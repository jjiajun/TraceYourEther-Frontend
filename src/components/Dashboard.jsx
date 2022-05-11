import React, {useState} from "react";
import { refreshContext } from "../context";
import DashBalance from "./DashBalance";
import DashRequests from "./DashRequests";
import DashTransactions from "./DashTransactions";
import Profile from "./Profile";


export default function Dashboard() {
  const [requestList, setRequestList] = useState();
  const [refresh, useRefresh] = useState(true);
  const data = {
    state: refresh,
    setter: useRefresh,
  };

 

  return (
    <div className="flex flex-col h-screen bg-primary text-white">
      <Profile />
      <refreshContext.Provider value={data}>
        <DashBalance />
        <DashRequests requests={requestList} />
        <DashTransactions />
      </refreshContext.Provider>
    </div>
  );
}
