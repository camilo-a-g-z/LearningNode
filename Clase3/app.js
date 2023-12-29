//npm install express - E  --> el -E es para que lo guarde en el package.json y que tenga la version exacta
const express = require("express");
const movies = require("./movies.json");

const app = express();
app.disable("x-powered-by");

//Un endpoint es un path en el que tenemos un recurso

//Todos los recursos que sean MOVIES se identifican con el /movies
app.get("/movies", (req, res) => {
  const { genre } = req.query;
  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    );
    return res.json(filteredMovies);
  }
  res.json(movies);
});

//:id es un parametro que se puede pasar por la url
app.get("/movies/:id", (req, res) => {
  //path to regexp
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === id);
  if (movie) return res.json(movie);
  res.status(404).json({ message: "Movie not found" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
