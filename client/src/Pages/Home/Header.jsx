import { useGetNewMoviesQuery } from "../../redux/api/movieApiSlice";
import { Link } from "react-router-dom";
import SliderUtil from "../../component/SliderUtil";

const Header = () => {
  const { data: newMovies } = useGetNewMoviesQuery();

  return (
    <div className="flex mt-[2.5vw] justify-between  items-start">
      <nav className="w-[10vw] mb-4 ">
        <Link
          to="/"
          className=" text-white text-xl font-medium transition duration-300 hover:bg-purple-500  block p-2 rounded mb-2"
        >
          Home
        </Link>
        <Link
          to="/movies"
          className=" text-white text-xl font-medium transition duration-300 hover:bg-purple-500  block p-2 rounded mb-2"
        >
          Browse Movies
        </Link>
      </nav>
      <div className="w-[80vw] mr-7 ">
        <SliderUtil data={newMovies} />
      </div>
    </div>
  );
};

export default Header;
