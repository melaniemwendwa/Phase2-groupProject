import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import DepartmentList from './components/DepartmentList';
import DoctorList from './components/DoctorList';
import AppointmentList from './components/AppointmentList';
import LoginForm from './Pages/LoginForm';
import SignUpForm from './Pages/SignUpForm';
import DoctorReviews from './components/DoctorReviews';
import HomePage from './Pages/HomePage';
import './App.css';

function AppRoutes({ user, setUser }) {
  const navigate = useNavigate();

  function handleLogin(user) {
    setUser(user);
    navigate('/departments');
  }

  function handleSignUp(newUser) {
    navigate('/login');
  }

  function handleLogout() {
    setUser(null);
    navigate('/');
  }

  return (
    <>
      <Navbar onLogout={handleLogout} user={user} />

      <Routes>
        <Route path="/" element={<HomePage user={user} />} />
        <Route path="/login" element={<LoginForm onLogin={handleLogin} onSwitchToSignUp={() => navigate('/signup')} />} />
        <Route path="/signup" element={<SignUpForm onSignUp={handleSignUp} onSwitchToLogin={() => navigate('/login')} />} />

        <Route path="/departments" element={user ? <DepartmentList /> : <Navigate to="/" />} />
        <Route path="/departments/:id" element={user ? <DoctorList user={user} /> : <Navigate to="/" />} />
        <Route path="/appointments" element={user ? <AppointmentList user={user} /> : <Navigate to="/" />} />
        <Route path="/doctors/:id/reviews" element={user ? <DoctorReviews user={user} /> : <Navigate to="/" />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
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
