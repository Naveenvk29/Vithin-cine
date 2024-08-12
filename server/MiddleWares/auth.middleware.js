import User from "../Models/user.model.js";
import asyncHandler from "../Utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const authenticated = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  } else {
    res.status(401).json({ message: "You are not logged in" });
  }
});

const authorrizedAsAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "You are not authorized to access this route" });
  }
};

export { authenticated, authorrizedAsAdmin };
