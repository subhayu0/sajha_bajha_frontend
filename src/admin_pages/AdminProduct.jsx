import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/AdminProduct.css';
import Sidebar from './Sidebar';
import { useProducts } from '../context/ProductContext';

const AdminProduct = () => {
  const { products, refreshProducts } = useProducts();
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    setDeletingId(id);
    try {
      // Use the full URL with the correct port and add authorization token
      const token = localStorage.getItem('access_token');
      const response = await fetch(`http://localhost:5001/api/product/${id}`, { 
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to delete: ${response.status}`);
      }
      
      if (refreshProducts) {
        await refreshProducts();
      } else {
        window.location.reload(); // fallback if refreshProducts is not available
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete product: ' + err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/editproduct/${id}`);
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <div className="product-section">
          <h2>Products</h2>
          <div className="search-bar-container">
            <input type="text" placeholder="Search for id, name Product" />
            <button>
              <i className="fas fa-search"></i>
            </button>
          </div>
          <button className="add-product-btn" onClick={() => navigate('/admin/addproduct')}>
            Add Product <i className="fas fa-plus"></i>
          </button>
          <table className="products-table">
            <thead>
              <tr>
                <th><input type="checkbox" /></th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr><td colSpan="6">No products found.</td></tr>
              ) : (
                products.map(product => (
                  <tr key={product._id || product.id}>
                    <td><input type="checkbox" /></td>
                    <td>
                      <div className="product-name-id">
                        <a href="#" style={{ color: '#0275d8', fontWeight: '600', textDecoration: 'none' }}>
                          {product.sku}
                        </a>
                        <div>{product.productName}</div>
                      </div>
                    </td>
                    <td>Rs. {product.price}</td>
                    <td>{product.quantity}</td>
                    <td>{product.category}</td>
                    <td className="action-buttons">
                      <button title="View"><i className="fas fa-eye"></i></button>
                      <button title="Edit" onClick={() => handleEdit(product._id || product.id)}><i className="fas fa-edit"></i></button>
                      <button title="Delete" onClick={() => handleDelete(product._id || product.id)} disabled={deletingId === (product._id || product.id)}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;