import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "./ReviewForm";
import "./DoctorReview.css";

function DoctorReviews({ user }) {
  const { id } = useParams(); // doctor id
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [id]);

  async function fetchData() {
    setLoading(true);
    // Fetch doctor info
    const docRes = await fetch(`http://localhost:3000/doctors/${id}`);
    const docData = await docRes.json();
    setDoctor(docData);
    // Fetch all appointments for this doctor
    const apptRes = await fetch(`http://localhost:3000/appointments?doctorId=${id}`);
    const apptData = await apptRes.json();
    setAppointments(apptData);
    setLoading(false);
  }

  const appointmentReviews = appointments
    .flatMap(appt => appt.reviews || [])
    .filter(r => (typeof r === "string" && r.trim().length > 0) || (typeof r === "object" && r.text && r.text.trim().length > 0));

  const [generalReviews, setGeneralReviews] = useState([]);

  useEffect(() => {
    fetchGeneralReviews();
  }, [id]);

  async function fetchGeneralReviews() {
    const docRes = await fetch(`http://localhost:3000/doctors/${id}`);
    const docData = await docRes.json();
    setGeneralReviews(docData.generalReviews || []);
  }

  const allReviews = [...appointmentReviews, ...(generalReviews || [])];

  // Add review to the latest appointment of the current user with this doctor
  async function handleAddReview(appointmentId, reviewText, user) {
    if (appointmentId) {
      // Add to appointment review
      const appt = appointments.find(a => a.id === appointmentId);
      if (!appt) return;
      const updatedReviews = [...(appt.reviews || []), { patientName: user?.name || "Anonymous", text: reviewText }];
      await fetch(`http://localhost:3000/appointments/${appointmentId}` , {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviews: updatedReviews })
      });
      fetchData();
      fetchGeneralReviews();
    } else {
      // Add to doctor generalReviews
      await fetch(`http://localhost:3000/doctors/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ generalReviews: [...(generalReviews || []), { patientName: user?.name || "Anonymous", text: reviewText }] })
      });
      fetchGeneralReviews();
    }
  }

  // Find the latest appointment for this patient with this doctor
  let latestPatientAppt = null;
  if (user) {
    const patientAppts = appointments
      .filter(appt => appt.patientId === user.id)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    latestPatientAppt = patientAppts[0] || null;
  }

  return (
    <div className="reviews-section">
  {loading ? (
    <p className="loading-text">Loading reviews...</p>
  ) : (
    <>
      <h2 className="reviews-heading">Reviews for  {doctor?.name || "Unknown"}</h2>
      {allReviews.length === 0 ? (
        <p className="no-reviews">No reviews yet.</p>
      ) : (
        <ul className="review-list">
          {allReviews.map((review, i) => (
            <li key={i} className="review-item">
              💬 {typeof review === 'object' ? `${review.patientName}: ${review.text}` : review}
            </li>
          ))}
        </ul>
      )}
      {user && (
        <div className="leave-review">
          <h4>Leave a review</h4>
          <ReviewForm
            appointmentId={latestPatientAppt ? latestPatientAppt.id : null}
            onAddreview={handleAddReview}
            user={user}
          />
        </div>
      )}
    </>
  )}
</div>

  );
}

export default DoctorReviews;
