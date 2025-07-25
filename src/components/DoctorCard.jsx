import { useNavigate } from "react-router-dom";
import { useState } from "react";

function DoctorCard({ doctor, user }) {
  const navigate = useNavigate();

  function handleBookAppointment() {
    navigate("/appointments", { state: { fromDoctorCard: true } });
  }

  function handleViewReviews() {
    // Navigate to a reviews page specific to this doctor (if you're using routing)
    navigate(`/doctors/${doctor.id}/reviews`);
  }

  return (
    <div className="doctor-card">
      <img
        src={doctor.image}
        alt={doctor.name}
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
      <h3>{doctor.name}</h3>
      <p>
        <strong>Specialization:</strong>{" "}
        {doctor.specialty || doctor.specialization}
      </p>
      <p>
        <strong>Location:</strong> {doctor.location}
      </p>
      <button onClick={handleBookAppointment} style={{ marginTop: "10px", background: "#4CAF50"}}>
        Book Appointment
      </button>
      <button onClick={handleViewReviews} style={{ marginTop: "10px", marginLeft: "10px", background: "#2196F3"}}>
        Reviews
      </button>
    </div>
  );
}

export default DoctorCard;
