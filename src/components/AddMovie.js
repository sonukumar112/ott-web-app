import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMovie = {
      title,
      image,
    };

    fetch("http://localhost:3000/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMovie),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add movie");
        }
        return response.json();
      })
      .then(() => {
        alert("Movie added successfully!");
        setTitle("");
        setImage("");
        navigate("/"); // Navigate back to home page
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div
      style={{ maxWidth: "500px", margin: "50px auto", textAlign: "center" }}
    >
      <h2>Add New Movie</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
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
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovie;
