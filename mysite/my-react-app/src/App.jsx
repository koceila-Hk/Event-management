import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventForm from './components/EventForm.jsx';
import EventDetail from './components/EventDetail.jsx';
import EventList from './components/EventList.jsx';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<EventList />} />
                <Route path="/events/new" element={<EventForm />} />
                <Route path="/events/:id" element={<EventDetail />} />
            </Routes>
        </Router>
    );
};

export default App;
