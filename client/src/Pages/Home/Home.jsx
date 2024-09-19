import Header from "./Header";
import MoviesContainerPage from "./MoviesContainerPage";
const Home = () => {
  return (
    <div className="p-5">
      <Header />
      <div>
        <MoviesContainerPage />
      </div>
    </div>
  );
};

export default Home;
