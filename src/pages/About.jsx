import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/About.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div className="about-wrapper">
        <div className="about-left">
          <img src="/aboutguitar.png" alt="Guitar" className="img-guitar" />
          {/* <img src="/rugbyabout.jpg" alt="Rugby" className="img-rugby" /> */}
          <div className="ratings-card">
            <p>Best ratings</p>
            <div className="rating-bar">
              <div className="rating-fill" />
            </div>
            <div className="emojis">😐 😁 😊 😍 😎</div>
          </div>
        </div>

        <div className="about-right">
          <img src="/musicitems.png" alt="Sports Items" className="sports-banner" />
          <p className="small-heading">A BIT</p>
          <h2 className="main-heading">ABOUT US</h2>
          <p className="description">
            Sajha-Bajha means 'shared rhythm,' is your destination for quality 
            musical instruments. We believe every instrument tells a story. 
            From beginners to pros, weoffer a curated selection of guitars, drums,
            piano, and more to help you find your sound and share your music with the world.
          </p>
          <button className="explore-btn" onClick={() => navigate('/dashboard')}>
            EXPLORE MORE
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
