import React, { useState, useEffect } from 'react';
import '../style/NotFound.css';

const NotFoundPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="container">
      {/* Floating Background Elements */}
      <div className="floating-elements">
        <div className="floating-ball ball1"></div>
        <div className="floating-ball ball2"></div>
        <div className="floating-ball ball3"></div>
      </div>
      
      {/* Mouse Follower */}
      <div 
        className="mouse-follower" 
        style={{
          transform: `translate(${mousePosition.x - 10}px, ${mousePosition.y - 10}px)`
        }}
      ></div>
      
      {/* Sports Icons */}
      <div className="sports-icon icon1">⚽</div>
      <div className="sports-icon icon2">🏀</div>
      <div className="sports-icon icon3">🏈</div>
      
      {/* Main Content */}
      <div className="content">
        <div className="logo">Sajha-Bajha</div>
        
        <div className="error-number">404</div>
        
        <h1 className="title">Oops! Page Not Found</h1>
        
        <p className="subtitle">
          Looks like this page took a timeout! Don't worry, we'll help you get back in the game.
        </p>
        
        <div className="button-container">
          <a href="/" className="button">
            <svg className="home-icon" viewBox="0 0 24 24">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9,22 9,12 15,12 15,22"></polyline>
            </svg>
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
