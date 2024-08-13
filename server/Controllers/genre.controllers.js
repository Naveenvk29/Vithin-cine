import Genre from "../Models/genre.model.js";
import asyncHandler from "../Utils/asyncHandler.js";

const createGenre = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(404).json({ error: "Name is required" });

    const existingGenre = await Genre.findOne({ name });
    if (existingGenre)
      return res.status(409).json({ error: "Genre already exists" });
    const genre = await Genre({ name }).save();
    res.status(201).json(genre);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
});

const updateGenre = asyncHandler(async (req, res) => {
  const { id } = req.params; // Ensure this matches the API call
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });

  const genre = await Genre.findById(id); // Ensure `id` is used correctly
  if (!genre) return res.status(404).json({ error: "Genre not found" });

  genre.name = name;
  const updatedGenre = await genre.save();
  res.json(updatedGenre);
});

const deleteGenre = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const genre = await Genre.findById(id);
    if (!genre) return res.status(404).json({ error: "Genre not found" });
    await genre.deleteOne();
    res.json({ message: "Genre deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
});

const getAllGenres = asyncHandler(async (req, res) => {
  try {
    const genres = await Genre.find({});
    res.json(genres);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
});
const readGenre = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const genre = await Genre.findById(id);
    if (!genre) return res.status(404).json({ error: "Genre not found" });
    res.json(genre);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
});

export { createGenre, updateGenre, deleteGenre, getAllGenres, readGenre };
