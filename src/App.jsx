
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import DepartmentList from './components/DepartmentList';
import AppointmentForm from './components/AppointmentForm';
import DoctorList from './components/DoctorList';
import './App.css';

function App() {
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
  const [appointments, setAppointments] = useState([]);

  function addAppointment(newAppt) {
    setAppointments((prev) => [...prev, newAppt]);
  }

  return (
    <div className="App">
      <Navbar />
      
      <DepartmentList onDepartmentSelect={setSelectedDepartmentId} />

      <h1>Doctor Appointment Booking</h1>

      <label>Select Department ID (manual):</label>
      <input
        type="number"
        value={selectedDepartmentId || ""}
        onChange={(e) => setSelectedDepartmentId(Number(e.target.value))}
        placeholder="e.g. 1"
      />

      {selectedDepartmentId && (
        <DoctorList departmentId={selectedDepartmentId} />
      )}

      <h2>Book an Appointment</h2>
      <AppointmentForm addAppointment={addAppointment} />
    </div>
  );
}

export default App;
