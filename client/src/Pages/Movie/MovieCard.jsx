import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div key={movie._id} className="relative group m-[2rem] overflow-hidden">
      <Link to={`/movies/${movie._id}`}>
        <img
          src={movie.poster.url}
          alt={movie.title}
          className="w-[20rem] h-[20rem] rounded m-0 p-0 transition duration-300 ease-in-out transform group-hover:opacity-40"
        />
      </Link>

      <p className="absolute text-white font-bold text-2xl top-[50%] left-[3vw] right-0 bottom-0 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">
        {movie.title}
      </p>
    </div>
  );
};

export default MovieCard;
