import { useState } from 'react';
import AppointmentForm from './components/AppointmentForm'; // adjust path if needed
import './App.css';

function App() {
  const [appointments, setAppointments] = useState([]);

  function addAppointment(newAppt) {
    setAppointments((prev) => [...prev, newAppt]);
  }

  return (
    <div className="App">
      <h1>Doctor Appointment Booking</h1>
      <AppointmentForm addAppointment={addAppointment} />

      <h2>Upcoming Appointments</h2>
      <ul>
        {appointments.map((appt, index) => (
          <li key={index}>
            {appt.name} - {appt.date} at {appt.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
