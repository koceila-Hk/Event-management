// import React, { useState, useEffect, useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../Auth/AuthContext';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {faChevronRight, faChevronDown} from '@fortawesome/free-solid-svg-icons';

// const EventDetail = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const { currentUser } = useContext(AuthContext);
//     const [event, setEvent] = useState(null);
//     const [participants, setParticipants] = useState([]);
//     const [loginMessage, setLoginMessage] = useState('');
//     const [isParticipante, setIsParticipate]  = useState('');
//     const [isVisibleListe, setIsVisibleListe] = useState(false);


//     const fetchEvent = async () => {
//         try {
//             const response = await axios.get(`http://localhost:8000/api/events/${id}/`);
//             setEvent(response.data);
//         } catch (error) {
//             console.error('Erreur lors de la récupération détail', error);
//         }
//     };

//     const fetchParticipants = async () => {
//         if (!currentUser){
//             return;
//         }
//         try {
//             const response = await axios.get(`http://localhost:8000/api/participants/?event=${id}`);
//             setParticipants(response.data);
//         } catch (error) {
//             console.error('Erreur lors de la récupération des participants', error);
//         }
//     };
    
//     useEffect(() => {
//         fetchEvent();
//         fetchParticipants();
//     }, []);
    

//     const handleParticipate = async () => {
//         if (!currentUser) {
//             setLoginMessage('Veuillez vous connecter pour participer.');
//             return;
//         }
//         try {
//             const response = await axios.post(`http://localhost:8000/api/participant/`,  { event: id},{ withCredentials: true });
//             setIsParticipate(response.data.message);
//             fetchParticipants();
//         } catch (error) {
//             console.error('Erreur à la participation event', error);
//         }
//     };

//     const handleDelete = async () => {
//         try {
//             await axios.delete(`http://localhost:8000/api/events/${id}/delete/`, {withCredentials:true});
//             navigate('/events');
//         } catch (error) {
//             console.error('Erreur delete', error);
//         }
//     };

//     const handleEdit = () => {
//         navigate(`/events/${id}/edit`);
//     };


//     const togglePariticipantsListe = () => {
//         setIsVisibleListe(!isVisibleListe);
//     }

//     return (
//         <div className='event-detail'>
//             <h1>Détails de l'événement</h1>
//             {event ? (
//                 <div>
//                     <table>
//                         <thead>
//                         <tr>
//                             <th>Titre</th>
//                             <th>Description</th>
//                             <th>Date</th>
//                             <th>Heure</th>
//                             <th>Lieu</th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                         <tr>
//                             <td>{event.title}</td>
//                             <td>{event.description}</td>
//                             <td>{event.date}</td>
//                             <td>{event.time}</td>
//                             <td>{event.location}</td>
//                         </tr>
//                         </tbody>
//                     </table>
//                     {event.creator !== currentUser && (
//                     <button onClick={handleParticipate}>Participer</button>
//                     )}
//                     <p style={{color: 'red'}}>{loginMessage}</p>
//                     <p style={{color: 'green'}}>{isParticipante}</p>
                    
//                     <div>
//                         {event.creator === currentUser && ( 
//                             <div className='handle-btn-event'>
//                                 <button onClick={handleEdit}>Modifier l'événement</button>
//                                 <button onClick={handleDelete}>Supprimer l'événement</button>
//                             </div>
//                         )}
//                     </div>

//                     {currentUser && (
//                     <h3 onClick={togglePariticipantsListe} style={{cursor: 'pointer', display: 'flex', paddingTop: '10px'}}>
//                         <span style={{marginRight: '8px'}}>
//                             <FontAwesomeIcon icon={isVisibleListe ? faChevronDown : faChevronRight}/>
//                         </span>
//                         Liste des participants
//                         </h3>
//                     )}

//                     {isVisibleListe && (
//                     <ul>
//                         {participants.map(participant => (
//                             <li
//                                 key={participant.id} style={{display: 'flex', padding: '5px 0'}}>
//                                 {participant.user__username} 
//                                 </li>
//                         ))}
//                     </ul>
//                     )}
//                 </div>
//             ) : (
//                 <p>Chargement de détail...</p>
//             )}
//         </div>
//     );
// };

// export default EventDetail;


import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronRight, faChevronDown} from '@fortawesome/free-solid-svg-icons';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const EventDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const [event, setEvent] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [loginMessage, setLoginMessage] = useState('');
    const [isParticipate, setIsParticipate]  = useState('');
    const [isVisibleListe, setIsVisibleListe] = useState(false);

    const fetchEvent = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/events/${id}/`);
            setEvent(response.data);
            console.log(response.data);
            
        } catch (error) {
            console.error('Erreur lors de la récupération du détail', error);
        }
    };

    const fetchParticipants = async () => {
        if (!currentUser) {
            return;
        }
        try {
            const response = await axios.get(`http://localhost:8000/api/participants/?event=${id}`);
            setParticipants(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des participants', error);
        }
    };

    useEffect(() => {
        fetchEvent();
        fetchParticipants();
    }, []);

    const handleParticipate = async () => {
        if (!currentUser) {
            setLoginMessage('Veuillez vous connecter pour participer.');
            return;
        }
        try {
            const response = await axios.post(`http://localhost:8000/api/participant/`, { event: id }, { withCredentials: true });
            setIsParticipate(response.data.message);
            fetchParticipants();
        } catch (error) {
            console.error('Erreur à la participation event', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/events/${id}/delete/`, { withCredentials: true });
            navigate('/events');
        } catch (error) {
            console.error('Erreur lors de la suppression', error);
        }
    };

    const handleEdit = () => {
        navigate(`/events/${id}/edit`);
    };

    const togglePariticipantsListe = () => {
        setIsVisibleListe(!isVisibleListe);
    };

    return (
        <div className='event-detail'>
            <h1>Détails de l'événement</h1>
            {event ? (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Titre</th>
                                <th>Description</th>
                                <th>Date</th>
                                <th>Heure</th>
                                <th>Lieu</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{event.title}</td>
                                <td>{event.description}</td>
                                <td>{event.date}</td>
                                <td>{event.time}</td>
                                <td>{event.location}</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    {event.latitude && event.longitude && (
                        <LoadScript googleMapsApiKey="AIzaSyCFIgPo6v-OIHmxvjFFQexTvGe0f7VBrxo">
                            <GoogleMap
                                mapContainerStyle={{ height: '400px', width: '100%' }}
                                center={{ lat: event.latitude, lng: event.longitude }}
                                zoom={15}
                            >
                                <Marker position={{ lat: event.latitude, lng: event.longitude }} />
                            </GoogleMap>
                        </LoadScript>
                    )}

                    {event.creator !== currentUser && (
                        <div className='button-particip'>
                        <button onClick={handleParticipate}>Participer</button>
                        </div>
                    )}
                    <p style={{ color: 'red' }}>{loginMessage}</p>
                    <p style={{ color: 'green' }}>{isParticipate}</p>

                    <div>
                        {event.creator === currentUser && (
                            <div className='handle-btn-event'>
                                <button onClick={handleEdit}>Modifier l'événement</button>
                                <button onClick={handleDelete}>Supprimer l'événement</button>
                            </div>
                        )}
                    </div>

                    {currentUser && (
                        <h3 onClick={togglePariticipantsListe} style={{ cursor: 'pointer', display: 'flex', paddingTop: '10px' }}>
                            <span style={{ marginRight: '8px' }}>
                                <FontAwesomeIcon icon={isVisibleListe ? faChevronDown : faChevronRight} />
                            </span>
                            Liste des participants
                        </h3>
                    )}

                    {isVisibleListe && (
                        <ul>
                            {participants.map(participant => (
                                <li key={participant.id} style={{ display: 'flex', padding: '5px 0' }}>
                                    {participant.user__username}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ) : (
                <p>Chargement des détails...</p>
            )}
        </div>
    );
};

export default EventDetail;
