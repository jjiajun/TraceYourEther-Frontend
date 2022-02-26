import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage";
import NavBar from "./components/NavBar";
import Dashboard from "./components/Dashboard";
import Requests from "./components/Requests";
import Transactions from "./components/Transactions";
import Profile from "./components/Profile";
import {
  requestAccount,
  getBalance,
  createRequest,
  getAllRequestsForPayer,
  getAllRequestsForPayee,
  approveRequest,
} from "./solidityMethods";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/main" element={<LandingPage />} />
        <Route exact path="/" element={<NavBar />}>
          <Route index element={<Dashboard />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      {/* Temporary buttons to trigger solidity methods*/}
      <button onClick={getBalance}>Get Balance</button>
      {/* replace arguments with actual request details */}
      <button
        onClick={() =>
          createRequest(
            "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
            2,
            "Transferring 2 ETH to test if this works. It works!"
          )
        }
      >
        Create Request
      </button>
      <button onClick={getAllRequestsForPayer}>Get All Requests For You</button>
      <button onClick={getAllRequestsForPayee}>Get All Requests by You</button>
      {/* replace "0" with id of request to approve */}
      <button onClick={() => approveRequest(0)}>Approve Request</button>
    </div>
  );
}

export default App;
