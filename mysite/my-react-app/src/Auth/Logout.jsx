// src/Auth/Logout.jsx
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        logout();
        navigate('/signin');
    }, [logout, navigate]);

    return null;
};

export default Logout;
