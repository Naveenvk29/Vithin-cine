import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setCredentials } from "../../redux/features/authSlice";
import { useUpdateUserProfileMutation } from "../../redux/api/userapiSlice";
import { toast } from "react-toastify";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth.user);

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updateUserProfile, { loading }] = useUpdateUserProfileMutation();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateUserProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return <div>Profile</div>;
};

export default Profile;
