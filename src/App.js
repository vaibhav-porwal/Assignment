import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import Home from "./pages/Home"
import AddOrder from './pages/addOrder';
import Showorder from './pages/Showorder';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
      console.log('User is logged in');
    } else {
      console.log('User is not logged in');
    }
  }, []);

  return (
    <Router>
      <Routes>
        {loggedIn ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/add-order" element={<AddOrder />} />
            <Route path="/get-order" element={<Showorder />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<LoginPage setLoggedIn={setLoggedIn}/>} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;