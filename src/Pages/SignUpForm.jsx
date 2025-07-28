import { useState } from "react";
import "../App.css";

function SignUpForm({ onSignUp, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:3000/patients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then((newPatient) => {
        onSignUp(newPatient);
        setFormData({ name: "", username: "", password: "" });
      });
  }

  return (
    <div className="login-page-background">
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
        <h3 className="login-title">Sign Up</h3>

        <input
          className="login-input"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          className="login-input"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          className="login-input"
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="login-button">Sign Up</button>

        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          Already have an account?{" "}
          <span
            style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
            onClick={onSwitchToLogin}
          >
            Log In
          </span>
        </p>
      </form>
      </div>
    </div>
  );
}

export default SignUpForm;
