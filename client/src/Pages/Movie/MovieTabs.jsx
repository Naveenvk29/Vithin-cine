import { Link } from "react-router-dom";

const MovieTabs = ({
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  movie,
}) => {
  return (
    <div>
      <section>
        {userInfo ? (
          <form onSubmit={submitHandler}>
            <div>
              <label className="block text-2xl text-white font-semibold tracking-tight mb-2">
                Rating
              </label>

              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="p-2 border outline-none rounded-lg w-[50vw] text-black"
              >
                <option value={0}>Select Rating</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>
            <div className="my-2">
              <label className="block text-2xl text-white font-semibold tracking-tight mb-2">
                Write Your Review
              </label>

              <textarea
                id="comment"
                rows="3"
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="p-2 border outline-none rounded-lg w-[50vw] text-balck"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-lg"
            >
              Submit
            </button>
          </form>
        ) : (
          <h2 className="text-xl text-gray-400">
            Please
            <Link to="/login">
              <span className="text-white mx-3 text-2xl uppercase hover:underline hover:text-indigo-500 ">
                SignIn
              </span>
            </Link>
            to write a review
          </h2>
        )}
      </section>

      <section className="mt-[3rem]">
        <div className="text-white ">
          {movie?.reviews.length === 0 && <p>No Reviews</p>}
        </div>

        <div>
          {movie?.reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white p-4 rounded-lg w-[25vw] mt-[2rem]"
            >
              <div className="flex justify-between">
                <strong className="text-black">{review.name}</strong>
                <p className="text-gray-900">
                  {review.createdAt.substring(0, 10)}
                </p>
              </div>
              <div className="my-4 flex justify-between items-center">
                <p className="text-gray-800">{review.comment}</p>
                <p className="text-gray-700">
                  Rating:- <span className="text-black">{review.rating}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MovieTabs;
