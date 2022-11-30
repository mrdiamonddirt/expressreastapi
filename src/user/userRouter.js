const { Router } = require("express");
const {
  createUsers,
  getAllUsers,
  getUser,
  loginUser,
  updateUser,
  deleteUser,
} = require("./userControllers");
const {
  hashPassword,
  comparePassword,
  tokenCheck,
  validateEmail,
} = require("../middleware");
const userRouter = Router();

userRouter.post("/addUser", hashPassword, validateEmail, createUsers); // create user and account
userRouter.post("/loginUser", tokenCheck, comparePassword, loginUser); // token check removed
userRouter.get("/getUsers", getAllUsers); // return all users
// userRouter.get('/getUser/:id?', getUser);
userRouter.put("/updateUser", updateUser); // change password
// userRouter.get('/getUser', getUser);
userRouter.delete("/deleteUser", hashPassword, deleteUser); //delete account after password check

module.exports = userRouter;
