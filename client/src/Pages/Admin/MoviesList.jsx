import { useGetAllMoviesQuery } from "../../redux/api/movieApiSlice";
import { Link } from "react-router-dom";

const AdminMoviesList = () => {
  const { data: movies } = useGetAllMoviesQuery();
  // console.log(movies);

  return (
    <div className="container  ">
      <div className="flex items-center ">
        <div className="p-3">
          <div className="ml-[2rem] text-xl font-bold text-white  uppercase">
            All Movies ({movies?.length})
          </div>

          <div className="flex flex-wrap justify-around items-center p-[2rem]">
            {movies?.map((movie) => (
              <Link
                key={movie._id}
                to={`/admin/movies/update/${movie._id}`}
                className="block mb-4 overflow-hidden"
              >
                <div className="flex">
                  <div
                    key={movie._id}
                    className="max-w-sm  m-[2rem] rounded overflow-hidden shadow-lg"
                  >
                    <img
                      src={movie.poster.url}
                      alt={movie.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="px-6 py-4 border border-gray-400">
                      <div className="font-bold text-xl  text-white ">
                        {movie.title}
                      </div>
                    </div>

                    <p className="text-gray-300 text-base">{movie.detail}</p>

                    <div className="mt-[2rem] mb-[1rem]">
                      <Link
                        to={`/admin/movies/update/${movie._id}`}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Update Movie
                      </Link>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMoviesList;
