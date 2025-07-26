"use client"

import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import ShopPage from "./pages/ShopPage"
import DashboardPage from "./pages/DashboardPage"

function App() {
  const [user, setUser] = useState(null)
  const [cartItems, setCartItems] = useState(0)

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
  }

  const addToCart = () => {
    setCartItems((prev) => prev + 1)
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header user={user} cartItems={cartItems} onLogout={handleLogout} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage onAddToCart={addToCart} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/shop" element={<ShopPage onAddToCart={addToCart} />} />
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage onLogin={handleLogin} />} />
            <Route
              path="/signup"
              element={user ? <Navigate to="/dashboard" /> : <SignupPage onLogin={handleLogin} />}
            />
            <Route
              path="/dashboard"
              element={user ? <DashboardPage user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
