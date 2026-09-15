import React, { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../userApi";

import "./Data.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await forgotPassword(email);
      alert(data.message || "Se o e-mail existir, enviaremos instruções.");

      // Apenas para DEV local (você está retornando token por enquanto)
      if (data.token) {
        alert(`Token DEV: ${data.token}`);
      }
    } catch (error) {
      alert(error.message || "Erro ao solicitar recuperação.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dataContainer">
      <form className="dataForm" onSubmit={handleSubmit}>
        <p>You will receive an email with a link to reset your password.</p>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Send"}
        </button>
      </form>
      <div className="dataNavigation">
        <Link to="/register">Create User</Link>
        <Link to="/login">Login here</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
