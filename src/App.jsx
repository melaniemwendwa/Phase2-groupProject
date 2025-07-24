import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import DepartmentList from './components/DepartmentList';
import DoctorList from './components/DoctorList';
import AppointmentList from './components/AppointmentList';
import LoginForm from './Pages/LoginForm';
import SignUpForm from './Pages/SignUpForm';
import './App.css';
import DoctorReviews from './components/DoctorReviews';

function AppRoutes({ user, setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  const navigate = useNavigate();

  function handleLogin(user) {
    setUser(user);
    navigate('/departments');
  }

  function handleSignUp(newUser) {
    setShowSignUp(false);
    navigate('/login');
  }

  function handleLogout() {
    setUser(null);
    navigate('/login');
  }

  return (
    <>
      {user && <Navbar onLogout={handleLogout} />}
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/departments" /> : <LoginForm onLogin={handleLogin} onSwitchToSignUp={() => navigate('/signup')} />} />
        <Route path="/signup" element={user ? <Navigate to="/departments" /> : <SignUpForm onSignUp={handleSignUp} onSwitchToLogin={() => navigate('/login')} />} />
        <Route path="/departments" element={user ? <DepartmentList /> : <Navigate to="/login" />} />
        <Route path="/departments/:id" element={user ? <DoctorList user={user} /> : <Navigate to="/login" />} />
        <Route path="/appointments" element={user ? <AppointmentList user={user} /> : <Navigate to="/login" />} />
        <Route path="/doctors/:id/reviews" element={user ? <DoctorReviews user={user} /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={user ? "/departments" : "/login"} />} />
        <Route path="*" element={<Navigate to={user ? "/departments" : "/login"} />} />
      </Routes>
    </>
  );
}

function App() {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <div className="App">
        <AppRoutes user={user} setUser={setUser} />
      </div>
    </Router>
  );
}

export default App;
