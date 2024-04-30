import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './components/SignIn';
import Home from './components/Home';
import Login from './components/LogIn'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />   // Default route for the home page
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} /> // Redirects any other path to Home
      </Routes>
    </Router>
  );
}

export default App;

