import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage";
import NavBar from "./components/NavBar";
import Dashboard from "./components/Dashboard";
import Requests from "./components/Requests";
import Transactions from "./components/Transactions";
import Profile from "./components/Profile";
import { userContext } from "./context";
import AddFriend from "./components/AddFriend";

function App() {
  const [userId, setUserId] = useState();
  const userData = {
    userState: userId,
    userSetter: setUserId,
  };
  return (
    <div className="App flex flex-col h-screen">
      <userContext.Provider value={userId}>
        <Routes>
          <Route exact path="/main" element={<LandingPage user={userData} />} />
          <Route exact path="/" element={<NavBar />}>
            <Route index element={<Dashboard />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/transactions" element={<Transactions />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
            <Route path="/addfriend" element={<AddFriend />} />
          </Route>
        </Routes>
      </userContext.Provider>
    </div>
  );
}

export default App;
