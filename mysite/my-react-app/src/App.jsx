// App.jsx
import React, { useState, createContext } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import NoPage from './pages/NoPage';
import SignUp from './Auth/SignUp';
import Signin from './Auth/SignIn';
import Logout from './Auth/Logout';
import EventList from './components/EventList';
import EventForm from './components/EventForm';
import EventDetail from './components/EventDetail';
import PrivateRoute from './components/PrivateRoute';

export const AuthContext = createContext();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // Assurez-vous que ceci est bien initialisé

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, currentUser, setCurrentUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/events" element={<PrivateRoute><EventList /></PrivateRoute>} />
            <Route path="/events/new" element={<PrivateRoute><EventForm /></PrivateRoute>} />
            <Route path="/events/:id" element={<PrivateRoute><EventDetail /></PrivateRoute>} />
            <Route path="*" element={<NoPage />} />
          </Route>
          <Route index element={<Signin />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
