import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Product.css';
import Footer from '../components/Footer';
import Header from '../components/Header';

const App = () => {
    return (
        <>
            <Header/>
            <div className="app-container">
                <h1 className="page-title">EXPLORE PRODUCTS BY SPORTS</h1>

                <div className="sports-categories-container">
                    <SportCard
                        title="Guitar"
                        description="Let the string of musics bounce your heart."
                        imageUrl="./aboutguitar.png"
                        altText="Playing Guitar"
                        navigateTo="/Guitar"
                    />

                    <SportCard
                        title="FLute"
                        description="Discover the soulful charm of the flute — where every breath creates a melody that speaks to the heart."
                        imageUrl="./aboutflute.png"
                        altText="Playing Flute"
                        navigateTo="/Flute"
                    />

                    <SportCard
                        title="Piano"
                        description="Unleash your inner maestro with the piano — where every key unlocks a world of emotion and harmony."
                        imageUrl="./aboutpiano.png"
                        altText="Playing Piano"
                        navigateTo="/Piano"
                    />

                    <SportCard
                        title="Drums"
                        description="Feel the pulse of music with drums — ignite your rhythm and bring every beat to life."
                        imageUrl="./aboutdrums.png"
                        altText="Playing Drums"
                        navigateTo="/Drums"
                    />
                </div>
            </div>
            <Footer />
        </>
    );
};

const SportCard = ({ title, description, imageUrl, altText, navigateTo }) => {
    const navigate = useNavigate();

    return (
        <div className="sport-card">
            <img
                src={imageUrl}
                alt={altText}
                className="sport-card-image"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/800x400/4B0082/FFFFFF?text=Image+Not+Available`;
                }}
            />
            <div className="sport-card-overlay">
                <h2 className="sport-card-title">{title}</h2>
                <p className="sport-card-description">{description}</p>
                <button
                    className="explore-button"
                    onClick={() => navigate(navigateTo)}
                >
                    Explore Now
                </button>
            </div>
        </div>
    );
};

export default App;
