import { useState } from "react";
import AppointmentForm from "./AppointmentForm";

function DoctorCard({ doctor, user }) {
  const [showForm, setShowForm] = useState(false);

  function handleToggleForm() {
    setShowForm((prev) => !prev);
  }

  return (
    <div className="doctor-card">
      <img src={doctor.image} alt={doctor.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
      <h3>{doctor.name}</h3>
      <p><strong>Specialization:</strong> {doctor.specialty || doctor.specialization}</p>
      <p><strong>Location:</strong> {doctor.location}</p>
      <button onClick={handleToggleForm} style={{ marginTop: '10px' }}>
        {showForm ? "Hide Form" : "Book Appointment"}
      </button>
      {showForm && <AppointmentForm doctor={doctor} user={user} />}
    </div>
  );
}

export default DoctorCard;
