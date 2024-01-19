import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const Login1 = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate=useNavigate();

    const handleLogin = async () => {
      try {
        const response = await fetch('http://localhost:5000/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
       
        if (!response.ok) {
          throw new Error('Invalid credentials');
        }
        const data = await response.json();
        
        console.log('Login successful!', data);

       navigate('/sidebar')
      } catch (error) {
        setError('Invalid credentials. Please try again.');
      }
    };

    return (
        <div>
            <div>
                <h2>Login</h2>
                <div>
                    <label>Username:</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button onClick={handleLogin}>Login</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
};

export default Login1