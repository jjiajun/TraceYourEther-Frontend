import axios from 'axios';
import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../context';
import LoginMessage from './LoginMessage';

export default function LandingPage() {
  //React hook to change to home page on successful login
  const navigate = useNavigate();
  const [user,setUser] = useState(null);
   // State and setter for login details
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // State and setter for signup and login message
  const [message, setMessage] = useState('');

  const signUpAttempt = () => {
    //data to send to backend
    const data = {
      userEmail : email ,
      userPassword : password,
    }
    axios.post('route' , data).then((response)=>{
      if (response.data === 'details missing') {
        setMessage('Please enter an email and password');
      }
      // Inform user if username already exists
      if (response.data === 'user exists') {
        setMessage('Username taken. Please try a different username.');
      }
      // If successful, inform user to login
      if (response.data === 'sign up success') {
        setMessage('Sign up successful, please login!');
      }
    })
  }

  const loginAttempt = () => {
    const data = {
      email: email,
      password: password,
    };

    axios.post('http://localhost:3008/login', data).then((response) => {
      console.log(response);
      // Inform user if they did not key in username or password
      if (response.data === 'details missing') {
        setMessage('Please enter an email and password');
      }
      // If username or password incorrect, inform player
      if (response.data === 'username or password incorrect') {
        setMessage('Invalid login. Please try again.');
      }
      // If successful, redirect to home page
      if (response.data.success === true) {
        const { userId } = response.data;
        setUser(userId);
        // On successful login, redirect to home page
        navigate('/');
      }
    });
  };


  return (
    <div id="landing-background">
      <userContext.Provider value={user}>
        <div className="loginBox">
          <p className="logo">
            <i className="fas fa-utensils" />
            ZoomZoom
          </p>
          <div className="loginSmallBox">
            <input
              name="email"
              id="email"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              name="password"
              id="password"
              type="password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="btn-container">
            <button className="btn sub-btn" type="submit" onClick={signUpAttempt}>
              Sign Up
              {' '}
            </button>
            <button className="btn login-btn" type="submit" onClick={loginAttempt}>
              Login
              {' '}
            </button>
          </div>
          <LoginMessage displayMessage={message} />
        </div>
      </userContext.Provider>
    </div>
  );
}