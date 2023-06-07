import React from 'react';
import Login from '../components/login';
import GoogleLogin from '../components/GoogleLogin';
const LoginPage = ({ setLoggedIn }) => {
  return (
    <div>
      <h1>Login Page</h1>
      <Login setLoggedIn={setLoggedIn} />
      <GoogleLogin setLoggedIn={setLoggedIn}/>
    </div>
  );
};

export default LoginPage;
