import React, { useState } from 'react';
import './SignIn.css'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../firebaseConfig';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6; // Ensure password is at least 6 characters
  };

  const handleSignUp = async () => {
    setError('');
    if (!email || !validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }
    if (!password || !validatePassword(password)) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User created:', user.uid);

      // Store user information in Firestore
      await setDoc(doc(db, "Users", user.uid), {
        email,
        fullName,
        createdAt: new Date().toISOString() // Store the date and time the account was created
      });

      setSuccess("You have signed up successfully!");
    } catch (error) {
      setError(`Error signing up: ${error.message}`);
      setSuccess('');
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <div className='field'>

      <input
        type="text"
        id="fullName"
        name="fullName"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder=" "
        required
      />
      <label for="fullName">Full Name</label>
      </div>
       <div className='field'>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder=" "
        required
      />
      <label for="email">Email</label>
      </div>
       <div className='field'>

      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder=" "
        required
      />
       <label for="password">Password</label>
      </div>
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
    
  );
};

export default SignIn;
