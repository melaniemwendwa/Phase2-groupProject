import { useState } from "react";

function LoginForm({ onLogin }) {
  const [formData, setFormData] = useState({ username: "", password: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`http://localhost:3000/users?username=${formData.username}&password=${formData.password}`)
      .then((res) => res.json())
      .then((users) => {
        if (users.length > 0) {
          onLogin(users[0]);
        } else {
          alert("Invalid username or password");
        }
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Log In</h3>
      <input
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Log In</button>
    </form>
  );
}

export default LoginForm;
