// import React, { useState } from 'react';
// import axios from 'axios';

// const SignUp = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post('http://localhost:8000/api/signup/', 
//             { username, password },);            
//             setUsername('');
//             setPassword('');
            
//         } catch (error) {
//             console.log('Error signup');
            
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
//             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
//             <button type="submit">Sign Up</button>
//         </form>
//     );
// };

// export default SignUp;

import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/signup/',{ username, password },);

            console.log(response.data)
            setUsername('');
            setPassword('');
        } catch (error) {
            console.error('Error signing up:', error.response.data);        
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignUp;
