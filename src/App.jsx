// src/App.jsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import UserRoute from './Route/UserRoute';

function App() {
  return (
    <BrowserRouter>
      <UserRoute />
    </BrowserRouter>
  );
}

export default App;
