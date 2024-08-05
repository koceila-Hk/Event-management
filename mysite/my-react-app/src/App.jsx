// src/App.jsx
import React from 'react';
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

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/events" element={<EventList />} />
          <Route path="/events/new" element={<PrivateRoute><EventForm /></PrivateRoute>} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="*" element={<NoPage />} />
        </Route>
        <Route index element={<EventList />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
