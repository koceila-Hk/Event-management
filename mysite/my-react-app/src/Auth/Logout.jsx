import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await axios.get('http://localhost:8000/api/signout/', { withCredentials: true });
        setIsAuthenticated(false);
        navigate('/signin');
      } catch (error) {
        console.error('Logout failed', error);
      }
    };

    handleLogout();
  }, [setIsAuthenticated, navigate]);

  return null;
};

export default Logout;
