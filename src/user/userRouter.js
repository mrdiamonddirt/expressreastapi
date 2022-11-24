const {Router} = require('express');
const {createUsers, getAllUsers, getUser, loginUser, updateUser, deleteUser} = require('./userControllers');
const {hashPassword, comparePassword, tokenCheck, validateEmail} = require('../middleware');
const userRouter = Router();

userRouter.post('/addUser', hashPassword, validateEmail, createUsers);
userRouter.post('/loginUser', comparePassword, tokenCheck, loginUser);
userRouter.get('/getUsers', getAllUsers);
userRouter.get('/getUser/:id?', getUser);
userRouter.put('/updateUser/:id', hashPassword, validateEmail, updateUser);
// userRouter.get('/getUser', getUser);
userRouter.delete('/deleteUser/:id', deleteUser);

module.exports = userRouter;