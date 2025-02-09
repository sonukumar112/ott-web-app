import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditMovie = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the movie to prefill the form
    fetch(`http://localhost:3000/movies/${id}`)
      .then((response) => response.json())
      .then((movie) => {
        setTitle(movie.title);
        setImage(movie.image);
      })
      .catch((error) => console.error("Error fetching movie:", error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update the movie in the backend
    fetch(`http://localhost:3000/movies/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, image }),
    })
      .then(() => {
        alert("Movie updated successfully!");
        navigate("/"); // Redirect to home
      })
      .catch((error) => console.error("Error updating movie:", error));
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", textAlign: "center" }}>
      <h2>Edit Movie</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <button type="submit">Update Movie</button>
      </form>
    </div>
  );
};

export default EditMovie;
