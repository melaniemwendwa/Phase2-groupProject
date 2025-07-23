import { useState } from "react";

function SignUpForm({ onSignUp }) {
  const [formData, setFormData] = useState({ username: "", password: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then((newUser) => {
        onSignUp(newUser); // Update parent with logged-in user
        setFormData({ username: "", password: "" });
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
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
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUpForm;
