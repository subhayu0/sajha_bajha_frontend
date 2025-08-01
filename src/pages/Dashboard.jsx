import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import NewArrivals from '../components/NewArrivals';
import HeroSection from '../components/HeroSection';
import BestSellers from '../components/BestSellers';
import BrandsWeCarry from '../components/BrandsWeCarry';
import Header from '../components/Header';


const HomePage = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <BestSellers />
      <NewArrivals />
      <BrandsWeCarry />
      <Footer />
    </div>
  );
};

export default HomePage;
