
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/departments")
      .then((res) => res.json())
      .then((data) => setDepartments(data));
  }, []);

  return (
    <div>
      <h2>Departments</h2>
      <ul>
        {departments.map((dept) => (
          <li
            key={dept.id}
            style={{ cursor: "pointer", marginBottom: "0.5rem", color: "blue" }}
            onClick={() => navigate(`/departments/${dept.id}`)}
          >
            <img
              src={dept.image}
              alt={dept.name}
              width="50"
              height="50"
              style={{ marginRight: "8px", verticalAlign: "middle" }}
            />
            {dept.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DepartmentList;

