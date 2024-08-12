import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EventForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const navigate = useNavigate();

    const getCoordinates = async (address) => {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
            params: {
                address: address,
                key: 'AIzaSyCFIgPo6v-OIHmxvjFFQexTvGe0f7VBrxo'
            }
        });

        const { lat, lng } = response.data.results[0].geometry.location;
        return { latitude: lat, longitude: lng };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const coordinates = await getCoordinates(location);
            const newEvent = { title, description, date, time, location, ...coordinates };
            const response = await axios.post('http://localhost:8000/api/events/new', newEvent, { withCredentials: true });
            console.log(response.data);
            navigate('/events');
        } catch (error) {
            console.error('Erreur lors de la création event:', error.response.data);
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
        </form>
    );
};

export default EventForm;
