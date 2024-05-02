import React from 'react';
import './NavBar.css'; 
import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/"><img src="/logo.jpg" alt="Logo" /></Link>
            </div>
            <div className="navbar-links">
                <Link to="/quiz" className="btn">Quizzes</Link>
                <Link to="/signup" className="btn">Sign Up</Link>
                <Link to="/login" className="btn">Log In</Link>
            </div>
        </nav>
    );
};

export default Navbar;