
import React, { useState } from 'react';
import '../style/AddProduct.css';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

const AddProduct = () => {
  const navigate = useNavigate();
  const { addProduct } = useProducts();
  const [form, setForm] = useState({
    sku: '',
    productName: '',
    size: '',
    color: '',
    category: '',
    price: '',
    quantity: '',
    status: '',
  });
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.sku || !form.productName || !form.category || !form.price || !form.quantity || !form.status) {
      alert('Please fill all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    images.forEach(img => formData.append('images', img));
    
    try {
      // Use the full URL with the correct port and add authorization token
      const token = localStorage.getItem('access_token');
      const response = await fetch('http://localhost:5001/api/product', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to add product: ${response.status}`);
      }
      
      alert('Product added successfully!');
      navigate('/admin/product');
    } catch (err) {
      console.error('Add product error:', err);
      alert('Failed to add product: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <div className="add-product-container">
          <h2>Add Product</h2>
          <form className="form-container" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="product-info">
              <h3>Product Information</h3>
              <label>SKU</label>
              <input name="sku" type="text" placeholder="Input SKU" value={form.sku} onChange={handleChange} required />
              <label>Product Name</label>
              <input name="productName" type="text" placeholder="Input product name" value={form.productName} onChange={handleChange} required />
              <div className="row">
                <div className="col">
                  <label>Size</label>
                  <input name="size" type="text" placeholder="Input size" value={form.size} onChange={handleChange} />
                </div>
                <div className="col">
                  <label>Color</label>
                  <input name="color" type="text" placeholder="Input color" value={form.color} onChange={handleChange} />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>Product Category</label>
                  <select name="category" value={form.category} onChange={handleChange} required>
                    <option value="">Select product category</option>
                    <option value="Guitar">Guitar</option>
                    <option value="Flute">Flute</option>
                    <option value="Piano">Piano</option>
                    <option value="Drums">Drums</option>
                  </select>
                </div>
                <div className="col">
                  <label>Price</label>
                  <input name="price" type="number" placeholder="Input price" value={form.price} onChange={handleChange} required />
                </div>
              </div>
              <label>Quantity</label>
              <input name="quantity" type="number" placeholder="Input stock quantity" value={form.quantity} onChange={handleChange} required />
              <label>Status Product</label>
              <select name="status" value={form.status} onChange={handleChange} required>
                <option value="">Select status product</option>
                <option value="Available">Available</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
            <div className="image-product">
              <h3>Image Product</h3>
              <p><span style={{ color: 'red' }}>Note</span>: Format photos PNG or JPG (Max size 5mb, up to 4 images)</p>
              <input type="file" name="images" multiple accept="image/*" onChange={handleImageChange} />
              <div className="image-upload-container">
                {images.length > 0 && Array.from(images).map((img, idx) => (
                  <div key={idx} className="image-upload-box">{img.name}</div>
                ))}
              </div>
              <button className="save-product-btn" type="submit">Save Product</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;