import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Home.css';

const Home = () => {
  const navigate = useNavigate();

  const goToEventList = () => {
    navigate('/events');
  };

  return (
    <div className="home-container">
      <div className="background">
        <button className="event-button" onClick={goToEventList}>Liste des événements</button>
      </div>
    </div>
  );
};

export default Home;
