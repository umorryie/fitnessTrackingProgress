const express = require('express');
const userRouter = express.Router();
const {getUser, postUser} = require('../controller/UserController');

userRouter.get('/user/:userEmail', getUser);
userRouter.post('/user', postUser);

module.exports = {
    userRouter
}
