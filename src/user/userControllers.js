const { response } = require("express");
const { Sequelize } = require("sequelize");
const JWT = require("jsonwebtoken");
const User = require("./userModel");
// check if table users exists if not create it
User.sync({ force: false }).then(() => {
  console.log("table created");
});

// create new user and account

exports.createUsers = async (req, res) => {
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

// return all users in database
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

// get one user data from db
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

// update user may change to update account password after login

exports.updateUser = async (req, res) => {
  console.log(req.body);
  try {
    const updateObject = { [req.body.key]: req.body.value };
    console.log(updateObject);
    const user = await User.update(updateObject, {
      where: {
        name: req.body.user,
      },
    });
    if (user) {
      return res.status(500).send({
        status: "failed",
        message: "user not found",
        data: null,
      });
    }
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

// delete own user account after password check
// can also be used in an admin panel to delete users

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

// login user and return token
exports.loginUser = async (req, res) => {
  console.log(req.body);
  try {
    if (req.authUser) {
      console.log("user found");
      console.log(req.user);
      res.status(200).send({ name: req.authUser.name });
    } else {
      const user = await User.findOne({
        where: { name: req.body.name },
      });
      console.log(user);
      const token = await JWT.sign({ _id: user.id }, process.env.JWT_SECRET);
      console.log(token);
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

// raw Join query
// const rawJoin = async () => {
//   const [results, metadata] = await sequelize.query(
//     "SELECT * FROM users JOIN movies ON users.id = movies.userId"
//   );
//   console.log(results.map((value) => value.id));
// };

// creating a many to many relationship using sequelize
// const sequelizeJoin = async () => {
//   User.hasMany(Movie, { foreignKey: "userId" });
//   Movie.belongsTo(User, { foreignKey: "userId" });
//   User.belongsToMany(Movie, { through: "user_movies" });
//   const leftOuterJoin = await User.findAll({
//     include: {
//       model: Movie,
//       as: "movies",
//     },
//   });
//   console.log(JSON.stringify(leftOuterJoin, null, 2));
// };
// sequelizeJoin();

// const addMovie = async () => {
//   let userID = await User.findAll({
//     where: {
//       name: "test",
//     },
//     attributes: ["id"],
//   });
//   console.log(userID);
//   let id = userID[0].dataValues.id;
//   console.log(id);

//   let findMovies = await Movie.findAll({
//     where: {
//       userID: id,
//     },
//   });
//   console.table(findMovies.map((value) => value.dataValues));
// };

// addMovie()
