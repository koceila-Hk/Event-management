import React, { useState } from 'react';
import axios from 'axios';
import '../EventForm.css';

const EventForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newEvent = { title, description, date, time, location };
        try {
            const response = await axios.post('http://localhost:8000/api/events/new', newEvent, { withCredentials: true });
            console.log(response.data);
            // Optionnel : Réinitialiser le formulaire ou rediriger l'utilisateur
        } catch (error) {
            console.error('Error creating event:', error.response ? error.response.data : error.message);
            setError('Failed to create event. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
            <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
            <button type="submit">Create Event</button>
            {error && <p className="error">{error}</p>}
        </form>
    );
};

export default EventForm;
