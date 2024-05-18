import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { logout } from '../services/authService';  // Ensure this is imported correctly
import logo from './logo.png';
const Navbar = ({ isLoggedIn }) => {
    const handleLogout = async () => {
        await logout();
        // Optionally handle any post-logout logic like state updates here
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">  {/* This makes the logo a link to the homepage */}
                    <img src={logo} alt="Logo" />
                </Link>
            </div>
            <div className="navbar-links">
                {isLoggedIn && (
                    <>
                        <Link to="/quiz" className="btn">Teste</Link>
                        <div className='divider'/>
                        <button onClick={handleLogout} className="btn">Log Out</button>
                    </>
                )}
                {!isLoggedIn && <Link to="/signup" className="btn">Sign Up</Link>}
                <div className='divider'/>
                {!isLoggedIn && <Link to="/login" className="btn">Log In</Link>}
            </div>
        </nav>
    );
};

export default Navbar;
