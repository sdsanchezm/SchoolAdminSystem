import React, { useContext } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Alert  from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import LoginContext from '../context/LoginContext';

function Logout(){

  const navigate = useNavigate();
  const { isAuth, setIsAuth } = useContext(LoginContext);

  // using the useEffect hook to logout and run it one time,
  useEffect(() => {      
    // making the post request to the api to logout
    axios.post(
      'http://127.0.0.1:8000/api/logout/',
      { refresh_token: localStorage.getItem('refresh_token') },
      { headers: { 'Content-Type': 'application/json' } },
      { withCredentials: true }
    )
      .then(
        console.log('loggin out')
      )
      .then( 
        localStorage.clear()
      )
      .then(
        setIsAuth(false)
      )
      .then(
        console.log("localStorage clear here")
      )
      .then( () => {
        // clean the local storage
        axios.defaults.headers.common['Authorization'] = null;
        // Redirect in case loggint is not successful
        // window.location.href = '/login'
        // setTimeout( () => {
        //   navigate("/");
        //   console.log("logout here");
        // }, 1000);
      }
      )
     .catch( (e) => {
       // message in case logout doesn't work
       console.log('logout not working', e)
       });

       setTimeout( () => {
        navigate("/login");
        console.log("logout here");
        setIsAuth(false);
      }, 2000);
  
}, []);

  // no need to return anything
    return (
      //  <Alert key={variant} variant={variant}>
        <Alert className='container p-4 my-5' key="danger" variant="danger">
          <div> You have logged out!  <Spinner animation="border" role="status"></Spinner></div>
        </Alert>
     )
}

export default Logout;