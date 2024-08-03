import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ParticipantForm from './ParticipantForm';
import '../EventDetail.css'

const EventDetail = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        const fetchEvent = async () => {
            const response = await axios.get(`http://localhost:8000/api/events/${id}/`);
            console.log(response.data);
            
            setEvent(response.data);
        };
        const fetchParticipants = async () => {
            const response = await axios.get(`http://localhost:8000/api/participants/?event=${id}`);
            setParticipants(response.data);
        };
        fetchEvent();
        fetchParticipants();
    }, [id]);

    return (
        <div>
            {event && (
                <>
                    <h1>{event.title}</h1>
                    <p>{event.description}</p>
                    <p>Date: {event.date}</p>
                    <p>Time: {event.time}</p>
                    <p>Location: {event.location}</p>
                    <h2>Participants</h2>
                    <ul>
                        {participants.map(participant => (
                            <li key={participant.id}>{participant.name} - {participant.email}</li>
                        ))}
                    </ul>
                    <ParticipantForm eventId={event.id} />
                </>
            )}
        </div>
    );
};

export default EventDetail;
