const sharp = require("sharp");
const userSchema = require("../model/userSchema");
const passport = require("passport");
const verifySchema = require("../model/verify");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const fs = require("fs");
const sendMail = require("../config/sendEmail");
const crypto = require("crypto");
const cloudinary = require("../config/cloudinary");

exports.addUser = asyncHandler(async (req, res) => {
  let { username, email, profile, password, password2 } = req.body;

  // @desc check if user fill all filled
  if (!username || !email || !profile || !password || !password2) {
    res.status(401);
    throw new Error("Please fill all field");
  }

  // @desc check if user enter valid email
  function validateEmail(email) {
    const regex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }
  if (!validateEmail(email)) {
    res.status(401);
    throw new Error("please enter a valid email");
  }

  if (password !== password2) {
    res.status(401);
    throw new Error("password not match");
  }

  try {
    // @desc check if username already exist
    const userExist = await userSchema.findOne({ username: username });
    const emailExist = await userSchema.findOne({ email: email });
    if (userExist) {
      res.status(401);
      throw new Error("username already exist");
    }
    // @desc check if email already exist
    else if (emailExist) {
      return res.status(401).json({
        message: "email already exist",
      });
    } else {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async (err, hash) => {
          // Store hash in your password DB.

          crypto.randomBytes(48, async (err, buffer) => {
            let token = buffer.toString("hex");

            console.log(req.body);
            let newUser = await new userSchema({
              username,
              email,
              profile,
              password: hash,
            });

            const savedUser = await newUser.save();
            await new verifySchema({ userId: savedUser.id, token }).save();
            if (savedUser) {
              sendMail(
                email,
                "king-shop registration",
                `<h1>Welcome to king store</h1><p>please click on the  <a href="http://localhost:3000/api/user/verify/${savedUser.id}/${token}">Activate Account</a> below to activate your account !</p>`
              );

              return res.status(201).json({
                res: "ok",
                message: "registration successfull",
                activationMsg:
                  "An activation link has been sent to your email ",
                user: savedUser,
              });
            }
          });
        });
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error(error.message);
  }
});

// @desc verify account
exports.activateUser = asyncHandler(async (req, res) => {
  try {
    const user = await userSchema.findById({ _id: req.params.id });

    if (!user) {
      res.status(401);
      throw new Error("invalid link");
    }
    if (user.status) {
      res.status(201);
      throw new Error("email already verified");
    }

    const token = await verifySchema.findOne({
      userId: req.params.id,
      token: req.params.token,
    });
    if (!token) {
      res.status(401);
      throw new Error("invalid link");
    }

    let updateUser = await userSchema.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { status: true } },
      { new: true }
    );
    console.log(updateUser);

    if (updateUser.status === true) {
      token.remove();
      return res.status(201).json({
        message: "email verified successfull",
      });
    }
  } catch (error) {
    res.status(501);
    throw new Error(error.message);
  }
});

// @login  account
exports.loginUser = asyncHandler(async (req, res, next) => {
  let { email, password } = req.body;

  console.log(req.body);
  if (!email || !password) {
    res.status(401);
    throw new Error("Please fill all field");
  }

  // check if user enter valid email
  function validateEmail(email) {
    const regex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }
  if (!validateEmail(email)) {
    res.status(401);
    throw new Error("please enter a valid email");
  }

  passport.authenticate("local", function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        message: "Email or password not correct",
      });
    }

    req.logIn(user, function (err) {
      if (err) {
        next(err);
        res.status(401);
        throw new Error("Email or password not correct");
      }

      return res.status(201).json({
        message: `logged in ${req.user.username}`,
        isAuthenticated: true,
        res: "ok",
        user: req.user,
      });
    });
  })(req, res, next);
});

//@desc logout user
//@access public
//@route http://localhost:5000/api/user/logout
exports.logoutUser = (req, res) => {
  req.logOut();
  req.session.destroy(() => {
    res.clearCookie("connect.sid", {
      path: "/",
      httpOnly: true,
    });
    res.status(201).json({
      message: "you successfully logout",
    });
  });
};

// @desc edit user info by user by id
//@access private
//@route http://localhost:5000/api/user/:id

exports.updateReguser = asyncHandler(async (req, res) => {
  const user = await userSchema.findById(req.params.id);
  let { address, city, state, country, posterCode, phone, profile } = req.body;

  if (profile) {
    await cloudinary.uploader.destroy(user.profile[0].img_id);
  }
  const update = await userSchema.findByIdAndUpdate(
    { _id: user.id },
    {
      $set: {
        address: address || user.address,
        city: city || user.city,
        state: state || user.state,
        country: country || user.country,
        posterCode: posterCode || user.posterCode,
        phone: phone || user.phone,
        profile: profile || user.profile,
      },
    },
    { new: true }
  );

  try {
    if (update) {
      res.status(200).json({
        user: update,
      });
    } else {
      res.status(401);
      throw new Error("error in updating");
    }
  } catch (error) {
    res.status(401);
    throw new Error(error.message);
  }
});
//@desc change password
//@access private
//@route http://localhost:5000/api/user/password/:id
exports.ChangePassword = asyncHandler(async (req, res) => {
  let { oldpassword, password1 } = req.body;

  const user = await userSchema.findOne({ _id: req.params.id });
  if (user) {
    try {
      bcrypt.compare(oldpassword, user.password, (err, isMatch) => {
        if (!isMatch) {
          res.send("old password not matched");
        }
        if (isMatch) {
          bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password1, salt, async (errr, hash) => {
              if (user.password === hash) {
                res.send("error");
                return;
              }
              let update = await userSchema.findOneAndUpdate(
                { _id: req.params.id },
                { $set: { password: hash || user.password } },
                { new: true }
              );
              if (!update) {
                // res.send("unable to update pass");
                res.status(401).json({
                  message: "unable to update  password ",
                });
              } else {
                res.status(201).json({
                  user,
                });
              }
            });
          });
        }
      });
    } catch (error) {
      res.status(501);
      throw new Error(error.message);
    }
  } else {
    res.status(401);
    throw new Error("user not found");
  }
});

//@desc get user by id
//@access private
//@route http://localhost:5000/api/user/:id
exports.getUser = asyncHandler(async (req, res) => {
  try {
    const user = await userSchema.findById(req.params.id);
    if (!user) {
      res.status(401);
      throw new Error("user not found");
    } else {
      return res.status(201).json({
        user: req.user,
      });
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Admin zone
//@desc get all registered user
//@access admin
//@route http://localhost:5000/api/user/allUsers
exports.getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await userSchema.find();
    if (!users) {
      res.status(401);
      throw new Error("user not found");
    }

    if (users?.length > 0) {
      return res.status(201).json({ users });
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//@desc delete user by id
//@access private
//@route http://localhost:5000/api/user/delete/:id
exports.deleteUser = asyncHandler(async (req, res) => {
  try {
    let regUser = await userSchema.findOne({ _id: req.params.id });

    const user = await userSchema.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(401);
      throw new Error("user not found");
    } else {
      await cloudinary.uploader.destroy(regUser.profile[0].img_id);
      return res.status(201).json({
        user: req.user,
      });
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});
