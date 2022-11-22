const {Router} = require('express');
const {createUsers, getAllUsers, getUser} = require('./userControllers');
const userRouter = Router();


userRouter.post('/adduser', createUsers);
userRouter.get('/getusers', getAllUsers);
userRouter.get('/getuser/:id', getUser);
userRouter.get('/getuser', getUser);
userRouter.delete('/deleteuser/:id', getUser);

module.exports = userRouter;