import React, { useState, useEffect } from 'react';
import '../style/Account.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { updateUserProfile } from '../context/api';
import { useAuth } from '../context/AuthContext.jsx';

const ProfileEdit = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch user data on mount
  useEffect(() => {
    if (user) {
      // Split the name into first and last name
      const nameParts = user.name ? user.name.split(' ') : [];
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      setForm(f => ({
        ...f,
        firstName,
        lastName,
        email: user.email || '',
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit called");
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Validate password confirmation
      if (form.newPassword !== form.confirmNewPassword) {
        setError('New password and confirm password do not match');
        setLoading(false);
        return;
      }
      
      // Prepare data for API call
      const data = {
        firstName: form.firstName,
        lastName: form.lastName,
        currentPassword: form.currentPassword || undefined,
        newPassword: form.newPassword || undefined
      };
      
      // Only send password fields if they are not empty
      if (!data.currentPassword) delete data.currentPassword;
      if (!data.newPassword) delete data.newPassword;
      
      // Call the API
      const response = await updateUserProfile(data);
      
      if (response.data) {
        setSuccess('Profile updated successfully!');
      } else {
        setError('Failed to update profile');
      }
    } catch (err) {
      console.error('Profile update error:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred while updating profile');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="profile-container">
        <div className="profile-left">
          <img
            src="/profile-icon.png"
            alt="Profile Icon"
            className="profile-image"
          />
        </div>

        <div className="profile-right">
          <h2>Edit Your Profile</h2>

          <form className="profile-form" onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            <div className="form-row">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                disabled // Usually email is not editable
              />
            </div>

            <p className="password-label">Password Changes</p>
            <div className="form-row">
              <input
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                value={form.currentPassword}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={form.newPassword}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <input
                type="password"
                name="confirmNewPassword"
                placeholder="Confirm New Password"
                value={form.confirmNewPassword}
                onChange={handleChange}
              />
            </div>

            <div className="form-buttons">
              <button className="cancel-btn" type="button">Cancel</button>
              <button className="save-btn" type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileEdit;