//npm install express - E  --> el -E es para que lo guarde en el package.json y que tenga la version exacta
import express, { json } from "express";
import { corsMiddleware } from "./middlewares/cors.js";
import { createMoviesRouter } from "./routes/movies.js";

export const createApp = ({ movieModel }) => {
  const app = express();
  app.use(json());
  app.use(corsMiddleware());
  app.disable("x-powered-by");

  //Un endpoint es un path en el que tenemos un recurso

  //Todos los recursos que sean MOVIES se identifican con el /movies
  app.use("/movies", createMoviesRouter(movieModel));

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });

  return app;
};
/*

*/
