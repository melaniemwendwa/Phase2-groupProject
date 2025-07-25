import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReviewForm from "./ReviewForm";
import AppointmentForm from "./AppointmentForm";

function AppointmentList({ user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const departmentId = location.state?.departmentId;
  const showOnlyForm = location.state?.fromDoctorCard === true;
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, [user]);

  const fetchAppointments = () => {
    fetch("http://localhost:3000/appointments")
      .then((res) => res.json())
      .then((data) => {
        // Only show appointments for the logged-in user
        const filtered = user ? data.filter(appt => appt.patientId === user.id) : [];
        setAppointments(filtered);
      })
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
      {showOnlyForm && (
        <div className="booking-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ paddingTop: "40px", color: "#4CAF50", textAlign: "center" }}>Book a New Appointment</h2>
          {departmentId && (
            <button
              onClick={() => navigate(`/departments/${departmentId}`)}
              style={{ marginBottom: "1rem" }}
            >
            </button>
          )}
          {message ? (
            <p style={{ color: "green", textAlign: "center", marginBottom: "1rem" }}>{message}</p>
          ) : (
            <button onClick={resetAppointments} style={{ marginBottom: "1rem", backgroundColor: "#f44336", color: "#fff", border: "none", padding: "0.5rem 1rem", borderRadius: "5px" }}>
              🔄 Reset All Appointments
            </button>
          )}
        </div>
      )}

      {showOnlyForm ? (
        <AppointmentForm addAppointment={addAppointment} />
      ) : null}

      {showOnlyForm ? null : <>
        <div className="appointments-section-centered">
          <h2 style={{ marginTop: '64px', color: '#4CAF50', textAlign: 'center' }}>My Appointments</h2>
          {loading ? (
            <p>Loading appointments...</p>
          ) : appointments.length === 0 ? (
            <p>No appointments booked yet.</p>
          ) : (
            appointments.map((appt) => (
              <div key={appt.id} className="appointment-card-centered">
                <h4 style={{ textAlign: 'center' }}>
                  {appt.name} - {appt.date} at {appt.time}
                </h4>
                <p style={{ textAlign: 'center' }}>📝 Symptoms: {appt.symptoms}</p>

                <ul style={{ textAlign: 'center', listStyle: 'none', padding: 0 }}>
                  {appt.reviews?.map((r, i) => (
                    <li key={i}>💬 {r}</li>
                  ))}
                </ul>

                <hr />
              </div>
            ))
          )}
        </div>
      </>}

    </div>
  );
}

export default AppointmentList;
