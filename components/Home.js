import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (<div>
  <h1>Welcome to the Home Page!</h1>
  <Link to="/signin">Sign In</Link>
  <Link to="/login">Log In</Link>
  
</div>);
};

export default Home;
