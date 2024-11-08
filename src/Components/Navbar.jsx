import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">MyApp</div>
      <ul className="navbar-links">
        <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink></li>
        <li><NavLink to="/userdetails" className={({ isActive }) => isActive ? "active" : ""}>User Details</NavLink></li>
        <li><NavLink to="/products" className={({ isActive }) => isActive ? "active" : ""}>Products</NavLink></li>
        <li><NavLink to="/login" className={({ isActive }) => isActive ? "active" : ""}>Login</NavLink></li>
        <li><NavLink to="/signup" className={({ isActive }) => isActive ? "active" : ""}>Signup</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar;
