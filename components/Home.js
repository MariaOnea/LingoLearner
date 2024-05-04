import React from 'react';
import NavBar from './NavBar'; // Assuming NavBar is correctly imported
import scrollImage from './scroll.png'; // Path to your background image
import arrowIcon from './arrow.png'; // Path to your icon image
import './Home.css';
import Footer from './Footer';
const Home = () => {
  const scrollToContent = () => {
    document.getElementById('content').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="Home">
      <div className="full-screen-background" onClick={scrollToContent}>
        <button className="scroll-button">
          Learn More
          <img src={arrowIcon} alt="Arrow" className="button-icon" />
        </button>
      </div>
      <div id="content" className="content-section">
        <h2>Discover More About LingoLearner!</h2>
        <p>Welcome to LingoLearner, where your journey to master a new language begins. With our innovative approach, we empower learners of all levels to dive into new cultures and communicate with confidence. Discover a world of languages at your fingertips—inspiration, proficiency, and fun await!</p>
        <h2>Explore Key Features of LingoLearner</h2>
        <ul>
          <li><strong>Dynamic Quizzes:</strong> Test your skills with our versatile quizzes featuring three unique question types—write what you hear from a recording, describe what you see in an image, and transcribe what you watch in a video. After completing a quiz, receive your score to track your progress and identify areas for improvement.</li>
          <li><strong>Multimedia Resources:</strong> Learn with a mix of media – videos, images and recordings – that make learning dynamic and keep you engaged. Each resource is crafted to help you master language skills effectively while having fun.</li>
          <li><strong>Customizable User Profiles:</strong> Enhance your learning experience by personalizing your profile. Add a nickname, choose a profile picture, select your favorite language, and write a personal description to make your learning journey uniquely yours.</li>
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
