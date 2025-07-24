import { useState } from "react";
import "./AppointmentForm.css";

function AppointmentForm({ addAppointment }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    symptoms: "",
  });
  const [confirmation, setConfirmation] = useState(false);

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function nextStep() {
    if (step < totalSteps) setStep(step + 1);
  }

  function prevStep() {
    if (step > 1) setStep(step - 1);
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:3000/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((newAppointment) => {
        addAppointment(newAppointment);

        setConfirmation(true);

        setTimeout(() => {
          setConfirmation(false);
          setFormData({ name: "", date: "", time: "", symptoms: "" });
          setStep(1);
        }, 2000);
      })
      .catch((error) => {
        console.error("Error submitting appointment:", error);
        alert("There was an error booking your appointment. Please try again.");
      });
  }

  return (
    <div className="form-container">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {confirmation ? (
        <div className="confirmation">
          <h3>✅ Appointment successfully booked!</h3>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <label>Patient Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <button type="button" onClick={nextStep} disabled={!formData.name}>
                Next
              </button>
            </>
          )}
          {step === 2 && (
            <>
              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
              <label>Time:</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
              <button type="button" onClick={prevStep}>Back</button>
              <button
                type="button"
                onClick={nextStep}
                disabled={!formData.date || !formData.time}
              >
                Next
              </button>
            </>
          )}
          {step === 3 && (
            <>
              <label>Symptoms / Notes:</label>
              <input
                type="text"
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                required
              />
              <button type="button" onClick={prevStep}>Back</button>
              <button
                type="button"
                onClick={nextStep}
                disabled={!formData.symptoms}
              >
                Review
              </button>
            </>
          )}
          {step === 4 && (
            <>
              <h3>Review Your Appointment</h3>
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Date:</strong> {formData.date}</p>
              <p><strong>Time:</strong> {formData.time}</p>
              <p><strong>Symptoms:</strong> {formData.symptoms}</p>
              <button type="button" onClick={prevStep}>Back</button>
              <button type="submit">Book Appointment</button>
            </>
          )}
        </form>
      )}
    </div>
  );
}

export default AppointmentForm;
