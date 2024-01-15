import mysql from "mysql2/promise";

const conf = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "hydro",
  database: "moviesdb",
};

const connection = await mysql.createConnection(conf);

export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase();
      const [genres] = await connection.query(
        "SELECT id, name FROM genre WHERE LOWER(name) = ? ",
        [lowerCaseGenre]
      );
      //no se encontró el genero
      if (genres.length === 0) return [];

      //obtener el id del genero
      const [{ id }] = genres;

      //obtener los id de las peliculas
      const [movies_id] = await connection.query(
        "SELECT movie_id FROM movie_genres WHERE genre_id = ?",
        [id]
      );
      //obtener las peliculas
      if (movies_id.length === 0) return [];

      const [movies] = await connection.query(
        "SELECT *, BIN_TO_UUID(ID) FROM movie WHERE id IN (?)",
        [movies_id.map((movie) => movie.movie_id)]
      );
      return movies;
    }

    const [movies, tableInfo] = await connection.query(
      "SELECT *, BIN_TO_UUID(ID) FROM MOVIE;"
    );
    return movies;
  }

  static async getById({ id }) {}

  static async create({ input }) {}

  static async delete({ id }) {}

  static async update({ id, input }) {}
}
