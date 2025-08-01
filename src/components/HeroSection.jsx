import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/HeroSection.css';

const SportsHomepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const heroSlides = [
    {
      title: "Exceptional Musical Instruments",
      description: "Dive into the world of music with our wide range of instruments.",
      image: "heroo.png"  // changed from heroo.jpg to heroo.png
    },
    {
      title: "We bend the sound to your will",
      description: "From good music to good vibes. Experience the rhythm of life.",
      image: "herooo.jpg"
    }
  ];

  const sportsCategories = [
    {
      name: "Guitar",
      image: "guitar.png",  // changed from guitar.jpg to guitar.png
      route: "/Guitar"  //c
    },
    {
      name: "Piano",
      image: "piano.png",  // changed from piano.jpg to piano.png
      route: "/Piano"   //r
    },
    {
      name: "Flute",
      image: "flute.png",  // changed from flute.jpg to flute.png
      route: "/Flute"   //f
    },
    {
      name: "Drums",
      image: "drum.png",  // changed from drums.jpg to drums.png
      route: "/Drums" // t
    }
  ];

  return (
    <div className="sports-homepage">
      {/* Hero Section */}
      <div className="hero-section">
        <div 
          className="hero-slider"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {heroSlides.map((slide, index) => (
            <div key={index} className="hero-slide">
              <div className="hero-content">
                <h1 className="hero-title">
                  {slide.title}
                </h1>
                <p className="hero-description">
                  {slide.description}
                </p>
                <button className="hero-button" onClick={() => navigate('/product')}>
                  EXPLORE PRODUCTS
                </button>
              </div>
              <div className="hero-image-container">
                <img 
                  src={slide.image} 
                  alt="Musical Instrument" 
                  className="hero-image"
                />
                <div className="hero-image-overlay"></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Slide Indicators */}
        <div className="slide-indicators">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`slide-indicator ${currentSlide === index ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* Sports Categories Section */}
      <div className="sports-section">
        <h2 className="sports-title">SHOP BY Musical-Instrument</h2>
        <div className="sports-grid">
          {sportsCategories.map((sport, index) => (
            <div
              key={index}
              className="sport-card"
              onClick={() => navigate(sport.route)}
              style={{ cursor: 'pointer' }}
            >
              <img 
                src={sport.image} 
                alt={sport.name}
                className="sport-image"
              />
              <div className="sport-overlay"></div>
              <h3 className="sport-name">{sport.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SportsHomepage;
