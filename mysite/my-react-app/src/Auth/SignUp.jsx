import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isUserCreated, setIsUserCreated] = useState('')
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/signup/', { username, password }, {withCredentials:true});
      navigate('/Signin');
      } catch (error) {        
          console.error('Sign Up failed', error.response.data);
          setIsUserCreated(error.response.data.error);
        }
      };

  return (
    <div>
      <h2>Remplissez le formulaire :</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input 
        type="email"
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required 
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p style={{color: 'red'}}>{isUserCreated}</p>
        <button type="submit">S'enregistrer</button>
      </form>
      <button onClick={()=>navigate('/signin')}>Connexion</button>
    </div>
  );
};

export default SignUp;
