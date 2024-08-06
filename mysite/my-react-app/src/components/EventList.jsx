import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EventList = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/events/', { withCredentials: true });
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events', error);
            }
     })();
    }, []);

    return (
        <div>
            <h1>Liste des événements à venir</h1>
            <ul className='event-list'>
                {events.map(event => (
                    <li key={event.id}>
                        <Link to={`/events/${event.id}`}>{event.title} {event.date}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;
