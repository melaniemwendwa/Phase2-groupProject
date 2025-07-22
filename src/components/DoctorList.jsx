import { useEffect, useState } from "react";
import DoctorCard from "./DoctorCard";

function DoctorList({ addAppointment }) {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/doctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data));
  }, []);

  return (
    <div>
      <h2>Available Doctors</h2>
      {doctors.map((doctor) => (
        <DoctorCard
          key={doctor.id}
          doctor={doctor}
          addAppointment={addAppointment}
        />
      ))}
    </div>
  );
}

export default DoctorList;
