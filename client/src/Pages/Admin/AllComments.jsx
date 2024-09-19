import {
  useDeleteCommentMutation,
  useGetAllMoviesQuery,
} from "../../redux/api/movieApiSlice";
import { toast } from "react-toastify";

const AllComments = () => {
  const { data: movie, refetch } = useGetAllMoviesQuery();

  const [deleteComment] = useDeleteCommentMutation();

  const handleDeleteComment = async (movieId, reviewId) => {
    try {
      await deleteComment({ movieId, reviewId });
      toast.success("Comment Deleted");
      refetch();
    } catch (error) {
      console.error("Error deleting comment: ", error);
    }
  };

  return (
    <div>
      {movie?.map((m) => (
        <section
          key={m._id}
          className="flex flex-col justify-center items-center"
        >
          {m?.reviews.map((review) => (
            <div
              key={review._id}
              className="bg-gray-200 p-4 rounded-lg w-[50%] mt-[2rem]"
            >
              <div className="flex justify-between">
                <strong className="text-black">{review.name}</strong>
                <p className="text-gray-800">
                  {review.createdAt.substring(0, 10)}
                </p>
              </div>

              <div className=" flex items-center justify-between">
                <p className="my-4">{review.comment}</p>
                <p className="my-4">Rating:- {review.rating}</p>
              </div>

              <button
                className="text-white bg-red-500 px-4 py-1 rounded-full hover:bg-red-800"
                onClick={() => handleDeleteComment(m._id, review._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
};
export default AllComments;
