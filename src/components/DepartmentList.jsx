
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DepartmentList.css";

function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/departments")
      .then((res) => res.json())
      .then((data) => setDepartments(data));
  }, []);

  return (
    <div className="login-page-background">
      <h2 style={{paddingTop : "40px", color: "#4CAF50" }}>Departments</h2>
      <div className="department-card-container">
      {departments.map((dept) => (
        <div
          className="department-card"
          key={dept.id}
          onClick={() => navigate(`/departments/${dept.id}`)}
        >
          <img
            src={dept.image}
            alt={dept.name}
            className="department-card-image"
          />
          <div className="department-card-name">{dept.name}</div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default DepartmentList;

