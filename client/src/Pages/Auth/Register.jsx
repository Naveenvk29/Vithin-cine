import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { setCredentials } from "../../redux/features/authSlice";
import { useRegisterMutation } from "../../redux/api/userapiSlice";
import { toast } from "react-toastify";
import Loader from "../../component/Loader";
import registers from "../../assets/register.jpg";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [register, { isLoading }] = useRegisterMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const redirect = query.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const subminHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const responce = await register({ email, password });
      dispatch(setCredentials({ ...responce }));
      toast.success("Registration successful");
      navigate(redirect);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className="bg-cover h-[100vh]"
      style={{
        backgroundImage: `url(${registers})`,
      }}
    >
      <div className="pl-[10rem] flex flex-wrap">
        <div className="mr-[4rem] mt-[2rem]">
          <h1 className="text-3xl font-semibold mb-4 text-white">Sign Up</h1>
          <form onSubmit={subminHandler} className="container w-[40rem]">
            <div className="my-[2rem]">
              <label
                htmlFor="username"
                className="block text-xl font-semibold text-white"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="mt-1 p-2 w-full border border-black rounded-lg rounded-r-3xl   "
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="my-[2rem]">
              <label
                htmlFor="email"
                className="block text-xl font-semibold text-white"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 w-full border border-black rounded-lg rounded-r-3xl   "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="my-[2rem]">
              <label
                htmlFor="passsword"
                className="block text-xl font-semibold text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="passsword"
                className="mt-1 p-2 w-full border border-black rounded-lg rounded-r-3xl   "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="my-[2rem]">
              <label
                htmlFor="password"
                className="block text-xl font-semibold text-white"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 w-full border border-black rounded-lg rounded-r-3xl   "
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-green-500 text-white px-8 py-3 font-semibold rounder cursor-pointer rounded-lg my-[1rem] hover:bg-green-900"
            >
              {isLoading ? "Signing up" : "Sign up"}
            </button>
            {isLoading && <Loader />}
          </form>
          <div>
            <p className="mt-2 text-xl font-semibold text-white">
              Already have an account?{" "}
              <Link
                to={`/login${redirect ? `?redirect=${redirect}` : ""}`}
                className="text-[#00712D] text-xl font-bold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
