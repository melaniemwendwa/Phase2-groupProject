

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">SmartCare</div>
      <ul className="navbar-links">
        <li><Link to="/departments">Departments</Link></li>
        <li><Link to="/appointments">Appointments</Link></li>
        <li><a href="#logout" onClick={e => { e.preventDefault(); onLogout(); }}>Logout</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
