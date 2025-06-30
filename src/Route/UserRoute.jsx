import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from '../pages/Home'; // ✅ This fixes the error
import Login from '../pages/Login';
import Register from '../pages/Register';

const UserRoute = () => {
  return (
    <Routes>
      <Route path="/home" element={<Homepage />} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default UserRoute;
