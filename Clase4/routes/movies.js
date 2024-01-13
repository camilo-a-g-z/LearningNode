import { Router } from "express";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const movies = require("../movies.json");
import { validateMovie, validatePartialMovie } from "../schemas/movies.js";

export const moviesRouter = Router();

moviesRouter.get("/", (req, res) => {
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

moviesRouter.get("/:id", (req, res) => {
  //path to regexp
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === id);
  if (movie) return res.json(movie);
  res.status(404).json({ message: "Movie not found" });
});

moviesRouter.post("/", (req, res) => {
  const result = validateMovie(req.body);
  if (result.error)
    return res.status(400).json({ message: JSON.parse(result.error.message) });
  const newMovie = {
    id: randomUUID(),
    ...result.data,
  };
  movies.push(newMovie);
  res.status(201).json(newMovie); //sirve para actualizar la cache del cliente
});

moviesRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);
  if (movieIndex < 0)
    return res.status(404).json({ message: "Movie not found" });
  movies.splice(movieIndex, 1);
  res.sendStatus(204);
});

moviesRouter.patch("/:id", (req, res) => {
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
