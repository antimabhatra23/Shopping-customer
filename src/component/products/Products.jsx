import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './products.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Products = () => {
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Load products when the component mounts or when the URL search params change
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('search') || '';
    loadProducts(searchQuery);
  }, [location.search]);

  const loadProducts = async (queryString = '') => {
    setLoading(true);
    try {
      const response = await axios.get(`https://clothing-backend-two.vercel.app/products?${queryString}`);
      setProductList(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = () => {
    const queryParams = new URLSearchParams();
  
    if (selectedCategory) queryParams.append('category', selectedCategory);
    if (selectedColor) queryParams.append('color', selectedColor);
    if (selectedPrice) queryParams.append('price', selectedPrice);
    if (selectedSize) queryParams.append('size', selectedSize);
    if (selectedRating) queryParams.append('rating', selectedRating);
  
    const queryString = queryParams.toString();
    loadProducts(queryString);
  };

  const resetFilters = () => {
    setSelectedCategory('');
    setSelectedColor('');
    setSelectedPrice('');
    setSelectedSize('');
    setSelectedRating('');
    loadProducts(); // Reload products without any filters
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleProductClick = (product) => {
    navigate('/product', { state: { product } });
  };

  return (
    <div className="products-page">
      <button
        className={`sidebar-toggle ${isSidebarOpen ? 'open' : ''}`}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? '✕' : '☰'}
      </button>
      <div className={`filter-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <h3>Filter by Category</h3>
        <select value={selectedCategory} onChange={(e) => { setSelectedCategory(e.target.value); handleFilterChange(); }}>
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
          <option value="Sky Blue">Sky Blue</option>
          <option value="Brown">Brown</option>
          <option value="Gray">Gray</option>
        </select>

        <h3>Filter by Price</h3>
        <select value={selectedPrice} onChange={(e) => { setSelectedPrice(e.target.value); handleFilterChange(); }}>
          <option value="">All</option>
          <option value="100">₹100</option>
          <option value="200">₹200</option>
          <option value="300">₹300</option>
          <option value="400">₹400</option>
          <option value="500">₹500</option>
          <option value="600">₹600</option>
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

        <button onClick={resetFilters} className="reset-filters-button">Reset Filters</button>
      </div>

      <div className={`products-container ${isSidebarOpen ? 'with-sidebar' : ''}`}>
        <h1 className="heading">Products For You</h1>
        <div className="products-grid">
          {loading ? (
            <p>Loading...</p>
          ) : productList?.length > 0 ? (
            productList?.map((item) => (
              <div
                key={item._id}
                className="products-card"
                onClick={() => handleProductClick(item)}
              >
                <img className="products-img" src={item?.img} alt={item?.name} />
                <div className="products-info">
                  <h2>{item?.name}</h2>
                  <p><span className="rupee-symbol"> ₹ </span>{item?.price} <span className="onward">onwards</span></p>
                  <p className="free">Free Delivery <span className="deliver">Onwards</span></p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-data">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
