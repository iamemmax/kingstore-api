const asyncHandler = require("express-async-handler");
const userSchema = require("../model/userSchema");

exports.errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
//@access Admin

exports.protect = asyncHandler(async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401);
    throw new Error("user not authenticated");
  }
});

exports.adminAccess = asyncHandler(async (req, res, next) => {
  try {
    if (req.user.roles !== "admin") {
      res.status(401);
      throw new Error("you are not authorised admin");
    }
    next();
  } catch (error) {
    throw new Error(error.message);
  }
});
