import React, { useState, useContext } from 'react';
import userNotFound from './NotFound';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import {Ring} from 'react-css-spinners';

const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/signin/', { username, password }, { withCredentials: true });     
      setLoading(true);
      setTimeout(() => { 
      if (response.status === 200) {
        login(response.data.user);
        navigate('/events');
      } else{
        setError(true);
      }
    },1000)
    } catch (error) {
      console.error('Login failed', error);
      setError(true)
    }
  };

  return (
    <div className='my-ring'>
    {loading ? (<Ring color='#292F42' size={40}/>): (
    <div>
      <h2>Identifiez vous :</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && userNotFound()}
        <button type="submit">Connexion</button>
      </form>
      <button onClick={() => navigate('/signup')}>S'enregistrer</button>
    </div>
    )}
    </div>
  );
};

export default Signin;
