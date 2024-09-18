import express from "express";
import {
  createMovie,
  getAllMovies,
  getSpecificMovie,
  updateMovie,
  deleteMovie,
  movieReview,
  deletecomment,
  getNewMovies,
  getTopMovies,
  getRandomMovies,
} from "../Controllers/movie.controller.js";

import {
  authenticated,
  authorrizedAsAdmin,
} from "../MiddleWares/auth.middleware.js";
import upload from "../MiddleWares/multer.middlewares.js";
import checkId from "../MiddleWares/checkId.js";
const router = express.Router();

router.post(
  "/create-movie",
  upload.single("poster"),
  authenticated,
  authorrizedAsAdmin,
  createMovie
);
router.put(
  "/update-movie/:id",
  upload.single("poster"),
  authenticated,
  authorrizedAsAdmin,
  updateMovie
);
router.delete(
  "/delete-movie/:id",
  authenticated,
  authorrizedAsAdmin,
  deleteMovie
);
router.delete(
  "/delete-comment",
  authenticated,
  authorrizedAsAdmin,
  deletecomment
);

// Public routes

router.get("/all-movies", getAllMovies);
router.get("/specific-movie/:id", getSpecificMovie);
router.get("/new-movies", getNewMovies);
router.get("/top-movies", getTopMovies);
router.get("/random-movies", getRandomMovies);

//private routes
router.post("/:id/reviews", authenticated, checkId, movieReview);

export default router;
