import "../styles.css";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesRequest } from "../actions/movieActions";

const Homepage = () => {
  const dispatch = useDispatch();
  const { loading, movies, error } = useSelector((state) => state.movie); // Access state from reducer

  useEffect(() => {
    dispatch(fetchMoviesRequest());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id} className="movie-item">
          <Link to={`/movie/${movie.id}`}>
            {" "}
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <h3>{movie.title}</h3>
          </Link>
          <p>{movie.release_date}</p>
        </li>
      ))}
    </ul>
  );
};

export default Homepage;
