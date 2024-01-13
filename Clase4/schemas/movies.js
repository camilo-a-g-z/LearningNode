import z from "zod";

const movieSquema = z.object({
  title: z
    .string({
      invalid_type_error: "Movie title must be a string",
      required_error: "Movie title is required",
    })
    .min(1)
    .max(255),
  year: z.number().int().min(1888).max(2077),
  director: z.string(),
  duration: z.number().int().min(1).max(300),
  rate: z.number().min(0).max(10).default(5),
  poster: z.string().url({
    message: "Movie poster must be a valid URL",
  }),
  genre: z.array(
    z.enum(["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror"]),
    { required_error: "Movie genre is required" }
  ),
});

export function validateMovie(object) {
  return movieSquema.safeParse(object);
}

export function validatePartialMovie(object) {
  return movieSquema.partial().safeParse(object);
}
