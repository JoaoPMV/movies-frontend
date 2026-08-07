const API_URL = import.meta.env.VITE_API_URL;

export async function registerUser(user) {
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
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Erro ao fazer login");
  }

  return await response.json();
}

export async function listMovies() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/movies/list`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar filmes.");
  }

  return await response.json();
}

export async function getMovieBySlug(slug) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/movies/${slug}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar filme.");
  }

  return await response.json();
}
