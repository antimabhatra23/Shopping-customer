import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './products.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook from react-router-dom

const Products = () => {
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    loadProducts(); // Load products on component mount
  }, []);

  const loadProducts = async (category = '', gender = '', color = '', price = '', size = '', rating = '') => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/products?category=${category}&gender=${gender}&color=${color}&price=${price}&size=${size}&rating=${rating}`);
      setProductList(response?.data?.products || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to load products");
    }
  };

  const handleProductClick = (product) => {
    navigate('/product', { state: { product } }); // Corrected syntax for passing state
  };

  const handleFilterChange = () => {
    loadProducts('', selectedGender, selectedColor, selectedPrice, selectedSize, selectedRating);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="products-page">
      <button 
        className={`sidebar-toggle ${isSidebarOpen ? 'open' : ''}`} 
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? '✕' : '☰'} {/* Toggle icon based on state */}
      </button>
      <div className={`filter-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <h3>Filter by Gender</h3>
        <select value={selectedGender} onChange={(e) => { setSelectedGender(e.target.value); handleFilterChange(); }}>
          <option value="">All</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>

        <h3>Filter by Color</h3>
        <select value={selectedColor} onChange={(e) => { setSelectedColor(e.target.value); handleFilterChange(); }}>
          <option value="">All</option>
          <option value="Red">Red</option>
          <option value="Blue">Blue</option>
          <option value="Green">Green</option>
          <option value="Black">Black</option>
          <option value="White">White</option>
        </select>

        <h3>Filter by Price</h3>
        <select value={selectedPrice} onChange={(e) => { setSelectedPrice(e.target.value); handleFilterChange(); }}>
          <option value="">All</option>
          <option value="0-500">₹0 - ₹500</option>
          <option value="500-1000">₹500 - ₹1000</option>
          <option value="1000-2000">₹1000 - ₹2000</option>
          <option value="2000-5000">₹2000 - ₹5000</option>
          <option value="5000-10000">₹5000 - ₹10000</option>
        </select>

        <h3>Filter by Size</h3>
        <select value={selectedSize} onChange={(e) => { setSelectedSize(e.target.value); handleFilterChange(); }}>
          <option value="">All</option>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
          <option value="XL">Extra Large</option>
        </select>

        <h3>Filter by Rating</h3>
        <select value={selectedRating} onChange={(e) => { setSelectedRating(e.target.value); handleFilterChange(); }}>
          <option value="">All</option>
          <option value="1">1 Star & Up</option>
          <option value="2">2 Stars & Up</option>
          <option value="3">3 Stars & Up</option>
          <option value="4">4 Stars & Up</option>
          <option value="5">5 Stars</option>
        </select>
      </div>
      <div className={`products-container ${isSidebarOpen ? 'with-sidebar' : ''}`}>
        <h1 className="heading">Products For You</h1>
        <div className="products-grid">
          {productList.length > 0 ? (
            productList.map((item) => (
              <div 
                key={item._id} 
                className="products-card"
                onClick={() => handleProductClick(item)} // Make the card clickable
              >
                <img className="products-img" src={item?.img} alt={item?.name} />
                <div className="products-info">
                  <h2>{item?.name}</h2>
                  <p><span className="rupee-symbol"> ₹ </span>{item?.price} <span className="onward">onwards</span></p>
                  <div className="free">
                    <p><span className="deliver">Free Delivery</span></p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-data">No Data</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
