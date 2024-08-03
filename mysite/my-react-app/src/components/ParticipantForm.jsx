import React, { useState } from 'react';
import axios from 'axios';
import '../EventParticipant.css'

const ParticipantForm = ({ eventId }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newParticipant = { name, email, event: eventId };
        await axios.post('http://localhost:8000/api/participants/', newParticipant);
        setName('');
        setEmail('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button type="submit">Register</button>
        </form>
    );
};

export default ParticipantForm;
