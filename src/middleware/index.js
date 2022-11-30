const bcrypt = require("bcryptjs");
const User = require("../user/userModel");
const jwt = require("jsonwebtoken");
const validator = require("email-validator");

// hash password
exports.hashPassword = async (req, res, next) => {
  console.log(req.body);
  try {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    console.log("hashing complete");
  } catch (err) {
    res.status(500).send("Error hashing password");
  }
  next();
};

// compare password

exports.comparePassword = async (req, res, next) => {
  try {
    if (req.authUser) {
      next();
    } else {
      req.user = await User.findOne({
        where: { email: req.body.email },
      });
      if (
        req.user &&
        (await bcrypt.compare(req.body.password, req.user.password))
      ) {
        console.log("username and password match");
        next();
      } else {
        throw new Error("Invalid username or password");
      }
    }
  } catch (err) {
    res.status(500).send({
      status: "fail",
      message: err,
    });
  }
};

// token check including creation of token and verification of token

exports.tokenCheck = async (req, res, next) => {
  try {
    if (req.header("Authorization")) {
      const token = req.header("Authorization").replace("Bearer ", "");
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      const user = await User.findByPk(decoded._id);
      req.authUser = user;
      console.log("Token Verified");
      console.log(user);
    } else {
      console.log("No token found");
    }
    next();
  } catch (err) {
    res.status(500).send({
      status: "fail",
      message: err,
    });
  }
};

// validate email

exports.validateEmail = async (req, res, next) => {
  if (!validator.validate(req.body.email)) {
    return res.status(400).send({
      status: "fail",
      message: "Please enter a valid email",
    });
  }
  console.log("email is valid");
  return next();
};
