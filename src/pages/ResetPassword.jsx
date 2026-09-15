import React, { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { resetPassword } from "../../userApi";

import "./Data.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!token) {
      alert("Token não encontrado na URL.");
      return;
    }

    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    try {
      const data = await resetPassword(token, password);
      alert(data.message || "Senha redefinida com sucesso.");
      navigate("/login");
    } catch (error) {
      alert(error.message || "Erro ao redefinir senha.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dataContainer">
      <form className="dataForm" onSubmit={handleSubmit}>
        <h3>Redefinir senha</h3>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Reset"}
        </button>
      </form>

      <div className="dataNavigation">
        <Link to="/register">Create User</Link>
        <Link to="/login">Login here</Link>
      </div>
    </div>
  );
};

export default ResetPassword;
