import express from "express";
import {
  userLogin,
  userResgister,
  userLogout,
  getallUsers,
  getCurrentUser,
  updateCurrrentUser,
  forgotPassword,
  resetPassword,
} from "../Controllers/user.controller.js";
import {
  authenticated,
  authorrizedAsAdmin,
} from "../MiddleWares/auth.middleware.js";

const router = express.Router();

// Create a new user

router
  .route("/")
  .post(userResgister)
  .get(authenticated, authorrizedAsAdmin, getallUsers);

// Login existing user

router.post("/login", userLogin);

// Logout current user

router.post("/logout", userLogout);

// Get current user

router
  .route("/profile")
  .get(authenticated, getCurrentUser)
  .put(authenticated, updateCurrrentUser);
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword/:token", resetPassword);

export default router;
