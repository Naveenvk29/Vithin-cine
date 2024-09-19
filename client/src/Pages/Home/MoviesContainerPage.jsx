import { useState } from "react";
import {
  useGetNewMoviesQuery,
  useGetRandomMoviesQuery,
  useGetTopMoviesQuery,
} from "../../redux/api/movieApiSlice";
import { useGetGenresQuery } from "../../redux/api/genreApiSlice";
import SliderUtil from "../../component/SliderUtil";

const MoviesContainerPage = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const { data: genres } = useGetGenresQuery();

  const { data } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  const filteredMovies = data?.filter(
    (movie) => setSelectedGenre === null || movie.genres === selectedGenre
  );

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
  };

  return (
    <div className="flex justify-around items-center gap-5">
      <nav className=" ml-[5vw] flex flex-col gap-3">
        {genres?.map((g) => {
          return (
            <button
              key={g._id}
              className={`text-white text-lg font-semibold hover:bg-purple-500 transition duration-300 p-2 rounded mb-[1vw] 
                ${selectedGenre === g.id ? "bg-red-500" : ""}`}
              onClick={() => handleGenreClick(g._id)}
            >
              {g.name}
            </button>
          );
        })}
      </nav>
      <section className="flex flex-col w-auto">
        <div className=" w-[80vw] ">
          <h1 className="text-white font-medium mb-5">Choose For You</h1>
          <SliderUtil data={randomMovies} />
        </div>

        <div className="w-[80vw] mb-8">
          <h1 className="text-white font-medium mb-5">Top Movies</h1>
          <SliderUtil data={topMovies} />
        </div>

        <div className="w-[80vw] mb-8">
          <h1 className="text-white font-medium mb-5">Choose Movie</h1>
          <SliderUtil data={filteredMovies} />
        </div>
      </section>
    </div>
  );
};

export default MoviesContainerPage;
