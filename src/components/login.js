import React, { useState,useContext } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import { login } from '../services/api';
import axios from 'axios'

const Login = ({ setLoggedIn }) => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    const BASE_URL = `http://localhost:4001/api`;
    const res= await fetch(`${BASE_URL}/user/login`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      credentials:"include",
      
    body:JSON.stringify({
     phoneNumber:phoneNumber,password:password
    })
    });
    //console.log((await res).json);
   
    const data = await res.json();
    if((await res).status ===200) 
    {
      const token =data.token
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
      setLoggedIn(true); // Set the login status to true
          navigate('/home'); 
    }
        else{
         console.log((await res).status);
         console.log("invaid");
        }

    // try {
    //   // Perform login API request
    //   const  token  = await login({ password,phoneNumber});
    //   console.log(token)
    //   localStorage.setItem('token', token);
    //   navigate('/home');
    // } catch (error) {
    //     console.log(error)
    //   setError('Failed to login. Please check your credentials.');
    // }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
