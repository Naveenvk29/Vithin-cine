import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserProfileMutation } from "../../redux/api/userapiSlice";
import { setCredentials } from "../../redux/features/authSlice";
import { toast } from "react-toastify";
import Loader from "../../component/Loader";

const Profile = () => {
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateUserProfile, { isloading }] = useUpdateUserProfileMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    setuserName(userInfo.userName);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.userName]);

  const handlerSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("passwords do not match");
    } else {
      try {
        const res = await updateUserProfile({
          _id: userInfo._id,
          userName,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div>
      <div className="container mx-auto p-4 mt-[2rem]">
        <div className="flex justify-center align-center md:flex md:space-x-4">
          <div className="md:w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>

            <form onSubmit={handlerSubmit}>
              <div className="mb-4">
                <label className="block text-black mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  className="form-input p-4 rounded-sm w-full"
                  value={userName}
                  onChange={(e) => setuserName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-white mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  className="form-input p-4 rounded-sm w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-white mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="form-input p-4 rounded-sm w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-white mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="form-input p-4 rounded-sm w-full"
                  value={confirmPassword}
                  onChange={(e) => setconfirmPassword(e.target.value)}
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-teal-500 w-screen mt-[2rem] font-bold text-white py-2 px-4 rounded hover:bg-teal-600"
                >
                  Update
                </button>

                {isloading && <Loader />}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
