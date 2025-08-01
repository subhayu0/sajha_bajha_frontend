

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/SignUpPage.css';
import axios from 'axios';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({ message: "", success: false, errors: {} });
  const [pending, setPending] = useState(false);
  const [userData, setUserData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    const savedUserData = localStorage.getItem("registeredUsers");
    if (savedUserData) {
      try {
        setUserData(JSON.parse(savedUserData));
      } catch (error) {
        console.error("Error loading user data from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("registeredUsers", JSON.stringify(userData));
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (state.message) setState({ message: "", success: false, errors: {} });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);

    if (formData.password !== formData.confirmPassword) {
      setState({ message: "Passwords do not match.", success: false, errors: {} });
      setPending(false);
      return;
    }

    // Check for duplicate email
    const alreadyExists = userData.some((user) => user.email === formData.email);
    if (alreadyExists) {
      setState({ message: "Email is already registered.", success: false, errors: {} });
      setPending(false);
      return;
    }

    try {
      const { name, email, password } = formData;

      // API call to backend using fetch instead of axios
      const response = await fetch("http://localhost:5001/api/users", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      // Check if the response is ok (status in the range 200-299)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed. Please try again.');
      }

      const data = await response.json();
      console.log("Signup response:", data);

      // Create a new user object (insecure to store plain passwords in localStorage!)
      const newUser = { name, email, password };

      setUserData((prevData) => [...prevData, newUser]);

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      });

      setState({ message: "Account created successfully!", success: true, errors: {} });

      setPending(false);

      setTimeout(() => navigate("/LoginPage"), 1000);
    } catch (error) {
      console.error('Signup error:', error);
      setState({ message: error.message || "Registration failed. Please try again.", success: false, errors: {} });
      setPending(false);
    }
  };

  const handleDeleteUser = (index) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const updatedUserData = userData.filter((_, i) => i !== index);
      setUserData(updatedUserData);
      setState({ message: "User deleted successfully.", success: true, errors: {} });
    }
  };

  const handleClearAllData = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all registered users? This action cannot be undone."
      )
    ) {
      setUserData([]);
      setState({ message: "All user data cleared successfully.", success: true, errors: {} });
    }
  };

  return (
    <>
      <header>
        <nav>
          <div className="nav-left">
            <div className="logo">
              <img className="retro" src="/logo_sb.png" alt="logo" />
            </div>
          </div>
          <div className="nav-right">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/">Products</Link></li>
              <li><Link to="/">Contact</Link></li>
              <li><Link to="/">About</Link></li>
            </ul>
          </div>
        </nav>
      </header>

      <main>
        <section>
          <div
            className="welcomesection"
            style={{ backgroundImage: "url('/hello.png')" }}
          ></div>
          <div className="detailsection">
            <h2>Create an Account</h2>
            <span className="subtext">Enter your details below</span>
            {state.message && (
              <p
                style={{
                  color: state.success ? "green" : "red",
                  marginTop: "10px",
                }}
              >
                {state.message}
              </p>
            )}
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              <div
                className="loginbtn"
                style={{ justifyContent: "center", gap: "0", marginTop: "10px" }}
              >
                <button
                  type="submit"
                  className="primary-btn"
                  disabled={pending}
                  aria-label="Create account"
                >
                  {pending ? "Creating..." : "Create Account"}
                </button>
              </div>
              <p className="signup-text">
                Already have an account?{" "}
                <Link to="/loginPage">
                  <u>Log in</u>
                </Link>
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="footerfirst">
          <img src="/logo_sb.png" alt="logo" />
          <br />
          Copyright © 2025 - All rights reserved.
        </div>
        <div className="footersecond">
          <h3>Contact Us</h3>
          <p>Email: instruments@sajhabajha.com</p>
          <p>Phone: +977-9841123463</p>
          <p>Address: Baneswor, Kathmandu, Nepal</p>
        </div>
        <div className="footerthird">
          <h3>Follow us</h3>
          <a href="/"><img src="/instalogo.png" alt="Instagram" /></a>
          <a href="/"><img src="/twitterlogo.png" alt="Twitter" /></a>
          <a href="/"><img src="/facebook.png" alt="Facebook" /></a>
          <a href="/"><img src="/githublogo.png" alt="GitHub" /></a>
        </div>
      </footer>
    </>
  );
};

export default SignUpPage;