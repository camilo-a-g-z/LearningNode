import cors from "cors";
const ACCEPTED_ORIGINS = ["http://localhost:8080", "http://localhost:3000"];
export const corsMiddleware = ({ aceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        return callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
      return callback(new Error("Not allowed by CORS"));
    },
  });
