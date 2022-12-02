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

// can i add token check to get all users update user and delete user to see if user is logged in?

userRouter.post("/addUser", hashPassword, validateEmail, createUsers); // create user and account
userRouter.post("/loginUser", tokenCheck, comparePassword, loginUser); // token check removed
userRouter.get("/getUsers", getAllUsers); // return all users
// userRouter.get('/getUser/:id?', getUser);
userRouter.put("/updateUser", updateUser); // change password
// userRouter.get('/getUser', getUser);
userRouter.delete("/deleteUser", deleteUser); //delete account after password check maybe add token check or password check

module.exports = userRouter;
