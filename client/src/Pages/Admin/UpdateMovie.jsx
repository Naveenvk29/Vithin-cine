import {
  useUpdateMovieMutation,
  useDeleteMovieMutation,
  useGetSpecificMovieQuery,
} from "../../redux/api/movieApiSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    detail: "",
    cast: [],
    ratings: 0,
    image: null,
  });
  const { data: initialMovieData } = useGetSpecificMovieQuery(id);

  useEffect(() => {
    if (initialMovieData) {
      setMovieData(initialMovieData);
    }
  }, [initialMovieData]);

  //   const { mutate: updateMovie } = useUpdateMovieMutation();
  const { mutate: deleteMovie } = useDeleteMovieMutation();

  const handleDelete = async () => {
    try {
      await deleteMovie(id);
      toast.success("Movie deleted successfully");
      navigate("/movies");
    } catch (error) {
      console.log(error);

      toast.error(error.message);
    }
  };
  return (
    <div className="container flex justify-center items-center mt-[5vw]">
      <form>
        <p className="text-white w-[50rem] text-2xl mb-4 font-bold uppercase">
          Update Movie
        </p>

        <div className="mb-4">
          <label className="block text-white text-lg  ">
            Name:
            <input
              type="text"
              name="name"
              value={movieData.name}
              className="border px-2 py-1 w-full text-black font-medium"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-white text-lg ">
            Year:
            <input
              type="number"
              name="year"
              value={movieData.year}
              className="border px-2 py-1 w-full text-black font-medium"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-white text-lg ">
            Detail:
            <textarea
              name="detail"
              value={movieData.detail}
              className="border px-2 py-1 w-full text-black font-medium"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-white text-lg ">
            Cast (comma-separated):
            <input
              type="text"
              name="cast"
              value={movieData.cast.join(", ")}
              onChange={(e) =>
                setMovieData({ ...movieData, cast: e.target.value.split(", ") })
              }
              className="border px-2 py-1 w-full text-black font-medium"
            />
          </label>
        </div>

        <div className="mb-4">
          <label>
            {/* {!selectedImage && "Upload Image"} */}
            <input
              type="file"
              accept="image/*"
              //   onChange={handleImageChange}
              //   style={{ display: !selectedImag/e ? "none" : "block text-white text-lg " }}
            />
          </label>
        </div>

        <button
          type="button"
          className="bg-teal-500 text-white px-4 py-2 rounded mr-14"
        >
          upload
        </button>

        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded ml-2"
          //   disabled={isUpdatingMovie || isUploadingImage}
        >
          Delete Movie
        </button>
      </form>
    </div>
  );
};

export default UpdateMovie;
