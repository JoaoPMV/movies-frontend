const API_URL = import.meta.env.VITE_API_URL;

export async function registerUser(user) {
  // user esperado: { firstName, lastName, email, password }
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro ao cadastrar usuário.");
  }

  return data;
}

export async function loginUser(user) {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user), // { email, password }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro ao fazer login.");
  }

  return data;
}

export async function logout() {
  try {
    await fetch(`${API_URL}/users/logout`, { method: "POST" });
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
}

export async function forgotPassword(email) {
  const response = await fetch(`${API_URL}/users/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro ao solicitar recuperação de senha.");
  }

  return data;
}

export async function resetPassword(token, password) {
  const response = await fetch(`${API_URL}/users/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro ao redefinir senha.");
  }

  return data;
}
