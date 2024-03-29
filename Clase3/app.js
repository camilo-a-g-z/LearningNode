//npm install express - E  --> el -E es para que lo guarde en el package.json y que tenga la version exacta
const express = require("express");
const crypto = require("node:crypto");
const movies = require("./movies.json");
const { validateMovie, validatePartialMovie } = require("./schemas/movies.js");

const app = express();
app.use(express.json());
app.disable("x-powered-by");

const ACCEPTED_ORIGINS = ["http://localhost:8080", "http://localhost:3000"];
//Un endpoint es un path en el que tenemos un recurso

//Todos los recursos que sean MOVIES se identifican con el /movies
app.get("/movies", (req, res) => {
  const origin = req.header("origin");
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    //con esto se evita el problema de cors que es cuando se intenta acceder a un recurso desde un dominio distinto
    res.header("Access-Control-Allow-Origin", origin); //para que solo se pueda acceder desde ese dominio
  }
  const { genre } = req.query;
  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    );
    return res.json(filteredMovies);
  }
  res.json(movies);
});

//el recurso siempre se identifica con la misma url
app.post("/movies", (req, res) => {
  const result = validateMovie(req.body);
  if (result.error)
    return res.status(400).json({ message: JSON.parse(result.error.message) });
  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data,
  };
  movies.push(newMovie);
  res.status(201).json(newMovie); //sirve para actualizar la cache del cliente
});

//:id es un parametro que se puede pasar por la url
app.get("/movies/:id", (req, res) => {
  //path to regexp
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === id);
  if (movie) return res.json(movie);
  res.status(404).json({ message: "Movie not found" });
});

app.patch("/movies/:id", (req, res) => {
  const result = validatePartialMovie(req.body);
  if (!result.success)
    return res.status(400).json({ message: JSON.parse(result.error.message) });
  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);
  if (movieIndex < 0)
    return res.status(404).json({ message: "Movie not found" });
  const updateMovie = {
    ...movies[movieIndex],
    ...result.data,
  };
  movies[movieIndex] = updateMovie;
  console.log(updateMovie);
  return res.json(updateMovie);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
