import React from 'react';
import './assets/css/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import Home from './components/Home';
import NoPage from './pages/NoPage';
import SignUp from './Auth/SignUp';
import Signin from './Auth/SignIn';
import Logout from './Auth/Logout';
import EventList from './components/EventList';
import EventForm from './components/EventForm';
import EventDetail from './components/EventDetail';
import EventEditForm from './components/EventEditForm';
import PrivateRoute from './components/PrivateRoute';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signout" element={<Logout />} />
          <Route path="events" element={<EventList />} />
          <Route path="events/new" element={<PrivateRoute><EventForm /></PrivateRoute>} />
          <Route path="events/:id" element={<EventDetail />} />
          <Route path="events/:id/edit" element={<EventEditForm />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
