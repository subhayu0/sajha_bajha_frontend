import React, { useState, useEffect, useContext } from 'react';
import { getContactMessages, markContactMessageAsRead, deleteContactMessage } from '../context/api';
import { AuthContext, useAuth } from '../context/AuthContext';
import '../style/ContactMessages.css';

const ContactMessages = () => {
  const { user, token, checkAuthState } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch messages on component mount   
  useEffect(() => {
    console.log('ContactMessages component mounted');
    // Check authentication state
    const authState = checkAuthState();
    console.log('Auth state in ContactMessages:', authState);
    
    // Delay the fetch to ensure auth state is properly loaded
    setTimeout(() => {
      fetchMessages();
    }, 500);
  }, [user, token, checkAuthState]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      
      // Check if user is admin before making the request
      // The user object might be nested inside another user object from the JWT token
      const isAdmin = user?.isAdmin || user?.user?.isAdmin;
      
      if (!user || !isAdmin) {
        console.log('Access denied check - User:', user);
        console.log('Access denied check - isAdmin:', isAdmin);
        setError('Access denied: Admin privileges required');
        setLoading(false);
        return;
      }
      
      console.log('User object:', user);
      console.log('Token:', token);
      console.log('Is admin:', isAdmin);
      
      const response = await getContactMessages();
      console.log('API Response:', response); // Debug log
      // Check the structure of the response
      if (response.data && response.data.data) {
        setMessages(response.data.data);
      } else if (response.data) {
        // If the response structure is different
        setMessages(response.data);
      } else {
        setMessages([]);
        setError('Unexpected response format');
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching messages:', err);
      console.error('Error details:', err.response?.data || err.message);
      setError('Failed to load messages. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    setShowModal(true);
    
    // If message is unread, mark it as read
    if (!message.isRead) {
      handleMarkAsRead(message.id);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markContactMessageAsRead(id);
      // Update the messages list
      setMessages(messages.map(msg => 
        msg.id === id ? { ...msg, isRead: true } : msg
      ));
      
      // Also update the selected message if it's the one being marked as read
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage({ ...selectedMessage, isRead: true });
      }
    } catch (err) {
      console.error('Error marking message as read:', err);
    }
  };

  const handleDeleteMessage = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteContactMessage(id);
        // Remove the message from the list
        setMessages(messages.filter(msg => msg.id !== id));
        
        // Close modal if the deleted message was selected
        if (selectedMessage && selectedMessage.id === id) {
          setShowModal(false);
          setSelectedMessage(null);
        }
      } catch (err) {
        console.error('Error deleting message:', err);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMessage(null);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="contact-messages-container">
      <h2>Contact Messages</h2>
      
      {loading ? (
        <div className="loading">Loading messages...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : messages.length === 0 ? (
        <div className="no-messages">No messages found.</div>
      ) : (
        <div className="messages-table-container">
          <table className="messages-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr key={message.id} className={message.isRead ? '' : 'unread'}>
                  <td>
                    <span className={`status-indicator ${message.isRead ? 'read' : 'unread'}`}>
                      {message.isRead ? 'Read' : 'New'}
                    </span>
                  </td>
                  <td>{`${message.firstName} ${message.lastName}`}</td>
                  <td>{message.email}</td>
                  <td>{message.phone}</td>
                  <td>{formatDate(message.createdAt)}</td>
                  <td className="actions">
                    <button 
                      className="view-btn"
                      onClick={() => handleViewMessage(message)}
                    >
                      View
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteMessage(message.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Message Detail Modal */}
      {showModal && selectedMessage && (
        <div className="message-modal-overlay">
          <div className="message-modal">
            <div className="modal-header">
              <h3>Message from {selectedMessage.firstName} {selectedMessage.lastName}</h3>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="message-info">
                <p><strong>From:</strong> {selectedMessage.firstName} {selectedMessage.lastName}</p>
                <p><strong>Email:</strong> {selectedMessage.email}</p>
                <p><strong>Phone:</strong> {selectedMessage.phone}</p>
                <p><strong>Date:</strong> {formatDate(selectedMessage.createdAt)}</p>
              </div>
              <div className="message-content">
                <h4>Message:</h4>
                <p>{selectedMessage.message}</p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="delete-btn" onClick={() => handleDeleteMessage(selectedMessage.id)}>Delete</button>
              <button className="close-btn" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactMessages;