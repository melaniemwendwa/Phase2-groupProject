import { useState } from "react";
import "../App.css";

function LoginForm({ onLogin, onSwitchToSignUp }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`http://localhost:3000/patients?username=${formData.username}&password=${formData.password}`)
      .then((res) => res.json())
      .then((users) => {
        if (users.length > 0) {
          setError("");
          onLogin(users[0]);
        } else {
          setError("Incorrect username or password.");
        }
      })
      .catch(() => setError("An error occurred. Please try again."));
  }

  return (
    <div className="login-page-background">
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
        <h3 className="login-title">Log In</h3>
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
        <button type="submit" className="login-button">Log In</button>
        {error && <div className="login-error" style={{ color: 'red', marginTop: '0.5rem' }}>{error}</div>}
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          Don't have an account?{" "}
          <span
            style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
            onClick={onSwitchToSignUp}
          >
            Sign Up
          </span>
        </p>
      </form>
      </div>
    </div>
  );
}

export default LoginForm;
