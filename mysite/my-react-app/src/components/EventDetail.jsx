import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import EventEditForm from './EventEditForm'; // Importer le composant
import '../EventDetail.css';

const EventDetail = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const { logout, isAuthenticated, currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const fetchEvent = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/events/${id}/`, { withCredentials: true });
            setEvent(response.data);
            console.log("Event fetched:", response.data); // Vérifiez les données de l'événement
        } catch (error) {
            console.error('Error fetching event', error);
        }
    };

    const fetchParticipants = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/participants/?event=${id}`, { withCredentials: true });
            setParticipants(response.data);
            console.log("Participants fetched:", response.data); // Vérifiez les données des participants
        } catch (error) {
            console.error('Error fetching participants', error);
        }
    };

    useEffect(() => {
        fetchEvent();
        fetchParticipants();
    }, [id]);

    const handleParticipate = async () => {
        if (!isAuthenticated) {
            console.log('User must be logged in to participate');
            return;
        }

        try {
            await axios.post(
                `http://localhost:8000/api/participant/`,
                { event: id },
                { withCredentials: true }
            );
            console.log('Participation successful');
            fetchParticipants(); // Appel de fetchParticipants après la participation
        } catch (error) {
            console.error('Error participating in event', error);
        }
    };

    const handleUpdate = () => {
        fetchEvent();
        setIsEditing(false); // Exit editing mode
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/events/${id}/delete/`, { withCredentials: true });
            console.log('Event deleted successfully');
            navigate('/events'); // Redirect to event list after deletion
        } catch (error) {
            console.error('Error deleting event', error);
        }
    };

    return (
        <div>
            <h1>Event Details</h1>
            <button onClick={logout}>Logout</button>
            {console.log("Current User:", currentUser)} {/* Vérifiez les données de l'utilisateur courant */}
            {event ? (
                <>
                    {isEditing ? (
                        <EventEditForm
                            eventId={event.id}
                            currentEventData={event}
                            onUpdate={handleUpdate}
                            onCancel={() => setIsEditing(false)}
                        />
                    ) : (
                        <>
                            <h2>{event.title}</h2>
                            <p>{event.description}</p>
                            <p>Date: {event.date}</p>
                            <p>Time: {event.time}</p>
                            <p>Location: {event.location}</p>

                            {isAuthenticated && (
                                <button onClick={handleParticipate}>Participate</button>
                            )}

                            {currentUser && (
                                <>
                                    {console.log("Event Creator ID:", event.creator)} {/* Vérifiez l'ID du créateur de l'événement */}
                                    {console.log("Current User ID:", currentUser.username)} {/* Vérifiez l'ID de l'utilisateur courant */}
                                    {event.creator === currentUser.username ? ( // Check if the current user is the creator
                                        <>
                                            <button onClick={() => setIsEditing(true)}>Edit Event</button>
                                            <button onClick={handleDelete}>Delete Event</button>
                                        </>
                                    ) : (
                                        <p>You do not have permission to edit or delete this event.</p>
                                    )}
                                </>
                            )}

                            <h3>Participants</h3>
                            <ul>
                                {participants.map(participant => (
                                    <li key={participant.id}>{participant.user__username}</li>
                                ))}
                            </ul>
                        </>
                    )}
                </>
            ) : (
                <p>Loading event details...</p>
            )}
        </div>
    );
};

export default EventDetail;
