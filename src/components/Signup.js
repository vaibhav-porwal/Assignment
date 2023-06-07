import React, { useState } from 'react';
import { useNavigate ,Link }  from 'react-router-dom';
import { signup } from '../services/api';

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Perform signup API request
      await signup({ name, phoneNumber, password });
      navigate('/login')
    } catch (error) {
      setError('Failed to signup. Please try again.');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button type="submit">Sign Up</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <p>
        Already have an account ? <Link to="/login">Login</Link>
      </p>
    </div>
    
  );
};

export default Signup;
