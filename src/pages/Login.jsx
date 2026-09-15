import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../userApi";

import "./Data.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const data = await loginUser(formData);

      // Salva token se existir (caso JWT já esteja implementado)
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Salva usuário para usar no app
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      navigate("/list");
    } catch (error) {
      console.log(error.message);
      alert(error.message || "Erro ao fazer login.");
    }
  }

  return (
    <div className="dataContainer">
      <form className="dataForm" onSubmit={handleSubmit}>
        <h3>Login</h3>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Enter</button>
      </form>

      <div className="dataNavigation">
        <Link to="/register">Create User</Link>

        <Link to="/forgot-password">Forgot Password</Link>
      </div>
    </div>
  );
};

export default Login;
