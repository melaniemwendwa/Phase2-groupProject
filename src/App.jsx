import React, { useState } from 'react';
import Navbar from './components/Navbar';
import DepartmentList from './components/DepartmentList';
import DoctorList from './components/DoctorList';
import LoginForm from './Pages/LoginForm';
import SignUpForm from './Pages/SignUpForm';
import './App.css';

function App() {
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
  const [user, setUser] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false);

  function handleLogin(user) {
    setUser(user);
  }

  function handleSignUp(newUser) {
    setUser(newUser);
    setShowSignUp(false);
  }

  function handleLogout() {
    setUser(null);
    setSelectedDepartmentId(null);
  }

  return (
    <div className="App">
      {user ? (
        <>
          <Navbar onLogout={handleLogout} />
          <DepartmentList onDepartmentSelect={setSelectedDepartmentId} />
          {selectedDepartmentId && (
            <>
              <h1>Doctors in Selected Department</h1>
              <DoctorList departmentId={selectedDepartmentId} />
            </>
          )}
        </>
      ) : showSignUp ? (
        <SignUpForm onSignUp={handleSignUp} onSwitchToLogin={() => setShowSignUp(false)} />
      ) : (
        <LoginForm onLogin={handleLogin} onSwitchToSignUp={() => setShowSignUp(true)} />
      )}
    </div>
  );
}

export default App;
