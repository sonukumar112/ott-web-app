import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MovieList.css";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  // Fetch movies from the backend
  useEffect(() => {
      fetch("http://localhost:3000/movies")
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  // Delete a movie
  const handleDelete = (id) => {
    fetch(`http://localhost:3000/movies/${id}`, { // Use the movie's id in the URL
      method: "DELETE",
    })
      .then(() => {
        alert("Movie deleted successfully!");
        setMovies(movies.filter((movie) => movie.id !== id)); // Update the state to remove the movie
      })
      .catch((error) => console.error("Error deleting movie:", error));
  };
  

  // Navigate to edit page
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="movie-list">
      <h2>Available Movies</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={movie.image} alt={movie.title} className="movie-image" />
            <div className="movie-name">{movie.title}</div>
            <div className="movie-actions">
              <button onClick={() => handleEdit(movie.id)}>Edit</button>
              <button onClick={() => handleDelete(movie.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
