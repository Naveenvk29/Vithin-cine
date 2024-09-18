import { useGetGenresQuery } from "../../redux/api/genreApiSlice";
import { useCreateMovieMutation } from "../../redux/api/movieApiSlice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateMovie = () => {
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    detail: "",
    cast: [],
    rating: 0,
    image: "",
    genre: "",
  });

  const [createMovie, { isLoading }] = useCreateMovieMutation();
  const { data: genres, isLoading: isLoadingGenre } = useGetGenresQuery();

  useEffect(() => {
    if (genres?.length > 0) {
      setMovieData((prevData) => ({
        ...prevData,
        genre: prevData.genre || genres[0]._id,
      }));
    }
  }, [genres]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "genre") {
      const selectedGenre = genres.find((genre) => genre._id === value);
      setMovieData((prevData) => ({
        ...prevData,
        genre: selectedGenre ? selectedGenre._id : "",
      }));
    } else {
      setMovieData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // console.log("Selected Image File:", file); // Log the image file

    setMovieData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };
  const handleCreateMovie = async () => {
    try {
      console.log("Movie Data:", movieData); // Log movieData before submitting

      if (
        !movieData.name ||
        !movieData.year ||
        !movieData.detail ||
        !movieData.cast.length ||
        !movieData.image ||
        !movieData.genre
      ) {
        toast.error("All fields are required");
        return;
      }

      // Log that all validations have passed
      console.log("Passed all validations");

      // Create a FormData object
      const formData = new FormData();
      formData.append("name", movieData.name);
      formData.append("year", movieData.year);
      formData.append("detail", movieData.detail);
      formData.append("cast", movieData.cast); // Array needs to be stringified
      formData.append("rating", movieData.rating);
      formData.append("image", movieData.image); // Log the image file
      formData.append("genre", movieData.genre);

      //   console.log("FormData before submission:", formData); // Log the formData

      await createMovie(formData); // Submit formData

      //   console.log("Response from API:", res); // Log API response

      navigate("/admin/movies-list");
      setMovieData({
        name: "",
        year: 0,
        detail: "",
        cast: [],
        rating: 0,
        image: "",
        genre: "",
      });
      toast.success("Movie created successfully");
    } catch (error) {
      console.error("Error in submission:", error);
      toast.error("Error creating movie");
    }
  };

  return (
    <div className="flex justify-center items-center mt-[2vw]">
      <form>
        <p className="text-white font-black uppercase w-[55vw] text-2xl mb-4">
          Create Movie
        </p>
        <div className="mb-4">
          <label className=" text-white text-lg font-semibold block ">
            Name:
            <input
              type="text"
              name="name"
              value={movieData.name}
              onChange={handleChange}
              className="border px-2 py-1 w-full text-black outline-none border-none rounded-md font-medium"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-white ">
            Year:
            <input
              type="number"
              name="year"
              value={movieData.year}
              onChange={handleChange}
              className="border px-2 py-1 w-full text-black outline-none border-none rounded-md font-medium"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-white ">
            Detail:
            <textarea
              name="detail"
              value={movieData.detail}
              onChange={handleChange}
              className="border px-2 py-1 w-full text-black outline-none border-none rounded-md font-medium"
            ></textarea>
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-white ">
            Cast (comma-separated):
            <input
              type="text"
              name="cast"
              value={movieData.cast.join(", ")}
              onChange={(e) =>
                setMovieData({ ...movieData, cast: e.target.value.split(", ") })
              }
              className="border px-2 py-1 w-full text-black outline-none border-none rounded-md font-medium"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-white ">
            Genre:
            <select
              name="genre"
              value={movieData.genre}
              onChange={handleChange}
              className="border px-2 py-1 w-full text-black outline-none border-none rounded-md font-medium"
            >
              {isLoadingGenre ? (
                <option>Loading genres...</option>
              ) : (
                genres.map((genre) => (
                  <option key={genre._id} value={genre._id}>
                    {genre.name}
                  </option>
                ))
              )}
            </select>
          </label>
        </div>

        <div className="mb-4">
          <label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>
        </div>

        <button
          type="button"
          onClick={handleCreateMovie}
          className="bg-teal-500 text-white px-4 py-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Movie"}
        </button>
      </form>
    </div>
  );
};

export default CreateMovie;
