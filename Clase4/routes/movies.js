import { Router } from "express";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const movies = require("../movies.json");
import { validateMovie, validatePartialMovie } from "../schemas/movies.js";
import { MovieModel } from "../models/movie.js";

export const moviesRouter = Router();

moviesRouter.get("/", async (req, res) => {
  const origin = req.header("origin");
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    //con esto se evita el problema de cors que es cuando se intenta acceder a un recurso desde un dominio distinto
    res.header("Access-Control-Allow-Origin", origin); //para que solo se pueda acceder desde ese dominio
  }
  const { genre } = req.query;
  const movies = await MovieModel.getAll({ genre });
  res.json(movies);
});

moviesRouter.get("/:id", async (req, res) => {
  //path to regexp
  const { id } = req.params;
  const movie = await MovieModel.getById({ id });
  res.status(404).json({ message: "Movie not found" });
});

moviesRouter.post("/", async (req, res) => {
  const result = validateMovie(req.body);
  if (result.error)
    return res.status(400).json({ message: JSON.parse(result.error.message) });
  const newMovie = await MovieModel.create(result.data);
  res.status(201).json(newMovie); //sirve para actualizar la cache del cliente
});

moviesRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await MovieModel.delete({ id });
  if (movieIndex === false)
    return res.status(404).json({ message: "Movie not found" });
  res.sendStatus(204);
});

moviesRouter.patch("/:id", async (req, res) => {
  const result = validatePartialMovie(req.body);
  if (!result.success)
    return res.status(400).json({ message: JSON.parse(result.error.message) });
  const { id } = req.params;
  const updateMovie = await MovieModel.update({ id, input: result.data });
  return res.json(updateMovie);
});
