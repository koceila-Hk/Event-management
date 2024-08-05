import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventEditForm = ({ eventId, currentEventData, onUpdate, onCancel }) => {
    const [formData, setFormData] = useState(currentEventData);

    useEffect(() => {
        setFormData(currentEventData);
    }, [currentEventData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(
                `http://localhost:8000/api/events/${eventId}/update/`,
                formData,
                { withCredentials: true }
            );
            onUpdate(); 
        } catch (error) {
            console.error('Error updating event', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
            </label>
            <label>
                Description:
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                ></textarea>
            </label>
            <label>
                Date:
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                />
            </label>
            <label>
                Time:
                <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                />
            </label>
            <label>
                Location:
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Update Event</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default EventEditForm;
