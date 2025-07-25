import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DoctorCard from "./DoctorCard";

function DoctorList({ user }) {
  const { id } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [departmentName, setDepartmentName] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/doctors?departmentId=${id}`)
      .then((res) => res.json())
      .then((data) => setDoctors(data));
    fetch(`http://localhost:3000/departments/${id}`)
      .then((res) => res.json())
      .then((data) => setDepartmentName(data.name));
  }, [id]);

  return (
    <div className="login-page-background">
      <h2 style={{paddingTop : "40px", color: "#4CAF50" }}>Doctors in {departmentName || "Department"}</h2>
      <div className="doctor-list">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} user={user} />
        ))}
      </div>
    </div>
  );
}

export default DoctorList;
