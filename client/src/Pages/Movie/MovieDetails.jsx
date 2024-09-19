import { useState } from "react";
import {
  useGetSpecificMovieQuery,
  useAddMovieReviewMutation,
} from "../../redux/api/movieApiSlice";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import MovieTabs from "./MovieTabs";

const MovieDetails = () => {
  const { id: movieId } = useParams();
  const { data: movie, refetch, isLoading } = useGetSpecificMovieQuery(movieId);
  const { userInfo } = useSelector((state) => state.auth);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [createReview, { isLoading: loadingMovieReview }] =
    useAddMovieReviewMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating < 1) {
      toast.error("Rating must be at least 1");
      return;
    }
    try {
      await createReview({
        id: movieId,
        rating,
        comment,
      }).unwrap();

      refetch();

      toast.success("Review submitted successfully");
    } catch (error) {
      console.error("Review submission error:", error);
      const errorMessage = error?.data?.message || "Failed to submit review";
      toast.error(errorMessage);
    }
  };

  if (isLoading || !movie) {
    return <div className="text-white">Loading movie details...</div>;
  }

  return (
    <>
      <div className="mt-[2vw] ml-[20vw] ">
        <Link
          to="/"
          className=" text-white font-semibold hover:underline hover:text-purple-300 transition duration-300"
        >
          Go Back
        </Link>
      </div>

      <div className="max-w-screen-lg mx-auto mt-[2vw]">
        <div className="flex items-center justify-center">
          <img
            src={movie?.poster.url}
            alt={movie?.title}
            className="rounded-md w-[70%]"
          />
        </div>
        <div className="flex items-center justify-between ml-[8vw] mt-5">
          <section className="w-[30vw]">
            <h1 className="text-2xl font-extrabold text-white mb-2 capitalize ">
              {movie?.title}
            </h1>
            <p className="text-[1.1vw] text-gray-300">{movie?.detail}</p>
          </section>
          <section>
            <p className="text-2xl text-white tracking-tight font-semibold">
              Releasing Date: {movie?.year}
            </p>
            <div>
              {movie?.cast && movie.cast.length > 0 ? (
                movie.cast.map((c) => (
                  <span key={c} className="text-lg font-medium text-white">
                    {c}
                  </span>
                ))
              ) : (
                <span className="text-lg font-medium text-white">
                  No cast information available
                </span>
              )}
            </div>
          </section>
        </div>
        <div className="flex items-center justify-center my-12 ">
          <MovieTabs
            loadingMovieReview={loadingMovieReview}
            userInfo={userInfo}
            submitHandler={handleSubmit}
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            movie={movie}
          />
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
