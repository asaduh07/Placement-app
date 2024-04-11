import express from 'express';
import UserController from './user.controller.js';
import jwtAuth from '../../middleware/jwtAuth.middleware.js';

const userController=new UserController();
const userRouter= express.Router();

userRouter.route('/signup').post((req,res,next)=>{
    userController.signUp(req,res,next)
});
userRouter.route('/signin').post((req,res,next)=>{
    userController.signIn(req,res,next)});
userRouter.route('/download-csv').get(jwtAuth,(req,res,next)=>{
    userController.downloadCSV(req,res,next)});
userRouter.route('/logout').get((req,res,next)=>{
    userController.logout(req,res,next)});

export default userRouter;