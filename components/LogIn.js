import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import './LogIn.css'

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }


        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Logged in successfully");
            navigate('/'); // Redirect to home after successful login
        } catch (error) {
            setError(`Login failed: ${error.message}`);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className='field'>
            <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
            />
            <label for="email">Email</label>
            </div>
            <div className='field'>
            <input
                type="password"
                id = "password"
                name = "password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
            />
            <label for="password">Password</label>
            </div>
            <button className="buton" onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
