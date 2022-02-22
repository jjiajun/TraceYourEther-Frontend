import React from 'react';
import {Routes , Route} from 'react-router-dom'
import './App.css';
import LandingPage from './components/LandingPage';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import Requests from './components/Requests';
import Transactions from './components/Transactions';
import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path = "/main" element={<LandingPage/>}/>
        <Route exact path = "/" element = {<NavBar/>}>
          <Route index element = {<Dashboard/>}/>
          <Route path="/requests" element= {<Requests/>} />
          <Route path="/transactions" element= {<Transactions/>} />
          <Route path="/profile" element = {<Profile/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
