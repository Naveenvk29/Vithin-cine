import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpires: String,
  },

  {
    timestamps: true,
  }
);

// Hash the password before saving it to the database

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  } else {
    return null;
  }

  next();
});
// comparing the password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate a JWT token

// userSchema.methods.generateAuthToken = function (res) {
//   return jwt.sign(
//     { id: this._id, userName: this.userName },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: "3d",
//     }
//   );
// };

// Generate a reset password token

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash the token
  this.resetPasswordToken = crypto
    .createHash("Sha256")
    .update(resetToken)
    .digest("hex");
  // Set the expiration date
  this.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken;
};
const User = mongoose.model("User", userSchema);

export default User;
