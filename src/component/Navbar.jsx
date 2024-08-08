import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token'); // Remove token on logout
    localStorage.removeItem('userId'); // Remove token on logout
    navigate("/");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const token = localStorage.getItem("token");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <div onClick={handleLogoClick} className="navbar-logo">
            <img src="/images/logo1.png" alt="Shree Ram Lala Collection" />
          </div>
        </div>
        
        <div className="navbar-middle">
          <input type="text" className="search-bar" placeholder="Search..." />
        </div>

        <ul className="navbar-right">
          {isLoggedIn || token ? (
            <li className="profile-menu">
              <button onClick={toggleDropdown} className="profile-button">
                My Profile
              </button>
              {isDropdownOpen && (
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/view-profile">View Profile</Link>
                  </li>
                  <li>
                    <Link to="/my-orders">My Orders</Link>
                  </li>
                  <li>
                    <Link to="/cart">Cart</Link>
                  </li>
                  <li>
                    <Link to="/" onClick={handleLogout} className="logout-link">
                      Logout
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          ) : (
            <>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div className="main-content">
        {/* Your other components go here */}
      </div>
    </>
  );
};

export default Navbar;
