import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; //Import useDispatch and useSelector
import { addToFavorites, removeFromFavorites } from "../actions/movieActions";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch(); //Get dispatch function
  const favorites = useSelector((state) => state.movie.favorites); // Access favorites from Redux store

  useEffect(() => {
    const apiKey = "f78a29ca41f945580f00ecd19a11d476";
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;

    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return <div>Loading movie details...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  const handleAddToFavorites = () => {
    dispatch(addToFavorites(movie.id));
  };

  const handleRemoveFromFavorites = () => {
    dispatch(removeFromFavorites(movie.id));
  };

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>Release Date: {movie.release_date}</p>
      <p>Overview: {movie.overview}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      {favorites.includes(movie.id) ? (
        <button onClick={handleRemoveFromFavorites}>
          Remove from Favorites
        </button>
      ) : (
        <button onClick={handleAddToFavorites}>Add to Favorites</button>
      )}
    </div>
  );
};

export default MovieDetails;
