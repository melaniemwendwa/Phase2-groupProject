// src/components/AppointmentForm.jsx
import { useState } from "react";

function AppointmentForm({ addAppointment }) {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    symptoms: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
        addAppointment(newAppointment); // call parent callback
        setFormData({ name: "", date: "", time: "", symptoms: "" }); // reset form
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Patient Name"
        required
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        required
      />
      
      <input
        type="text"
        name="symptoms"
        value={formData.symptoms}
        onChange={handleChange}
        placeholder="Leave the doctor some notes"
        required
      />
      <button type="submit">Book Appointment</button>
    </form>
  );
}

export default AppointmentForm;
