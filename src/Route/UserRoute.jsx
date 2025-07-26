import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from '../pages/HomePage'; // ✅ This fixes the error
import Login from '../pages/LoginPage';
import Register from '../pages/SignUpPage';

const UserRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default UserRoute;
