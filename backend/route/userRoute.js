import express from 'express';
var route = express.Router();
import {registerUser,loginUser,logoutUser,getLoggedInUserDetails,forgotPassword,resetPassword,changePassword,updateUser} from '../controller/user.controller.js';
import isloggedIn from '../middleware/isloggedIn.js';
import upload from '../middleware/multer.middleware.js';
route.post('/register',upload.single("avatar"),registerUser);
route.post('/login',loginUser);
route.post('/logout',logoutUser);
route.get('/me',isloggedIn,getLoggedInUserDetails);
route.post('/reset',forgotPassword);
route.post('/reset-password/:resetToken',resetPassword);
route.post('/change-password',isloggedIn,changePassword);
route.put('/update/:id',isloggedIn,upload.single("avatar"),updateUser);



export default route;