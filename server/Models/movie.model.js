import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 500,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    poster: {
      url: { type: String }, // URL of the movie poster
      public_id: { type: String },
    },
    genre: {
      type: ObjectId,
      ref: "Genre",
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    detail: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 500,
    },
    cast: [{ type: String }],
    reviews: [reviewSchema],
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
