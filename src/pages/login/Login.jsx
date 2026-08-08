import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../api";
import { Link } from "react-router-dom";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const data = await loginUser(formData);

      localStorage.setItem("token", data.token);

      console.log("Login realizado com sucesso");

      navigate("/list");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="login-container">
      <form className="login-area" onSubmit={handleSubmit}>
        <h3>Login</h3>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Entrar</button>
      </form>
      <div className="register-link">
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
