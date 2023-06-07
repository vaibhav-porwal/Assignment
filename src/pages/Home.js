import React ,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Token exists in local storage, user is logged in
      // Perform any necessary actions
      console.log('User is logged in');
    } else {
      // Token does not exist, user is not logged in
      // Perform any necessary actions
      console.log('User is not logged in');
    }
  }, []);

  const handleAddOrderClick = () => {
    navigate('/add-order');
  };

  const handleGetOrderClick = () => {
    navigate('/get-order');
  };

  return (
    <div>
      <h2>Welcome to Home</h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={handleAddOrderClick} className="button">
          Add Order
        </button>
        <button onClick={handleGetOrderClick} className="button">
          Get Order
        </button>
      </div>
    </div>
  );
};

export default Home;
