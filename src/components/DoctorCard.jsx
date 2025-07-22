import { useState } from "react";
import AppointmentForm from "./AppointmentForm";

function DoctorCard({ doctor, addAppointment }) {
  const [showForm, setShowForm] = useState(false);

  function handleToggleForm() {
    setShowForm((prev) => !prev);
  }

  return (
    <div className="doctor-card">
      <h3>{doctor.name}</h3>
      <p>Specialization: {doctor.specialization}</p>
      <p>Experience: {doctor.experience} years</p>
      <button onClick={handleToggleForm}>
        {showForm ? "Hide Form" : "Book Appointment"}
      </button>

      {showForm && <AppointmentForm addAppointment={addAppointment} />}
    </div>
  );
}

export default DoctorCard;
