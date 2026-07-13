const User = require("../models/user.model");
const ApiError = require("../utils/apiError");
const asyncHandler = require("../utils/asyncHandler");
const { setAuthCookie, clearAuthCookie } = require("../utils/cookies");
const { signToken } = require("../utils/tokens");

const sendAuthResponse = (res, statusCode, user, message) => {
  const token = signToken(user._id);
  setAuthCookie(res, token);

  res.status(statusCode).json({
    success: true,
    message,
    user
  });
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.validated.body;

  const existingUser = await User.findOne({
    $or: [{ username }, { email }]
  });

  if (existingUser) {
    throw new ApiError(409, "Username or email already in use");
  }

  const user = await User.create({ username, email, password });

  sendAuthResponse(res, 201, user, "User registered successfully");
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.validated.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  sendAuthResponse(res, 200, user, "Logged in successfully");
});

const logoutUser = asyncHandler(async (req, res) => {
  clearAuthCookie(res);

  res.status(200).json({
    success: true,
    message: "Logged out successfully"
  });
});

const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser
};
