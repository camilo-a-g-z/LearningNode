import { createApp } from "./app";
import { MovieModel } from "./models/database/movie";

createApp({ movieModel: MovieModel });
