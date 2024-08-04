import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../App';
import '../EventDetail.css';

const EventDetail = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [participants, setParticipants] = useState([]);
    const { logout, isAuthenticated } = useContext(AuthContext);

    // Fonction pour récupérer les détails de l'événement
    const fetchEvent = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/events/${id}/`, { withCredentials: true });
            setEvent(response.data);
        } catch (error) {
            console.error('Error fetching event', error);
        }
    };

    // Fonction pour récupérer les participants de l'événement
    const fetchParticipants = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/participants/list/?event=${id}`, { withCredentials: true });
            setParticipants(response.data);
        } catch (error) {
            console.error('Error fetching participants', error);
        }
    };

    // Effectue les appels API au chargement du composant
    useEffect(() => {
        fetchEvent();
        fetchParticipants();
    }, [id]);

    // Fonction pour participer à l'événement
    const handleParticipate = async () => {
        if (!isAuthenticated) {
            console.log('User must be logged in to participate');
            return;
        }

        try {
            await axios.post(
                `http://localhost:8000/api/participants/`,
                { event: id },
                { withCredentials: true }
            );
            fetchParticipants();  // Recharge les participants après l'ajout
        } catch (error) {
            console.error('Error participating in event', error);
        }
    };

    return (
        <div>
            <h1>Event Details</h1>
            <button onClick={logout}>Logout</button>
            {event ? (
                <>
                    <h2>{event.title}</h2>
                    <p>{event.description}</p>
                    <p>Date: {event.date}</p>
                    <p>Time: {event.time}</p>
                    <p>Location: {event.location}</p>

                    {isAuthenticated && (
                        <button onClick={handleParticipate}>Participate</button>
                    )}

                    <h3>Participants</h3>
                    <ul>
                        {participants.map(participant => (
                            <li key={participant.id}>{participant.user__username}</li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>Loading event details...</p>
            )}
        </div>
    );
};

export default EventDetail;
