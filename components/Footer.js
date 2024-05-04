import React from 'react';
import './Footer.css'; // Path to your CSS file for styling the footer
import linkedin from './linkedin.png'
import github from './github.png'
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
      <p>Copyright © {new Date().getFullYear()} LingoLearner. All rights reserved.</p>
      <p>Contact us at contact@lingolearner.com</p>
      </div>
      <div className='social-media'>
      <a href='https://www.linkedin.com/in/maria-teodora-onea/' target="_blank" rel="noopener noreferrer">
        <img src={linkedin} alt="linkedin-page" className="linkedin" />
      </a>
      <div className='divider'></div>
      <a href='https://github.com/MariaOnea' target="_blank" rel="noopener noreferrer">
        <img src={github} alt="github-page" className="github" />
      </a>
      </div>
    </footer>
  );
}

export default Footer;
