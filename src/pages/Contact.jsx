import React, { useState } from 'react';
// import { Phone, Mail, MapPin, Send } from 'lucide-react';
import '../style/Contact.css'; 
import Footer from '../components/Footer';
import Header from '../components/Header';
import { sendContactMessage } from '../context/api';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    error: false,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({
      success: false,
      error: false,
      message: ''
    });

    try {
      // Format data to match what the backend expects
      const formattedData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        message: formData.message
      };
      
      console.log('Sending contact message:', formattedData);
      await sendContactMessage(formattedData);
      
      setSubmitStatus({
        success: true,
        error: false,
        message: 'Your message has been sent successfully! We will get back to you soon.'
      });
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus({
        success: false,
        error: true,
        message: 'Failed to send message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
        <Header />
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-subtitle">Any question or remarks? Just write us a message!</p>
      <div className="contact-card">
        <div className="contact-info">
          <h2>Contact Information</h2>
          <ul>
            <li><span className="icon">📞</span>9841123463</li>
            <li><span className="icon">✉️</span>instruments@sajhabajha.com</li>
            <li><span className="icon">📍</span>Baneswor,kathmandu,Nepal</li>
          </ul>
          <div className="info-decor" />
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          {submitStatus.success && (
            <div className="success-message">{submitStatus.message}</div>
          )}
          {submitStatus.error && (
            <div className="error-message">{submitStatus.message}</div>
          )}
          <div className="row">
            <input 
              type="text" 
              name="firstName"
              placeholder="First Name" 
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input 
              type="text" 
              name="lastName"
              placeholder="Last Name" 
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="row">
            <input 
              type="email" 
              name="email"
              placeholder="Email" 
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input 
              type="text" 
              name="phone"
              placeholder="Phone Number" 
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <textarea 
            name="message"
            placeholder="Write your message.."
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
      
    </div>
    <Footer />
    </div>
  );
}