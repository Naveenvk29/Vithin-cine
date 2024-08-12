import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../redux/features/authSlice";
import { useLoginMutation } from "../../redux/api/userApi";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import log1 from "../../assets/log1.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div
      className="relative h-[100vh] -mt-3 -mb-3 bg-cover"
      style={{
        backgroundImage: `url(${log1})`,
      }}
    >
      <section className="pl-[10rem] flex ">
        <div className="mr-[4rem] mt-[8rem]">
          <h1 className="text-gray-500 text-3xl font-bold mb-4">Sign In</h1>

          <form onSubmit={submitHandler} className="container w-[40rem]">
            <div className="my-[2rem]">
              <label
                htmlFor="email"
                className="block text-lg font-bold text-white"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 border border-gray-700 rounded-e-3xl w-full"
                placeholder="Enter User Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="my-[2rem]">
              <label
                htmlFor="password"
                className="block text-lg  font-bold text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 border border-gray-700 rounded-e-3xl w-full"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="bg-fuchsia-500 text-lg font-semibold  text-white  hover:bg-fuchsia-950 px-4 py-2 rounded-xl cursor-pointer my-[1rem]"
            >
              {isLoading ? "Signing In ..." : "Sign In"}
            </button>
            {isLoading && <Loader />}
          </form>

          <div className="mt-4 text-xl font-bold">
            <p className="text-white">
              New Customer?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-pink-400 hover:underline"
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
