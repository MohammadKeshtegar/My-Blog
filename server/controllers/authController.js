import { promisify } from "util";
import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import Email from "../utils/email.js";

const signToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createToken = (user, statusCode, res) => {
  const token = signToken(user._id, user.role);
  const cookieOptions = {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("access_token", token, cookieOptions);

  // Removing password from the output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: user,
  });
};

export const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    photo: req.body.photo,
    role: req.body.role,
    active: req.body.active,
  });

  createToken(newUser, 201, res);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) return next(new AppError("Please provide email or password", 400));

  const user = await User.findOne({ email }).select("+password").select("+role");

  if (!user || !(await user.correctPassword(password, user.password))) return next(new AppError("Incorrect email or password", 400));

  createToken(user, 200, res);
});

export const logout = catchAsync(async (req, res, next) => {
  res.clearCookie("access_token").status(200).json({ status: "success" });
});

export const protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.access_token) {
    token = req.cookies.access_token;
  }

  if (!token) return next(new AppError("You are not logged in! Please login to get access", 401));

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id).select("+role");

  if (!currentUser) return next(new AppError("The user belong to this token does not longer exists", 401));

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError("User recently changed password! Please login again", 401));
  }

  req.user = currentUser;
  next();
});

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) return next(new AppError("You do not have this permission to perform this action", 403));

    next();
  };
};

export const forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return next(new AppError("There is no user with this email address", 404));

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.hostname}/v1/users/resetPassword/${resetToken}`;
  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to ${resetURL}.\nIf your didn't forget your password, please ignore this email`;

  try {
    const url = `${req.protocol}://${req.hostname}/api/v1/users/resetPassword/${resetToken}`;
    const resetPageUrl = `${req.protocol}://${req.hostname}:${req.body.port}/reset-password/${resetToken}`;
    await new Email(user, url, resetPageUrl).sendPasswordReset();

    res.status(200).json({
      status: "success",
      messgae: "Token sent to email",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    console.log(err);
    return next(new AppError("There was an error while sending the email. Try again later", 500));
  }
});

export const resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) return next(new AppError("Token is invalid or ha expired", 400));

  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  createToken(user, 200, res);
});

export const changePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) return next(new AppError("Your current password is wrong!", 401));

  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  await user.save();

  createToken(user, 200, res);
});
