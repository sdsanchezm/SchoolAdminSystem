import React from 'react';
// Import the react JS packages
import { useEffect, useState } from 'react';
// import the axios package
import axios from 'axios';
import Dashboard1 from './Dashboard1';

// Define the Home function.
function Home() {

     const [message, setMessage] = useState('');

     // using the useEffect hook
     useEffect(() => {
        if (localStorage.getItem('access_token') === null){
            window.location.href = '/login'
        }
        else {
         ( async () => {
           try {
            // calling the api when is logged in
             const {data} = await axios.get('http://127.0.0.1:8000/api/home/', {
              headers: {
                'Content-Type': 'application/json'
              }});

             setMessage(data.message);

             // in case is not authenticated
          } catch (e) { console.log('not authenticated') }

         })() };
     }, []);

     return (
        <div className='container'>
          {/* <h1>Hallo, {message}, you are logged in</h1> */}
            <Dashboard1></Dashboard1>
        </div>
     )
}

export default Home;
