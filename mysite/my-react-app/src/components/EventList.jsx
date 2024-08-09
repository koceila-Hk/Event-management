import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/events/', { withCredentials: true });
                setEvents(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des events', error);
            }
        })();
    }, []);


    const handleButton = (id) => {
        navigate(`/events/${id}`);
    };



    return (
        <div>
            <h1>Liste des événements à venir</h1>
            <ul className='event-list'>
                {events.map(event => (
                    <li key={event.id}>
                        <button type='button' onClick={() => handleButton(event.id)} 
                        className='button-list'>
                            {event.title}
                            <div className='list-date'>
                                {event.date}
                            </div>
                            </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;
