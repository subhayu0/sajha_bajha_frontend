import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

export const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user?.isAdmin ? children : <Navigate to="/loginPage" />;
};

export const UserRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user && !user.isAdmin ? children : <Navigate to="/loginPage" />;
};
