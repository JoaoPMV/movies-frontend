const API_URL = import.meta.env.VITE_API_URL;

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
