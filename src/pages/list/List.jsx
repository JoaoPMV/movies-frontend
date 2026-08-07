import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listMovies } from "../../../api";

import "./List.css";

const List = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    console.log("Chamando listMovies");
    async function loadMovies() {
      try {
        const data = await listMovies();

        setMovies(data);
      } catch (error) {
        console.log(error.message);
      }
    }

    loadMovies();
  }, []);

  return (
    <div>
      <div className="container-list">
        <div className="header-list"></div>
        <div className="main-list">
          {movies.map((movie) => (
            <Link
              to={`/movies/${movie.slug}`}
              key={movie.slug}
              className="movie-link"
            >
              <div className="movie-box">
                <p className="title-movie">{movie.title}</p>
                {movie.image && (
                  <img
                    className="image-movie"
                    src={movie.image}
                    alt={movie.title}
                  />
                )}
              </div>
            </Link>
          ))}
        </div>
        <div className="footer-list"></div>
      </div>
    </div>
  );
};

export default List;
