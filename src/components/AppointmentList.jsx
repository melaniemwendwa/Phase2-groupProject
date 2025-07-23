import React, { useEffect, useState } from "react";
import ReviewForm from "./ReviewForm";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/appointments")
      .then((res) => res.json())
      .then((data) => setAppointments(data));
  }, []);

  const addReview = (appointmentId, reviewText) => {
    const updatedAppointments = appointments.map((appt) => {
      if (appt.id === appointmentId) {
        const updated = {
          ...appt,
          reviews: [...(appt.reviews || []), reviewText],
        };

        // Update server (PATCH)
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

  return (
    <div>
      <h2>Upcoming Appointments</h2>
      {appointments.map((appt) => (
        <div key={appt.id}>
          <h4>{appt.name} - {appt.date} at {appt.time}</h4>
          <p>📝 Symptoms: {appt.symptoms}</p>

          <ul>
            {appt.reviews?.map((r, i) => (
              <li key={i}>💬 {r}</li>
            ))}
          </ul>

          <ReviewForm appointmentId={appt.id} onAddReview={addReview} />
          <hr />
        </div>
      ))}
    </div>
  );
}

export default AppointmentList;
