import Movie from "../Models/movie.model.js";
import { uploadImage, deleteImage } from "../Utils/cloudinary.js";

const createMovie = async (req, res) => {
  try {
    const { title, genre, year, detail, cast } = req.body;
    const posterUpload = req.file;

    if (!title || !genre || !year || !detail || !cast || !posterUpload) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const poster = await uploadImage(posterUpload);

    const movie = new Movie({
      title,
      genre,
      year,
      detail,
      cast,
      poster,
    });

    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getSpecificMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (!movie) return res.status(404).json({ error: "Movie not found" });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (!movie) return res.status(404).json({ error: "Movie not found" });
    const posterUpload = req.file;

    if (posterUpload) {
      try {
        if (movie.poster && movie.poster.public_id) {
          await deleteImage(movie.poster.public_id);
        }
        const poster = await uploadImage(posterUpload);
        movie.poster = {
          url: poster.secure_url,
          public_id: poster.public_id,
        };
      } catch (error) {
        return res.status(400).json({ error: "Failed to updated poster" });
      }
    }
    movie.title = req.body.title || movie.title;
    movie.genre = req.body.genre || movie.genre;
    movie.year = req.body.year || movie.year;
    movie.detail = req.body.detail || movie.detail;
    movie.cast = req.body.cast || movie.cast;
    movie.updatedAt = new Date(); // Update updatedAt field automatically
    await movie.save();
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (!movie) return res.status(404).json({ error: "Movie not found" });
    if (movie.poster && movie.poster.public_id) {
      await deleteImage(movie.poster.public_id);
    }
    await movie.deleteOne();
    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error" });
  }
};

const movieReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment, rating } = req.body;
    const movie = await Movie.findById(id);
    if (movie) {
      const alreadyReviewed = movie.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        return res
          .status(400)
          .json({ error: "You have already reviewed this movie" });
      }
      const review = {
        name: req.user.userName,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
      movie.reviews.push(review);
      movie.numReviews = movie.reviews.length;
      movie.rating =
        movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
        movie.reviews.length;
      await movie.save();
      res.json(movie);
    } else {
      return res.status(404).json({ error: "Movie not found" });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error" });
  }
};

const deletecomment = async (req, res) => {
  try {
    const { movieId, reviewId } = req.body;
    const movie = await Movie.findById(movieId);

    if (!movie) return res.status(404).json({ error: "Movie not found" });

    const reviewIndex = movie.reviews.findIndex(
      (r) => r._id.toString() === reviewId
    );
    if (reviewIndex === -1) {
      return res.status(404).json({ error: "Review not found" });
    }

    movie.reviews.splice(reviewIndex, 1);
    movie.numReviews = movie.reviews.length;
    movie.rating =
      movie.length > 0
        ? movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
          movie.reviews.length
        : 0;
    await movie.save();
    res.json({ message: "comment deletd successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//

const getNewMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 }).limit(1);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getTopMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ numReviews: -1 }).limit(10);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getRandomMovies = async (req, res) => {
  try {
    const movies = await Movie.aggregate([{ $sample: { size: 10 } }]);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export {
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
};
