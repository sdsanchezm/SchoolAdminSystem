// Import the react JS packages and axios package
import React, { useContext } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import LoginContext from '../context/LoginContext';

// Define the Login function.
function Login() {

  // username and password defined states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { isAuth, setIsAuth } = useContext(LoginContext);

  // Create the handleSubmit method.
  const handleSubmit = async e => {
    e.preventDefault();

    const user = {
      username: username,
      password: password
    };

    // Create the POST requuest
    const { data } = await axios.post('http://127.0.0.1:8000/token/',
      user,
      {
        headers:
          { 'Content-Type': 'application/json' }
      },
      {
        withCredentials: true
      });

    // Initialize the access & refresh token in localstorage.
    // in case data is null, then redirect to home to log back in
    console.log(data);
    if (data == null) {
      console.log("paila bro");
      // window.location.href = '/'
      navigate("/");
    }
    localStorage.clear();
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
    //  window.location.href = '/'
    setIsAuth(true);
    navigate("/");
  }

    return (

      <div className="container">
        <div className=''>
        {/* style={{"width": "18rem"}} */}
        <div className='row'><div className='col-12 my-4 py-4'></div></div>
        <div className="row">
          <div className='col-lg-4 col-1'></div>
            <Card className="p-4 col-10 col-lg-4 border-primary bg-light shadow" >
                <form className="p-3" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <h3 className="Auth-form-title text-center text-primary">Login</h3>
                    <div className="form-group mt-3">
                      {/* <label>Username</label> */}
                      <input className="form-control my-2 border-primary"
                        placeholder="Username"
                        name='username'
                        type='text' value={username}
                        required 
                        onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                      {/* <label>Password</label> */}
                      <input name='password'
                          type="password"
                          className="form-control my-2 border-primary"
                          placeholder="Password"
                          value={password}
                          required
                          onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                      <button type="submit"
                        className="btn btn-primary">Sign in</button>
                    </div>
                  </div>
              </form>
            </Card>

            <div className='col-1 col-lg-4'></div>
        </div>

        </div>
     </div>
     )
}

export default Login;