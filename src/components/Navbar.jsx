

import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">SmartCare</div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/departments">Departments</a></li>
        <li><a href="/appointments">Appointments</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
