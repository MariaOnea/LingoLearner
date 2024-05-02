import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Login from './components/LogIn'; 
import Quiz from './components/Quiz'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="*" element={<Navigate to="/" replace />} /> 
      </Routes>
    </Router>
  );
}

export default App;

