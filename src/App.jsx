// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import HomePage from './pages/HomePage';
// import ShopPage from './pages/ShopPage';
// import CartPage from './pages/CartPage';
// import LoginPage from './pages/LoginPage';
// import SignUpPage from './pages/SignupPage';
// import DashboardPage from './pages/DashboardPage';
// import AdminLoginPage from './pages/AdminLoginPage';
// import AdminDashboard from './pages/AdminDashboard';
// import AdminCustomerQueries from './pages/AdminCustomerQueries';
// import AdminOrderHistory from './pages/AdminOrderHistory';
// import AdminAddProduct from './pages/AdminAddProduct';
// import ForgotPasswordPage from './pages/ForgotPasswordPage';

// function App() {
//   const [user, setUser] = useState(null);
//   const [admin, setAdmin] = useState(null);
//   const [cartItems, setCartItems] = useState([]);

//   // Load user and cart from localStorage on app start
//   useEffect(() => {
//     const savedUser = localStorage.getItem('user');
//     const savedAdmin = localStorage.getItem('admin');
//     const savedCart = localStorage.getItem('cartItems');
    
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//     if (savedAdmin) {
//       setAdmin(JSON.parse(savedAdmin));
//     }
//     if (savedCart) {
//       setCartItems(JSON.parse(savedCart));
//     }
//   }, []);

//   // Save cart to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem('cartItems', JSON.stringify(cartItems));
//   }, [cartItems]);

//   const handleLogin = (userData) => {
//     setUser(userData);
//     localStorage.setItem('user', JSON.stringify(userData));
//   };

//   const handleAdminLogin = (adminData) => {
//     setAdmin(adminData);
//     localStorage.setItem('admin', JSON.stringify(adminData));
//   };

//   const handleLogout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//   };

//   const handleAdminLogout = () => {
//     setAdmin(null);
//     localStorage.removeItem('admin');
//   };

//   const handleAddToCart = (product) => {
//     setCartItems((prevItems) => {
//       const existingItem = prevItems.find(item => item.id === product.id);
//       if (existingItem) {
//         return prevItems.map(item =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         return [...prevItems, { ...product, quantity: 1 }];
//       }
//     });
//   };

//   const handleUpdateQuantity = (id, quantity) => {
//     if (quantity <= 0) {
//       setCartItems(prevItems => prevItems.filter(item => item.id !== id));
//     } else {
//       setCartItems(prevItems =>
//         prevItems.map(item =>
//           item.id === id ? { ...item, quantity } : item
//         )
//       );
//     }
//   };

//   const handleRemoveFromCart = (id) => {
//     setCartItems(prevItems => prevItems.filter(item => item.id !== id));
//   };

//   const getTotalItems = () => {
//     return cartItems.reduce((total, item) => total + item.quantity, 0);
//   };

//   return (
//     <Router>
//       <div className="min-h-screen flex flex-col">
//         <Header 
//           user={user} 
//           cartItems={getTotalItems()} 
//           onLogout={handleLogout} 
//         />
        
//         <main className="flex-1">
//           <Routes>
//             <Route path="/" element={<HomePage onAddToCart={handleAddToCart} />} />
//             <Route path="/shop" element={<ShopPage onAddToCart={handleAddToCart} />} />
//             <Route 
//               path="/cart" 
//               element={
//                 <CartPage 
//                   cartItems={cartItems}
//                   onUpdateQuantity={handleUpdateQuantity}
//                   onRemoveFromCart={handleRemoveFromCart}
//                 />
//               } 
//             />
//             <Route 
//               path="/login" 
//               element={
//                 user ? <Navigate to="/dashboard" /> : <LoginPage onLogin={handleLogin} />
//               } 
//             />
//             <Route
//               path="/signup"
//               element={
//                 user ? <Navigate to="/dashboard" /> : <SignUpPage onLogin={handleLogin} />
//               }
//             />
//             <Route 
//               path="/dashboard" 
//               element={
//                 user ? <DashboardPage user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
//               } 
//             />
            
//             {/* Admin Routes */}
//             <Route 
//               path="/admin/login" 
//               element={
//                 admin ? <Navigate to="/admin/dashboard" /> : <AdminLoginPage onLogin={handleAdminLogin} />
//               } 
//             />
//             <Route 
//               path="/admin/dashboard" 
//               element={
//                 admin ? <AdminDashboard admin={admin} onLogout={handleAdminLogout} /> : <Navigate to="/admin/login" />
//               } 
//             />
//             <Route 
//               path="/admin/customers" 
//               element={
//                 admin ? <AdminCustomerQueries admin={admin} onLogout={handleAdminLogout} /> : <Navigate to="/admin/login" />
//               } 
//             />
//             <Route 
//               path="/admin/orders" 
//               element={
//                 admin ? <AdminOrderHistory admin={admin} onLogout={handleAdminLogout} /> : <Navigate to="/admin/login" />
//               } 
//             />
//             <Route 
//               path="/admin/add-product" 
//               element={
//                 admin ? <AdminAddProduct admin={admin} onLogout={handleAdminLogout} /> : <Navigate to="/admin/login" />
//               } 
//             />
//             <Route path="/forgot-password" element={<ForgotPasswordPage />} />
//           </Routes>
//         </main>
        
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminCustomerQueries from './pages/AdminCustomerQueries';
import AdminOrderHistory from './pages/AdminOrderHistory';
import AdminAddProduct from './pages/AdminAddProduct';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

function App() {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  // Load user and cart from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedAdmin = localStorage.getItem('admin');
    const savedCart = localStorage.getItem('cartItems');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedAdmin) {
      setAdmin(JSON.parse(savedAdmin));
    }
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleAdminLogin = (adminData) => {
    setAdmin(adminData);
    localStorage.setItem('admin', JSON.stringify(adminData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const handleAdminLogout = () => {
    setAdmin(null);
    localStorage.removeItem('admin');
  };

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleRemoveFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header 
          user={user} 
          cartItems={getTotalItems()} 
          onLogout={handleLogout} 
        />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage onAddToCart={handleAddToCart} />} />
            <Route path="/shop" element={<ShopPage onAddToCart={handleAddToCart} />} />
            <Route 
              path="/cart" 
              element={
                <CartPage 
                  cartItems={cartItems}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveFromCart={handleRemoveFromCart}
                />
              } 
            />
            <Route 
              path="/login" 
              element={
                user ? <Navigate to="/dashboard" /> : <LoginPage onLogin={handleLogin} />
              } 
            />
            <Route
              path="/signup"
              element={
                user ? <Navigate to="/dashboard" /> : <SignUpPage />
              }
            />
            <Route 
              path="/dashboard" 
              element={
                user ? <DashboardPage user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
              } 
            />
            
            {/* Admin Routes */}
            <Route 
              path="/admin/login" 
              element={
                admin ? <Navigate to="/admin/dashboard" /> : <AdminLoginPage onLogin={handleAdminLogin} />
              } 
            />
            <Route 
              path="/admin/dashboard" 
              element={
                admin ? <AdminDashboard admin={admin} onLogout={handleAdminLogout} /> : <Navigate to="/admin/login" />
              } 
            />
            <Route 
              path="/admin/customers" 
              element={
                admin ? <AdminCustomerQueries admin={admin} onLogout={handleAdminLogout} /> : <Navigate to="/admin/login" />
              } 
            />
            <Route 
              path="/admin/orders" 
              element={
                admin ? <AdminOrderHistory admin={admin} onLogout={handleAdminLogout} /> : <Navigate to="/admin/login" />
              } 
            />
            <Route 
              path="/admin/add-product" 
              element={
                admin ? <AdminAddProduct admin={admin} onLogout={handleAdminLogout} /> : <Navigate to="/admin/login" />
              } 
            />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;