import axios from 'axios';
import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../context';
import LoginMessage from './LoginMessage';
import Trial from './Trial';
const {REACT_APP_BACKEND} = process.env

export default function LandingPage({user}) {
  //React hook to change to home page on successful login
  const navigate = useNavigate();
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
    axios.post(`${REACT_APP_BACKEND}/signup` , data).then((response)=>{
      if (response.data === 'Something went wrong when creating a new user') {
        setMessage('Something went wrong when creating a new user');
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

    axios.post(`${REACT_APP_BACKEND}/login`, data).then((response) => {
      console.log(response);
      // Inform user if they did not key in username or password
      if (response.data === 'details missing') {
        setMessage('Please enter an email and password');
      }
      // If username or password incorrect, inform player
      if (response.data === 'The email or password is incorrect') {
        setMessage('Invalid login. Please try again.');
      }
      // If successful, redirect to home page
      if (response.data.success === true) {
        const { userId } = response.data;
        console.log(' data user',userId)
        user.userSetter(userId);
        console.log('state user',user)
        // On successful login, redirect to home page
        navigate('/');
      }
    });
  };


  return (
    <div id="landing-background">
      
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
            <Trial />
          </div>
          <LoginMessage displayMessage={message} />
        </div>
      
    </div>
  );
}