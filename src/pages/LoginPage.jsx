
// import React, { useState, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Header from '../components/Header.jsx';
// import Footer from '../components/Footer.jsx';
// import '../style/LoginPage.css';
// import axios from 'axios';
// import { AuthContext } from '../context/AuthContext.jsx';

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [pending, setPending] = useState(false);
//   const [error, setError] = useState('');

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     if (error) setError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setPending(true);
//     setError('');

//     try {
//       const { email, password } = formData;

//       const response = await axios.post('http://localhost:5001/api/auth/login', {
//         email,
//         password,
//       });

//       console.log("Login response:", response.data);

//       // ✅ Extract user from nested response
//       const userData = response.data?.data?.user;
//       const token = response.data?.data?.access_token;

//       console.log("User data from login:", userData);
//       console.log("Token from login:", token);

//       if (!userData) {
//         setError("Invalid login response: user data missing.");
//         return;
//       }

//       if (!token) {
//         setError("Invalid login response: token missing.");
//         return;
//       }

//       // Store token in localStorage
//       localStorage.setItem('access_token', token);
//       console.log('Token stored in localStorage:', localStorage.getItem('access_token'));

//       // Call login function from AuthContext
//       login(userData, token);
//       console.log('Login function called with:', { userData, token });

//       // ✅ Safe redirect based on user role
//       if (userData.isAdmin) {
//         console.log('User is admin, redirecting to admin dashboard');
//         navigate('/admin-dashboard');
//       } else {
//         console.log('User is not admin, redirecting to dashboard');
//         navigate('/dashboard');
//       }
//     } catch (err) {
//       console.error('Login error:', err);
//       const errMsg = err.response?.data?.message || err.message || 'Login failed. Please try again.';
//       setError(errMsg);
//     } finally {
//       setPending(false);
//     }
//   };

//   return (
//     <>
//       <Header />
//       <main>
//         <section>
//           <div className="welcomesection" style={{ backgroundImage: "url('/hero.png')" }}></div>
//           <div className="detailsection">
//             <h2>Log in to Retrocrug</h2>
//             <span className="subtext">Enter your details below</span>
//             {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
//             <form onSubmit={handleSubmit}>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email or Phone Number"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 required
//               />
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 required
//               />
//               <div className="loginbtn" style={{ marginTop: '10px' }}>
//                 <button type="submit" className="primary-btn" disabled={pending}>
//                   {pending ? 'Logging in...' : 'Log in'}
//                 </button>
//                 <a href="#">Forgot password?</a>
//               </div>
//               <p className="signup-text">
//                 Don't have an account? <Link to="/signup"><u>Sign up</u></Link>
//               </p>
//             </form>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </>
//   );
// };

// export default LoginPage;




import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import '../style/LoginPage.css';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext.jsx';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    setError('');

    try {
      const { email, password } = formData;

      // Use the API instance from context/api.js instead of direct axios call
      // This ensures consistent configuration and error handling
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      // Check if the response is ok (status in the range 200-299)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed. Please try again.');
      }

      const data = await response.json();
      console.log("Login response:", data);

      // ✅ Extract user from nested response
      const userData = data?.data?.user;
      const token = data?.data?.access_token;

      console.log("User data from login:", userData);
      console.log("Token from login:", token);

      if (!userData) {
        setError("Invalid login response: user data missing.");
        return;
      }

      if (!token) {
        setError("Invalid login response: token missing.");
        return;
      }

      // Store token in localStorage
      localStorage.setItem('access_token', token);
      console.log('Token stored in localStorage:', localStorage.getItem('access_token'));

      // Call login function from AuthContext
      login(userData, token);
      console.log('Login function called with:', { userData, token });

      // ✅ Safe redirect based on user role
      if (userData.isAdmin) {
        console.log('User is admin, redirecting to admin dashboard');
        navigate('/admin-dashboard');
      } else {
        console.log('User is not admin, redirecting to dashboard');
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <Header />
      <main>
        <section>
          <div className="welcomesection" style={{ backgroundImage: "url('/hello.png')" }}></div>
          <div className="detailsection">
            <h2>Log in to Sajha-Bajha</h2>
            <span className="subtext">Enter your details below</span>
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email or Phone Number"
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
              <div className="loginbtn" style={{ marginTop: '10px' }}>
                <button type="submit" className="primary-btn" disabled={pending}>
                  {pending ? 'Logging in...' : 'Log in'}
                </button>
                <a href="#">Forgot password?</a>
              </div>
              <p className="signup-text">
                Don't have an account? <Link to="/signup"><u>Sign up</u></Link>
              </p>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default LoginPage;