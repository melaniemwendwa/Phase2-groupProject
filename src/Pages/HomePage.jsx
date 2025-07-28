import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const imageLinks = [
    "https://plus.unsplash.com/premium_photo-1663050790540-223dad060419?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVkaWNhbCUyMGFmcmljYW58ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=847&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1lZGljYWx8ZW58MHx8MHx8fDA%3D"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageLinks.length);
    }, 4000); 

    return () => clearInterval(interval);
  }, [imageLinks.length]);

  return (
    <div
      className="home-page"
      style={{ backgroundImage: `url(${imageLinks[currentIndex]})` }}
    >
      <div className="overlay">
        <h1>Welcome to Doctor Appointment App</h1>
        <p>Book appointments easily with trusted professionals.</p>
        <div className="home-buttons">
          <Link to="/login" className="btn">Login</Link>
          <Link to="/signup" className="btn">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

