import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token'); // Remove token on logout
    navigate("/");
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
        {isLoggedIn ? (
          <>
            <li>
              <Link to="/add-product">My Profile</Link>
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
