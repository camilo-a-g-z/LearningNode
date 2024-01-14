import { MovieModel } from "../models/movie.js";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const movies = require("../movies.json");
import { validateMovie, validatePartialMovie } from "../schemas/movies.js";

export class MovieController {
  static async getAll(req, res) {
    const { genre } = req.query;
    const movies = await MovieModel.getAll({ genre });
    res.json(movies);
  }
  static async getById(req, res) {
    //path to regexp
    const { id } = req.params;
    const movie = await MovieModel.getById({ id });
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  }
  static async create(req, res) {
    const result = validateMovie(req.body);
    if (result.error)
      return res
        .status(400)
        .json({ message: JSON.parse(result.error.message) });
    const newMovie = await MovieModel.create(result.data);
    res.status(201).json(newMovie); //sirve para actualizar la cache del cliente
  }
  static async delete(req, res) {
    const { id } = req.params;
    const result = await MovieModel.delete({ id });
    if (result === false)
      return res.status(404).json({ message: "Movie not found" });
    res.sendStatus(204);
  }
  static async update(req, res) {
    const result = validatePartialMovie(req.body);
    if (!result.success)
      return res
        .status(400)
        .json({ message: JSON.parse(result.error.message) });
    const { id } = req.params;
    const updateMovie = await MovieModel.update({ id, input: result.data });
    return res.json(updateMovie);
  }
}
