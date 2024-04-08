import React from 'react';
import './aboutUsPage.css'; // Make sure to create this CSS file

const AboutUs = () => {
  return (
    <div className='page'>
    <div className="about-us-container">
      <h2 className="about-us-header">About Us</h2>
      <p className="about-us-text">
        Welcome to our website! We are a passionate team dedicated to providing
        quality apps for schools
      </p>
      <p className="about-us-text">
        Our mission is to make the life of teachers easier so they can keep going and teach the younger generation.
      </p>
    </div>
    </div>
  );
};

export default AboutUs;