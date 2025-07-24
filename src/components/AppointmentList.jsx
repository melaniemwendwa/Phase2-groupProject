import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReviewForm from "./ReviewForm";
import AppointmentForm from "./AppointmentForm";

function AppointmentList() {
  const location = useLocation();
  const navigate = useNavigate();
  const departmentId = location.state?.departmentId;
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    fetch("http://localhost:3000/appointments")
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((error) => console.error("Error fetching appointments:", error))
      .finally(() => setLoading(false));
  };

  const addAppointment = (newAppt) => {
    fetch("http://localhost:3000/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAppt),
    })
      .then((res) => res.json())
      .then((savedAppt) => {
        setAppointments((prev) => [...prev, savedAppt]);
        setMessage("✅ Appointment booked successfully!");
        setTimeout(() => setMessage(""), 3000);
      })
      .catch((error) => {
        console.error("Error saving appointment:", error);
      });
  };

  const addReview = (appointmentId, reviewText) => {
    const updatedAppointments = appointments.map((appt) => {
      if (appt.id === appointmentId) {
        const updated = {
          ...appt,
          reviews: [...(appt.reviews || []), reviewText],
        };

        fetch(`http://localhost:3000/appointments/${appointmentId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reviews: updated.reviews }),
        });

        return updated;
      }
      return appt;
    });

    setAppointments(updatedAppointments);
  };

  const resetAppointments = () => {
    // DELETE all appointments
    Promise.all(
      appointments.map((appt) =>
        fetch(`http://localhost:3000/appointments/${appt.id}`, {
          method: "DELETE",
        })
      )
    )
      .then(() => {
        setAppointments([]);
        setMessage("🗑️ All appointments have been reset.");
        setTimeout(() => setMessage(""), 3000);
      })
      .catch((error) => {
        console.error("Error resetting appointments:", error);
        setMessage("❌ Failed to reset appointments.");
        setTimeout(() => setMessage(""), 3000);
      });
  };

  return (
    <div>
      <h2>Book a New Appointment</h2>

      {departmentId && (
        <button
          onClick={() => navigate(`/departments/${departmentId}`)}
          style={{ marginBottom: "1rem" }}
        >
          🔙 Back to Doctors
        </button>
      )}

      <button onClick={resetAppointments} style={{ marginBottom: "1rem", marginLeft: "1rem", backgroundColor: "#f44336", color: "#fff", border: "none", padding: "0.5rem 1rem", borderRadius: "5px" }}>
        🔄 Reset All Appointments
      </button>

      {message && <p style={{ color: "green" }}>{message}</p>}

      <AppointmentForm addAppointment={addAppointment} />

      <h2>Upcoming Appointments</h2>
      {loading ? (
        <p>Loading appointments...</p>
      ) : appointments.length === 0 ? (
        <p>No appointments available.</p>
      ) : (
        appointments.map((appt) => (
          <div key={appt.id}>
            <h4>
              {appt.name} - {appt.date} at {appt.time}
            </h4>
            <p>📝 Symptoms: {appt.symptoms}</p>

            <ul>
              {appt.reviews?.map((r, i) => (
                <li key={i}>💬 {r}</li>
              ))}
            </ul>

            <ReviewForm appointmentId={appt.id} onAddReview={addReview} />
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default AppointmentList;
