import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  getUserProfile,
  getAllUsersService
} from "../services/authService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";

export const register = asyncHandler(async (req, res) => {
  const user = await registerUser(req.body);
  successResponse(res, "User registered", user);
});

export const login = asyncHandler(async (req, res) => {
  const data = await loginUser(req.body);
  successResponse(res, "Login successful", data);
});

export const refresh = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  const accessToken = await refreshAccessToken(refreshToken);
  successResponse(res, "Token refreshed", { accessToken });
});

export const logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  await logoutUser(refreshToken);
  successResponse(res, "Logged out");
});


export const getProfile = asyncHandler(async (req, res) => {
  const user = await getUserProfile(req.user.id);

  successResponse(res, "Profile fetched successfully", user);
});
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await getAllUsersService();
  successResponse(res, "All users fetched successfully", users);
});