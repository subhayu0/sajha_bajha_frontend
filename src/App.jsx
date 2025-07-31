import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import ShopPage from './pages/ShopPage.jsx'
import CartPage from './pages/CartPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import AdminLoginPage from './pages/admin/AdminLoginPage.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminAddProduct from './pages/admin/AdminAddProduct.jsx'
import AdminOrderHistory from './pages/admin/AdminOrderHistory.jsx'
import AdminCustomerQueries from './pages/admin/AdminCustomerQueries.jsx'
// Removed import of UserRoute as the file does not exist
// import UserRoute from './Route/UserRoute.jsx'

function App() {
  const [user, setUser] = useState(null)
  const [admin, setAdmin] = useState(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    const savedAdmin = localStorage.getItem('admin')
    
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    
    if (savedAdmin) {
      setAdmin(JSON.parse(savedAdmin))
    }
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const handleAdminLogin = (adminData) => {
    setAdmin(adminData)
    localStorage.setItem('admin', JSON.stringify(adminData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const handleAdminLogout = () => {
    setAdmin(null)
    localStorage.removeItem('admin')
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header user={user} onLogout={handleLogout} />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/cart" element={<CartPage />} />
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
              path="/admin/add-product" 
              element={
                admin ? <AdminAddProduct /> : <Navigate to="/admin/login" />
              } 
            />
            <Route 
              path="/admin/orders" 
              element={
                admin ? <AdminOrderHistory /> : <Navigate to="/admin/login" />
              } 
            />
            <Route 
              path="/admin/queries" 
              element={
                admin ? <AdminCustomerQueries /> : <Navigate to="/admin/login" />
              } 
            />
            
            {/* Other Routes */}
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            
            {/* Removed UserRoute as file does not exist */}
            {/* <Route path="/user/*" element={<UserRoute user={user} />} /> */}
            
            {/* 404 Route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  )
}

export default App
