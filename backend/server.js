const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let movies = [
    { id: 1, title: "Inception", genre: "Sci-Fi", releaseYear: 2010 },
];

app.get("/movies", (req, res) => res.json(movies));
app.post("/movies", (req, res) => {
    const newMovie = { id: Date.now(), ...req.body };
    movies.push(newMovie);
    res.json(newMovie);
});
app.put("/movies/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = movies.findIndex(movie => movie.id === id);
    if (index !== -1) {
        movies[index] = { ...movies[index], ...req.body };
        res.json(movies[index]);
    } else res.status(404).json({ message: "Movie not found" });
});
app.delete("/movies/:id", (req, res) => {
    const id = parseInt(req.params.id);
    movies = movies.filter(movie => movie.id !== id);
    res.json({ message: "Movie deleted successfully" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
