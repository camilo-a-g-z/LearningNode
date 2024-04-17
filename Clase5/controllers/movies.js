import { validateMovie, validatePartialMovie } from "../schemas/movies.js";

export class MovieController {
  //inyeccion de dependencias
  constructor({ movieModel }) {
    this.movieModel = movieModel;
  }
  getAll = async (req, res) => {
    const { genre } = req.query;
    const movies = await this.movieModel.getAll({ genre });
    res.json(movies);
  };
  getById = async (req, res) => {
    //path to regexp
    const { id } = req.params;
    const movie = await this.movieModel.getById({ id });
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  };
  create = async (req, res) => {
    const result = validateMovie(req.body);
    console.log(result.data);
    if (result.error)
      return res
        .status(400)
        .json({ message: JSON.parse(result.error.message) });
    const newMovie = await this.movieModel.create(result.data);
    res.status(201).json(newMovie); //sirve para actualizar la cache del cliente
  };
  delete = async (req, res) => {
    const { id } = req.params;
    const result = await this.movieModel.delete({ id });
    if (result === false)
      return res.status(404).json({ message: "Movie not found" });
    res.sendStatus(204);
  };
  update = async (req, res) => {
    const result = validatePartialMovie(req.body);
    if (!result.success)
      return res
        .status(400)
        .json({ message: JSON.parse(result.error.message) });
    const { id } = req.params;
    const updateMovie = await this.movieModel.update({
      id,
      input: result.data,
    });
    return res.json(updateMovie);
  };
}
