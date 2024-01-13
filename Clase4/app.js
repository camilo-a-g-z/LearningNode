//npm install express - E  --> el -E es para que lo guarde en el package.json y que tenga la version exacta
import express, { json } from "express";
import { randomUUID } from "node:crypto";
import { validateMovie, validatePartialMovie } from "./schemas/movies.js";
import { moviesRouter } from "./routes/movies.js";

//se puede importar el JSON en EMACSCRIPT MODULES
//import fs from "node:fs";
//const movies = JSON.parse(fs.readFileSync("movies.json", "utf-8"));

//como leer un JSON en EMACSCRIPT MODULES recomendado por ahora
import { createRequire } from "node:module";
import { error } from "node:console";
import { corsMiddleware } from "./middlewares/cors.js";
const require = createRequire(import.meta.url);
const movies = require("./movies.json");

const app = express();
app.use(json());
app.use(corsMiddleware());
app.disable("x-powered-by");

//Un endpoint es un path en el que tenemos un recurso

//Todos los recursos que sean MOVIES se identifican con el /movies
app.use("/movies", moviesRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
