import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/AdminOrder.css'; // Reuse AdminOrder.css for box styling or create a new CSS if needed  

const MyOrders = () => {
  const { user, token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user || !token) {
        setLoading(false);
        setError('User not authenticated.');
        return;
      }

      try {
        console.log('Fetching orders for user:', user);
        const response = await axios.get('http://localhost:5001/api/orders/user/' + user.id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to fetch orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const handleCancelOrder = async (orderId) => {
    if (!user || !token) {
      setError('User not authenticated.');
      return;
    }

    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await axios.put(`http://localhost:5001/api/orders/${orderId}/status`,
          { status: 'Cancelled' },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(orders.map(order =>
          order.id === orderId ? { ...order, status: 'Cancelled' } : order
        ));
        alert('Order cancelled successfully!');
      } catch (err) {
        console.error('Error cancelling order:', err);
        setError('Failed to cancel order. Please try again later.');
      }
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="container mx-auto p-4">Loading orders...</div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="container mx-auto p-4 text-red-500">Error: {error}</div>
        <Footer />
      </>
    );
  }

  if (orders.length === 0) {
    return (
      <>
        <Header />
        <div className="container mx-auto p-4">You have no orders yet.</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>
        <div className="grid grid-cols-1 gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Order ID: {order.id}</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  order.status === 'Shipping' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                  }`}>
                  {order.status}
                </span>
              </div>
              <p className="text-gray-600 mb-2">Total Amount: ${order.totalAmount.toFixed(2)}</p>
              <p className="text-gray-600 mb-4">Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>

              <h3 className="text-lg font-semibold mb-2">Items:</h3>
              <ul className="list-disc list-inside mb-4">
                {order.OrderItems.map((item) => (
                  <li key={item.id} className="text-gray-700">
                    {item.Product.productName} (x{item.quantity}) - ${item.price.toFixed(2)} each
                  </li>
                ))}
              </ul>

              {order.status !== 'Cancelled' && order.status !== 'Completed' && (
                <button
                  onClick={() => handleCancelOrder(order.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  Cancel Order
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;
