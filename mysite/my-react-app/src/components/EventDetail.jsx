// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../Auth/AuthContext';
// import EventEditForm from './EventEditForm';

// const EventDetail = () => {
//     const { id } = useParams();
//     const [event, setEvent] = useState(null);
//     const [participants, setParticipants] = useState([]);
//     const [isEditing, setIsEditing] = useState(false);
//     const [loginMessage, setLoginMessage] = useState('');
//     const { isAuthenticated, currentUser } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const fetchEvent = async () => {
//         try {
//             const response = await axios.get(`http://localhost:8000/api/events/${id}/`, { withCredentials: true });
            
//             setEvent(response.data);
//         } catch (error) {
//             console.error('Error fetching event', error);
//         }
//     };

//     const fetchParticipants = async () => {
//         try {
//             const response = await axios.get(`http://localhost:8000/api/participants/?event=${id}`, { withCredentials: true });
//             setParticipants(response.data);
//         } catch (error) {
//             console.error('Error fetching participants', error);
//         }
//     };

//     useEffect(() => {
//         fetchEvent();
//         fetchParticipants();
//     }, [id]);

//     const handleParticipate = async () => {
//         if (!isAuthenticated) {
//             setLoginMessage('Vous devez être connecté pour participer à cet événement.');
//             return;
//         }

//         try {
//             await axios.post(
//                 `http://localhost:8000/api/participant/`,
//                 { event: id },
//                 { withCredentials: true }
//             );
//             console.log('Participation successful');
//             fetchParticipants(); 
//         } catch (error) {
//             console.error('Error participating in event', error);
//         }
//     };

//     const handleUpdate = () => {
//         fetchEvent();
//         setIsEditing(false); 
//     };

//     const handleDelete = async () => {
//         try {
//             await axios.delete(`http://localhost:8000/api/events/${id}/delete/`, { withCredentials: true });
//             console.log('Event deleted successfully');
//             navigate('/events'); 
//         } catch (error) {
//             console.error('Error deleting event', error);
//         }
//     };

//     return (
//         <div className='event-detail'>
//             <h1>Event Details</h1>
//             {event ? (
//                 <>
//                     {isEditing ? (
//                         <EventEditForm 
//                             eventId={event.id}
//                             currentEventData={event}
//                             onUpdate={handleUpdate}
//                             onCancel={() => setIsEditing(false)}
//                         />
//                     ) : (
//                         <> 
//                             <h2>Titre: {event.title}</h2>
//                             <p>Description: {event.description}</p>
//                             <p>Date: {event.date}</p>
//                             <p>Heure: {event.time}</p>
//                             <p>Lieu: {event.location}</p>

//                             <button onClick={handleParticipate}>Participate</button>
//                             <p style={{color: 'red'}}>{loginMessage}</p>
                            
//                             {currentUser && (
//                                 <>
//                                     {event.creator === currentUser ? ( 
//                                         <>
//                                             <button onClick={() => setIsEditing(true)}>Edit Event</button>
//                                             <button onClick={handleDelete}>Delete Event</button>
//                                         </>
//                                     ) : (
//                                         <p>You do not have permission to edit or delete this event.</p>
//                                     )}
//                                 </>
//                             )}

//                             <h3>Participants</h3>
//                             <ul>
//                                 {participants.map(participant => (
//                                     <li key={participant.id}>{participant.user__username}</li>
//                                 ))}
//                             </ul>
//                         </>
//                     )}
//                 </>
//             ) : (
//                 <p>Loading event details...</p>
//             )}
//         </div>
//     );
// };

// export default EventDetail;


import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
import axios from 'axios';

const EventDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const [event, setEvent] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [loginMessage, setLoginMessage] = useState('');

    const fetchEvent = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/events/${id}/`);
            setEvent(response.data);
        } catch (error) {
            console.error('Error fetching event details', error);
        }
    };

    const fetchParticipants = async () => {
        if (!currentUser){
            return;
        }
        try {
            const response = await axios.get(`http://localhost:8000/api/participants/?event=${id}`);
            setParticipants(response.data);
        } catch (error) {
            console.error('Error fetching participants', error);
        }
    };
    
    useEffect(() => {
        fetchEvent();
        fetchParticipants();
    }, [id]);
    

    const handleParticipate = async () => {
        if (!currentUser) {
            setLoginMessage('Veuillez vous connecter pour participer.');
            return;
        }
        try {
            await axios.post(`http://localhost:8000/api/participant/`,  { event: id},{ withCredentials: true });
            fetchParticipants();
        } catch (error) {
            console.error('Error participating in event', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/events/${id}/delete/`, {withCredentials:true});
            navigate('/events');
        } catch (error) {
            console.error('Error deleting event', error);
        }
    };

    const handleEdit = () => {
        navigate(`/events/${id}/edit`);
    };

    return (
        <div className='event-detail'>
            <h1>Event Details</h1>
            {event ? (
                <>
                    <h2>Titre: {event.title}</h2>
                    <p>Description: {event.description}</p>
                    <p>Date: {event.date}</p>
                    <p>Heure: {event.time}</p>
                    <p>Lieu: {event.location}</p>

                    <button onClick={handleParticipate}>Participate</button>
                    <p style={{color: 'red'}}>{loginMessage}</p>
                    
                    {currentUser && (
                        <>
                            {event.creator === currentUser ? ( 
                                <>
                                    <button onClick={handleEdit}>Edit Event</button>
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
            ) : (
                <p>Loading event details...</p>
            )}
        </div>
    );
};

export default EventDetail;
