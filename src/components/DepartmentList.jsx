import React, { useEffect, useState } from 'react';
import './DepartmentList.css';

function DepartmentList({ onDepartmentSelect }) {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/departments')
      .then(res => res.json())
      .then(data => setDepartments(data))
      .catch(err => console.error('Failed to fetch departments:', err));
  }, []);

  return (
    <div className="department-container">
      <h2 className="department-title">Departments</h2>
      <ul className="department-list">
        {departments.map(dept => (
          <li
            key={dept.id}
            onClick={() => onDepartmentSelect?.(dept.id)}
            className="department-item"
          >
            {dept.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DepartmentList;
