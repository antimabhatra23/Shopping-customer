import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token'); // Remove token on logout
    navigate("/");
  };

  const token = localStorage.getItem("token");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">
          <img src='/images/logo1.png' alt="Shree Ram Lala Collection" />
        </div>
        <li>
          <Link to="/">Products</Link>
        </li>
      </div>
      <ul className="navbar-right">
        {isLoggedIn || token ? (
          <>
            <li className="profile-menu">
              <button onClick={toggleDropdown} className="profile-button">My Profile</button>
              {isDropdownOpen && (
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/view-profile">View Profile</Link>
                  </li>
                  <li>
                    <Link to="/my-orders">My Orders</Link>
                  </li>
                  <li>
                    <Link to="/delete-account">Delete Account</Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </li>
          </>
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
  );
};

export default Navbar;
