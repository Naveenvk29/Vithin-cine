import express from "express";
import {
  createGenre,
  updateGenre,
  deleteGenre,
  getAllGenres,
  readGenre,
} from "../Controllers/genre.controllers.js";

import {
  authenticated,
  authorrizedAsAdmin,
} from "../MiddleWares/auth.middleware.js";

const router = express.Router();
// admin routes
router.route("/").post(authenticated, authorrizedAsAdmin, createGenre);
router.route("/:id").put(authenticated, authorrizedAsAdmin, updateGenre);
router.route("/:id").delete(authenticated, authorrizedAsAdmin, deleteGenre);

//public routes
router.route("/genres").get(getAllGenres);
router.route("/:id").get(readGenre);

export default router;
