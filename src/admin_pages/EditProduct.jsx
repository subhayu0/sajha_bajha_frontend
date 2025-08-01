import React, { useEffect, useState } from 'react';
import '../style/EditProduct.css';
import Sidebar from './Sidebar';
import { useNavigate, useParams } from 'react-router-dom';

const backendUrl = "http://localhost:5001";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch product data on mount
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('access_token');
        const res = await fetch(`http://localhost:5001/api/product/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setForm({
            sku: data.data.sku || '',
            productName: data.data.productName || '',
            size: data.data.size || '',
            color: data.data.color || '',
            category: data.data.category || '',
            price: data.data.price || '',
            quantity: data.data.quantity || '',
            status: data.data.status || '',
          });
          setExistingImages(data.data.imageUrls || []);
        } else {
          throw new Error(`Failed to fetch product: ${res.status}`);
        }
      } catch (err) {
        console.error('Fetch product error:', err);
        alert('Failed to fetch product: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    images.forEach(img => formData.append('images', img));
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`http://localhost:5001/api/product/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to update product: ${response.status}`);
      }
      
      alert('Product updated successfully!');
      navigate('/admin/product');
    } catch (err) {
      console.error('Update product error:', err);
      alert('Failed to update product: ' + err.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <div className="edit-product-container">
          <h2>Edit Product</h2>
          <form className="form-container" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="product-info">
              <h3>Product Information</h3>
              <label>SKU</label>
              <input name="sku" type="text" value={form.sku} onChange={handleChange} required />
              <label>Product Name</label>
              <input name="productName" type="text" value={form.productName} onChange={handleChange} required />
              <div className="row">
                <div className="col">
                  <label>Size</label>
                  <input name="size" type="text" value={form.size} onChange={handleChange} />
                </div>
                <div className="col">
                  <label>Color</label>
                  <input name="color" type="text" value={form.color} onChange={handleChange} />
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
                  <input name="price" type="number" value={form.price} onChange={handleChange} required />
                </div>
              </div>
              <label>Quantity</label>
              <input name="quantity" type="number" value={form.quantity} onChange={handleChange} required />
              <label>Status Product</label>
              <select name="status" value={form.status} onChange={handleChange} required>
                <option value="">Select status product</option>
                <option value="Available">Available</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
            <div className="image-product">
              <h3>Image Product</h3>
              <p>
                <span style={{ color: 'red' }}>Note</span>: Format photos PNG or JPG (Max size 5mb, up to 4 images)
              </p>
              <input type="file" name="images" multiple accept="image/*" onChange={handleImageChange} />
              <div className="image-upload-container">
                {existingImages.length > 0 && existingImages.map((img, idx) => (
                  <div key={idx} className="image-upload-box">
                    <img src={backendUrl + img} alt={`Product ${idx}`} style={{ width: 60, height: 60, objectFit: 'cover' }} />
                  </div>
                ))}
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

export default EditProduct;


