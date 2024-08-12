import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import validateEmail from './utils';
import axios from 'axios';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isUserCreated, setIsUserCreated] = useState('');
  const [passwordError, setPasswordError] = useState(''); 
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();


  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setPasswordError('Le mot de passe doit comporter au moins 6 caractères.');
      return; 
    }

    if(!validateEmail(email)) {
      setEmailError(`L'email n'est pas valide.`);ù
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/signup/', { username, password }, { withCredentials: true });
      navigate('/signin');
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
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (validateEmail(e.target.value)) {
              setEmailError('');
            }
          }}
          required 
        />
        {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (e.target.value.length >= 6) {
              setPasswordError(''); 
            }
          }}
          required
        />
        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
        <p style={{ color: 'red' }}>{isUserCreated}</p>
        <button type="submit">S'enregistrer</button>
      </form>
      <button onClick={() => navigate('/signin')}>Connexion</button>
    </div>
  );
};

export default SignUp;
