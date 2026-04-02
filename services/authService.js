import User from "../models/userModel.js";
import Token from "../models/tokenModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";
import {
  generateAccessToken,
  generateRefreshToken
} from "../utils/token.js";

export const registerUser = async (data) => {
  const { name, email, password, role } = data;

  const allowedRoles = ["viewer", "analyst", "admin"];

  if (role && !allowedRoles.includes(role)) {
    throw new ApiError(400, "Invalid role");
  }

  const existing = await User.findOne({ email });
  if (existing) throw new ApiError(400, "Email already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "viewer"
  });

  return user;
};

export const loginUser = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(400, "Invalid credentials");

  if (user.status !== "active") {
    throw new ApiError(403, "User is inactive");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ApiError(400, "Invalid credentials");

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await Token.create({
    userId: user._id,
    token: refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  });

  return { user, accessToken, refreshToken };
};

export const refreshAccessToken = async (token) => {
  if (!token) {
    throw new ApiError(400, "Refresh token is required");
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    throw new ApiError(401, "Invalid refresh token");
  }

  const stored = await Token.findOne({ token });
  if (!stored) throw new ApiError(401, "Invalid refresh token");

  const user = await User.findById(decoded.id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const newAccessToken = generateAccessToken(user);

  return newAccessToken;
};

export const logoutUser = async (token) => {
  await Token.deleteOne({ token });
};

export const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

export const getAllUsersService = async () => {
  const users = await User.find().sort({ createdAt: -1 });
  return users;
};