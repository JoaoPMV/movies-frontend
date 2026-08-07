import { useEffect, useState } from "react";
import { getMovieBySlug } from "../../api";

export function useMovie(slug) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovie() {
      try {
        setLoading(true);
        const data = await getMovieBySlug(slug);
        setMovie(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadMovie();
    }
  }, [slug]);

  return { movie, loading };
}
