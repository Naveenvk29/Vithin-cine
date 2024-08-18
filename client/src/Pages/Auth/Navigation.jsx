import React, { useRef, useState } from "react";
import { useScroll, motion, useMotionValueEvent } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { MdOutlineLocalMovies } from "react-icons/md";
import { useLogoutMutation } from "../../redux/api/userapiSlice";
import { logout } from "../../redux/features/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Navigation = () => {
  const [ishidden, setishidden] = useState(false);
  const lastref = useRef(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const difference = y - lastref.current;
    if (Math.abs(difference) > 5) {
      setishidden(difference > 0);
      lastref.current = y;
    }
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
      toast.success("Logged Out Successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <motion.div
      animate={ishidden ? "hidden" : "visible"}
      whileHover="visible"
      onFocusCapture={() => setishidden(false)}
      variants={{
        hidden: {
          y: "90%",
        },
        visible: {
          y: "0%",
        },
        transition: { duration: 0.5 },
      }}
      className="fixed bottom-3 flex w-full justify-center "
    >
      <nav className="flex justify-between gap-3 rounded-3xl  z-50 bg-[#17153B] text-white border w-[30%] px-[4rem] border-none ">
        <div className="flex justify-center items-center mb-[2rem]">
          <Link
            to="/"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">Home</span>
          </Link>

          <Link
            to="/movies"
            className="flex items-center transition-transform transform hover:translate-x-2 ml-[1rem]"
          >
            <MdOutlineLocalMovies className="mr-2 mt-[3rem]" size={26} />
            <span className=" hidden nav-item-name mt-[3rem]">SHOP</span>
          </Link>
        </div>
        <div className="relative flex">
          <button
            onClick={toggleDropdown}
            className="text-gray-800 flex justify-center items-center focus:outline-none"
          >
            {userInfo ? (
              <span className="text-white">{userInfo.userName}</span>
            ) : (
              <></>
            )}

            {userInfo && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 ${
                  dropdownOpen ? "transform rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                />
              </svg>
            )}
          </button>

          {dropdownOpen && userInfo && (
            <ul
              className={`absolute right-0 mt-2 mr-[-10rem] w-[10rem] space-y-2 bg-white text-gray-600 ${
                !userInfo.role === "admin" ? "-top-20" : "-top-24"
              }`}
            >
              {userInfo.role === "admin" && (
                <>
                  <li>
                    <Link
                      to="/admin/movies/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                  </li>
                </>
              )}

              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}

          {!userInfo && (
            <ul className="flex  items-center">
              <li>
                <Link
                  to="/login"
                  className="flex items-center mt-8 transition-transform transform hover:translate-x-2 mb-[2rem]"
                >
                  <AiOutlineLogin className="mr-2 mt-[4px]" size={26} />
                  <span className="hidden nav-item-name">LOGIN</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="flex items-center  transition-transform transform hover:translate-x-2 ml-[1rem]"
                >
                  <AiOutlineUserAdd size={26} />
                  <span className="hidden nav-item-name">REGISTER</span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </motion.div>
  );
};

export default Navigation;
