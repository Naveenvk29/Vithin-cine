import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// routes import
import userRoutes from "./Routes/user.routes.js";
import genreRoutes from "./Routes/genre.routes.js";
import movieRoutes from "./Routes/movie.routes.js";
// Express setup
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes middleware
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/genre", genreRoutes);
app.use("/api/v1/movies", movieRoutes);

app.get("/test", (req, res) => {
  res.json({ message: "Hello World!" });
  console.log("hello world!");
});

export { app };
