import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../EventList.css'

const EventList = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await axios.get('http://localhost:8000/api/events/');
            setEvents(response.data);
        };
        fetchEvents();
    }, []);

    return (
        <div>
            <h1>Events</h1>
            <ul>
                {events.map(event => (
                    <li key={event.id}>
                        <Link to={`/events/${event.id}`}>{event.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;
