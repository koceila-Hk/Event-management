// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const EventEditForm = ({ eventId, currentEventData, onUpdate, onCancel }) => {
//     const [formData, setFormData] = useState(currentEventData);

//     useEffect(() => {
//         setFormData(currentEventData);
//     }, [currentEventData]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.patch(
//                 `http://localhost:8000/api/events/${eventId}/update/`,
//                 formData,
//                 { withCredentials: true }
//             );
//             onUpdate(); 
//         } catch (error) {
//             console.error('Error updating event', error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <label>
//                 Title:
//                 <input
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleChange}
//                 />
//             </label>
//             <label>
//                 Description:
//                 <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                 ></textarea>
//             </label>
//             <label>
//                 Date:
//                 <input
//                     type="date"
//                     name="date"
//                     value={formData.date}
//                     onChange={handleChange}
//                 />
//             </label>
//             <label>
//                 Time:
//                 <input
//                     type="time"
//                     name="time"
//                     value={formData.time}
//                     onChange={handleChange}
//                 />
//             </label>
//             <label>
//                 Location:
//                 <input
//                     type="text"
//                     name="location"
//                     value={formData.location}
//                     onChange={handleChange}
//                 />
//             </label>
//             <button type="submit">Update Event</button>
//             <button type="button" onClick={onCancel}>Cancel</button>
//         </form>
//     );
// };

// export default EventEditForm;

import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
import axios from 'axios';

const EventEditForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const [event, setEvent] = useState({title: '', description: '', date: '', time: '', location: ''});

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/events/${id}/`);
                setEvent(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération détail', error);
            }
        })();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent(prevEvent => ({ ...prevEvent, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:8000/api/events/${id}/update/`, event, { withCredentials: true });
            navigate(`/events/${id}`);
        } catch (error) {
            console.error('Erreur de la modification event', error);
        }
    };

    const handleCancel = () => {
        navigate(`/events/${id}`);
    }

    return (
        <div>
            <h1>Edit Event</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" name="title" value={event.title} onChange={handleChange} required />
                </label>
                <label>
                    Description:
                    <textarea name="description" value={event.description} onChange={handleChange} required />
                </label>
                <label>
                    Date:
                    <input type="date" name="date" value={event.date} onChange={handleChange} required />
                </label>
                <label>
                    Time:
                    <input type="time" name="time" value={event.time} onChange={handleChange} required />
                </label>
                <label>
                    Location:
                    <input type="text" name="location" value={event.location} onChange={handleChange} required />
                </label>
                <div className='button-group'>
                <button type="submit">Save Changes</button>
                <button type='button' onClick={handleCancel}>Annuler</button>
                </div>
            </form>
        </div>
    );
};

export default EventEditForm;

