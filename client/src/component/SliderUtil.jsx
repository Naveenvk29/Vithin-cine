import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCard from "../pages/Movie/MovieCard";

const SliderUtil = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
  };

  return (
    <Slider {...settings}>
      {data?.map((movie) => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
    </Slider>
  );
};

export default SliderUtil;
