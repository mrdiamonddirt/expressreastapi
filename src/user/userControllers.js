const { response } = require("express");
const { Sequelize } = require("sequelize");
const JWT = require("jsonwebtoken");
const User = require("./userModel");
// check if table users exists if not create it
User.sync({ force: false }).then(() => {
  console.log("table created");
});

// create new user
exports.createUsers = async (req, res) => {
  let statuscode = 201;
  let body;
  try {
    const newUser = await User.create(req.body);
    const token = await JWT.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(201).send({
      user: newUser,
      token: token,
    });
  } catch (err) {
    return response.status(500).send({
      status: "fail",
      message: err.message,
    });
  }
};

// return all users
exports.getAllUsers = async (req, res) => {
  console.log(req.body);
  try {
    const users = await User.findAll();
    return res.status(200).send({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    return res.status(404).send({
      status: "fail",
      message: err,
    });
  }
};

// get one user
exports.getUser = async (req, res) => {
  console.log(req.params);
  try {
    const user = await User.findByPk(req.params.id);
    return res.status(200).send({
      status: "success",
      data: user,
    });
  } catch (err) {
    return res.status(404).send({
      status: "fail",
      message: err,
    });
  }
};

// update user
exports.updateUser = async (req, res) => {
  console.log(req.params);
  try {
    const user = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).send({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    return res.status(404).send({
      status: "fail",
      message: err,
    });
  }
};

// delete user
exports.deleteUser = async (req, res) => {
  console.log(req.params);
  try {
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).send({
      status: "success",
      data: {
        user: "user deleted",
      },
    });
  } catch (err) {
    return res.status(404).send({
      status: "fail",
      message: err,
    });
  }
};

// login user
exports.loginUser = async (req, res) => {
    console.log(req.body);
  try {
    if (req.user) {
        console.log("user found");
        console.log(req.user)
        res.status(200).send({ name: req.user.name });
      } 
      else{ 
        const user = await User.findOne({ 
            where:
            {name: req.body.name} 
        });
        console.log(user);
        const token = await JWT.sign({ _id: user.id }, process.env.JWT_SECRET);
        res.status(200).send({ user: user.name, token: token });
      }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "fail",
      message: err,
    });
  }
};
