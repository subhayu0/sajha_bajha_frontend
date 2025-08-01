import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage'; 
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import About from './pages/About';
import Account from './pages/Account';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Product from './pages/Product';
import ProductDetail from './pages/ProductDetail';
import MyOrders from './pages/MyOrders';
import Guitar from './pages/Guitar';  
import Flute from './pages/Flute';
import Piano from './pages/Piano';
import Drums from './pages/Drums';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import AdminDashboard from './admin_pages/AdminDashboard';

import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { AdminRoute, UserRoute } from './ProtectedRoutes';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/loginPage" element={<LoginPage />} />
              <Route path="/dashboard" element={
                <UserRoute>
                  <Dashboard />
                </UserRoute>
              } />
              <Route path="/admin/*" element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } />
              <Route path="/admin-dashboard" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/account" element={<Account />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/product" element={<Product />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/guitar" element={<Guitar />} />
              <Route path="/flute" element={<Flute />} />
              <Route path="/piano" element={<Piano />} />
              <Route path="/drums" element={<Drums />} />
              <Route path="/my-orders" element={
                <UserRoute>
                  <MyOrders />
                </UserRoute>
              } />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
