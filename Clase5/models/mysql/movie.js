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

  static async getById({ id }) {
    const [movies] = await connection.query(
      "SELECT *, BIN_TO_UUID(ID) FROM movie WHERE id = UUID_TO_BIN(?);",
      [id]
    );
    if (movies.length === 0) return null;
    return movies[0];
  }

  static async create(input) {
    const {
      genre: genreInput,
      title,
      year,
      duration,
      director,
      rate,
      poster,
    } = input;
    //convertir el genero a minuscula
    const lowerCaseGenre = genreInput.toLowerCase();
    //genreInpit is an array
    const [genres] = await connection.query(
      "SELECT id, name FROM genre WHERE name IN (?)",
      [lowerCaseGenre]
    );
    //no se encontró el genero
    if (genres.length === 0) return null;

    //obtener el id del genero
    const [{ id }] = genres;

    //crear uuid
    const [uuidResult] = await connection.query("SELECT UUID() uuid;");
    const [{ uuid }] = uuidResult;

    try {
      await connection.query(
        "INSERT INTO movie(id, title, year, duration, director, rate, poster) VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);",
        [uuid, title, year, duration, director, rate, poster]
      );
    } catch (err) {
      throw new Error("Error al crear la pelicula");
    }

    const [movies] = await connection.query(
      "SELECT *, BIN_TO_UUID(ID) FROM movie WHERE id = UUID_TO_BIN(?);",
      [uuid]
    );

    return movies[0];
  }

  static async delete({ id }) {
    const [movies] = await connection.query(
      "SELECT *, BIN_TO_UUID(ID) FROM movie WHERE id = UUID_TO_BIN(?);",
      [id]
    );
    if (movies.length === 0) return null;
    await connection.query("DELETE FROM movie WHERE id = UUID_TO_BIN(?);", [
      id,
    ]);
    return movies[0];
  }

  static async update({ id, input }) {
    const {
      genre: genreInput,
      title,
      year,
      duration,
      director,
      rate,
      poster,
    } = input;

    //convertir el genero a minuscula
    const lowerCaseGenre = genreInput.toLowerCase();
    //genreInpit is an array
    const [genres] = await connection.query(
      "SELECT id, name FROM genre WHERE name IN (?)",
      [lowerCaseGenre]
    );
    //no se encontró el genero
    if (genres.length === 0) return null;

    //obtener el id del genero
    const [{ id: genreId }] = genres;

    const [movies] = await connection.query(
      "SELECT *, BIN_TO_UUID(ID) FROM movie WHERE id = UUID_TO_BIN(?);",
      [id]
    );
    if (movies.length === 0) return null;

    await connection.query(
      "UPDATE movie SET title = ?, year = ?, duration = ?, director = ?, rate = ?, poster = ? WHERE id = UUID_TO_BIN(?);",
      [title, year, duration, director, rate, poster, id]
    );

    const [updatedMovie] = await connection.query(
      "SELECT *, BIN_TO_UUID(ID) FROM movie WHERE id = UUID_TO_BIN(?);",
      [id]
    );

    return updatedMovie[0];
  }
}
