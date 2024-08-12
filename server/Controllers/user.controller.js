import User from "../Models/user.model.js";
import asyncHandler from "../Utils/asyncHandler.js";
import createToken from "../Utils/createToken.js";

// const generateToken = async (userId) => {
//   const user = await User.findById(userId);
//   if (!user) return null;
//   const token = user.generateToken();
//   return token;
// };

const userResgister = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({ message: "Email already exists" });
  }
  const user = new User({ userName, email, password });
  try {
    await user.save();
    createToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const user = await User.findOne({ email });
  if (user) {
    const isMatch = await user.isCorrectPassword(password);
    if (isMatch) {
      createToken(res, user._id);
      return res.status(200).json({
        _id: user._id,
        userName: user.userName,
        email: user.email,
        role: user.role,
      });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } else {
    return res.status(401).json({ message: "usernot found" });
  }
});

const userLogout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out" });
});

const getallUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");
  if (!users) {
    return res.status(404).json({ message: "No users found" });
  }
  res.json(users);
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
      role: user.role,
    });
  } else {
    return res.status(404).json({ message: "User not found" });
  }
});

const updateCurrrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.userName = req.body.userName || user.userName;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      userName: updatedUser.userName,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } else {
    return res.status(404).json({ message: "User not found" });
  }
});

const forgotPassword = asyncHandler(async (req, res) => {});
const resetPassword = asyncHandler(async (req, res) => {});

export {
  userResgister,
  userLogin,
  userLogout,
  getallUsers,
  getCurrentUser,
  updateCurrrentUser,
  forgotPassword,
  resetPassword,
};
