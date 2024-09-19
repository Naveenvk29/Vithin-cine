import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { setCredentials } from "../../redux/features/authSlice";
import { useLoginMutation } from "../../redux/api/userapiSlice";
import { toast } from "react-toastify";
import Loader from "../../component/Loader";

import login2 from "../../assets/login.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [userInfo, navigate, redirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...response }));
      navigate(redirect);
      toast.success("Logged in Successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className=" bg-cover    h-[100vh]"
      style={{
        // backgroundImage: `url(${"https://wallpapercave.com/wp/wp6702457.jpg"})`,
        backgroundImage: `url(${login2})`,
      }}
    >
      <section className="pl-[10rem] flex flex-wrap">
        <div className="mr-[4rem] mt-[5rem]">
          <h1 className="text-2xl font-semibold mb-4 text-white ">Sign In</h1>

          <form className="container w-[40rem]" onSubmit={handleSubmit}>
            <div className="my-[2rem]">
              <label
                htmlFor="email"
                className=" mb-5 block text-lg font-semibold text-white"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 border border-black outline-none rounded rounded-r-3xl w-full"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="my-[2rem]">
              <label
                htmlFor="password"
                className=" mb-5 block text-lg font-semibold text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 border border-black outline-none rounded rounded-r-3xl w-full"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="bg-[#01ac45] text-white px-4 py-2 rounded cursor-pointer my-[1rem] hover:bg-[#00712D]"
            >
              {isLoading ? "Signing In ..." : "Sign In"}
            </button>
            {isLoading && <Loader />}
          </form>

          <div className="mt-4">
            <p className="text-white font-semibold text-xl ">
              New Customer?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-[#387F39] hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
