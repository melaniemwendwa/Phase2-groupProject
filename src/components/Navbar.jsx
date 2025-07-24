

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">SmartCare</div>
      <ul className="navbar-links">
        <li><Link to="/departments">Departments</Link></li>
        <li><Link to="/appointments">Appointments</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
