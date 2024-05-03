import React from 'react';
import './NavBar.css'; 
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn }) => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src="/logo.png" alt="Logo" />
            </div>
            <div className="navbar-links">
                {isLoggedIn && <Link to="/quiz" className="btn">Quizzes</Link>}
                {!isLoggedIn && <Link to="/signup" className="btn">Sign Up</Link>}
                {!isLoggedIn && <Link to="/login" className="btn">Log In</Link>}
            </div>
        </nav>
    );
};

export default Navbar;
