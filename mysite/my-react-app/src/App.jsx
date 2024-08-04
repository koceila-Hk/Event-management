import React, { useState, useContext, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import EventList from './components/EventList';
import EventForm from './components/EventForm';
import EventDetail from './components/EventDetail';
import axios from 'axios';


export const AuthContext = createContext();

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? children : <Navigate to="/signin" />;
};

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    
    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:8000/api/signin/', { username, password }, {withCredentials: true});
            console.log(response.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Login failed', error.response.data);
        }
    };

    const logout = async () => {
        try {
            await axios.get('http://localhost:8000/api/signout/');
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            <Router>
                <Routes>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/" element={<PrivateRoute><EventList /></PrivateRoute>} />
                    <Route path="/events/new" element={<PrivateRoute><EventForm /></PrivateRoute>} />
                    <Route path="/events/:id" element={<PrivateRoute><EventDetail /></PrivateRoute>} />
                </Routes>
            </Router>
        </AuthContext.Provider>
    );
};

export default App
