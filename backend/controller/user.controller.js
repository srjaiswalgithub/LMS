import bcrypt from 'bcrypt';
import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import cloudinary from 'cloudinary';
import jwt from 'jsonwebtoken';
import {config} from 'dotenv';
config();
import User from '../model/usermodel.js';
import AppError from '../utils/AppError.js';
import sendMail from '../utils/sendMail.js';


const cookieOptions = {
    maxAge:24*60*60*1000,//1 days
    httpOnly:true,
    secure: process.env.NODE_ENV === 'production' ? true : false,

};

//user  register ...
const registerUser = async(req,res,next)=>{
    const {fullname,email,password} = req.body;
    if(!fullname || !email || !password){
        return next(new AppError('All fields are required', 400));
    }
    const userExist = await User.findOne({email});
    if(userExist){
        return next(new AppError('you already exist!!',409));
    }

    const user = await User.create({
        fullname,
        email,
        password,
        avatar:{
            public_id:email,
            secure_url:'https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg',
        }
    });
    if(!user)return next(new AppError('user registration failed!!',400));

   // Run only if user sends a file

    if(req.file){

        try{
            const result = await cloudinary.v2.uploader.upload(req.file.path,{
                folder:'lms',
                width:250,
                height:250,
                gravity:'faces',
                crop:'fill'
            });

            //if success
            if(result){
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url;
                // After successful upload remove the file from local storage
                fs.rm(`uploads/${req.file.filename}`);
            }
            
        }

        catch(err){
            return next(
                new AppError(err || 'File not uploaded, please try again',400)
            );
        }
        

    };

    // Save the user object
    await user.save();

    const token = await user.jwtToken();

    

    user.password = undefined,

    res.cookie('token',token,cookieOptions);

    res.status(200).json({
        success:true,
        mgs:"User registered successfully",
        user
    });




};


//user login...
const loginUser = async(req,res,next)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return next(new AppError('all fields are required',404));
    }
    const  data = await User.findOne({email}).select('+password');
    if(!(data &&  await data.comparePassword(password))){
        return next(new AppError('email or password not matched or user does not exist',404));
    }
    data.password = undefined;
    const token = await data.jwtToken();

    res.cookie('token',token,cookieOptions);

    res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        data,
    });



};

//user logout....
const logoutUser = async(req,res,next) =>{
    //set the cookie value to null...
    res.cookie('token',null,{
        httpOnly:true,
        maxAge:0,
        secure: process.env.NODE_ENV === 'production' ? true : false
    })

    

    res.status(200).json({
        success: true,
        message: 'User logged out successfully',
    });
};

//getLoggedInUserDetails...

const getLoggedInUserDetails = async(req,res,next)=>{
    const { id } = req.user;
    const userData = await User.findById(id);
    
    res.status(200).json({
        success: true,
        message: 'User details',
        userData
        
    });
    
};

const forgotPassword = async(req,res,next)=>{
    // Extracting email from request body
    const {email} = req.body;
     // If no email send email required message
    if(!email){
        return next(new AppError('please provide email!!',400));
    }
    // Finding the user via email
    const user = await User.findOne({email});
    // If no email found send the message email not found
    if(!user){

        return next(new AppError('email is not registered!!',400));
    }
    // Generating the reset token via the method we have in user model
    const resetToken = await user.generatePasswordResetToken();
    // Saving the forgotPassword* to DB
    await user.save();

    // constructing a url to send the correct data
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
     // We here need to send an email to the user with the token
    const subject = 'Reset Password';
    const message =   `You can reset your password by clicking <a href=${resetPasswordUrl} target="_blank">Reset your password</a>\nIf the above link does not work for some reason then copy paste this link in new tab ${resetPasswordUrl}.\n If you have not requested this, kindly ignore.`;

    try{
        await sendMail(email,subject,message);
        // If email sent successfully send the success response
        res.status(200).json({
            success: true,
            message: `Reset password token has been sent to ${email} successfully`,
        });
    }
    catch(error){
        // If some error happened we need to clear the forgotPassword* fields in our DB
        user.forgotpasswordToken = undefined;
        user.forgotpasswordExpiry = undefined;
        await user.save();
        return next(new AppError(error.message || 'Something went wrong, please try again.',500));
    }
    


};

//reset password

const resetPassword = async(req,res,next)=>{
    // Extracting resetToken from req.params object
    const {resetToken} = req.params;
    // Extracting password from req.body object
    const {password} = req.body;
    // Check if password is not there then send response saying password is required
    if(!password){
        return next(new AppError('Password is required', 400));
    }

    // We are again hashing the resetToken using sha256 since we have stored our resetToken in DB using the same algorithm


    const forgotpasswordToken = await crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
    // Checking if token matches in DB and if it is still valid(Not expired)
    const user = await User.findOne({forgotpasswordToken,forgotpasswordExpiry:{$gt:Date.now()}});
    // If not found or expired send the response
    if(!user){
        return next(new AppError('Token is invalid or expired, please try again', 400));
    }
    

    // Update the password if token is valid and not expired

    user.password = password;
     // making forgotPassword* valus undefined in the DB
    user.forgotpasswordToken = undefined;
    user.forgotpasswordExpiry = undefined;
    // Saving the updated user values
    await user.save();

    // Sending the response when everything goes good
    res.status(200).json({
        success: true,
        message: 'Password changed successfully',
    });
};

//change password

const changePassword = async(req,res,next)=>{
    // Destructuring the necessary data from the req object
    const { oldPassword, newPassword } = req.body;
    const { id } = req.user; // because of the middleware isLoggedIn

     // Check if the values are there or not
    if(!oldPassword || !newPassword){
        return next(new AppError('Old password and new password are required', 400));
    }

    // Finding the user by ID and selecting the password
    const user = await User.findById(id).select('+password');
     // If no user then throw an error message
    if(!user){
        return next(new AppError('Invalid user id or user does not exist', 400));
    }
    // Check if the old password is correct
    const isPasswordValid = await user.comparePassword(oldPassword);

     // If the old password is not valid then throw an error message
    if(!isPasswordValid){
    return next(new AppError('Invalid old password', 400));
    }
    // Setting the new password
    user.password = newPassword;

    user.save();
    // Setting the password undefined so that it won't get sent in the response
    // user.password = undefined;

    res.status(200).json({
        success: true,
        message: 'Password changed successfully',
    });
};

//user update

const updateUser = async(req,res,next)=>{
    // Destructuring the necessary data from the req object
    const {fullname} = req.body;
    const {id} = req.params;

    const user = await User.findById(id);
    if(!user){
        return next(new AppError('Invalid user id or user does not exist'));
    }

    if (fullname) {
        user.fullname = fullname;
    }

     // Run only if user sends a file
    if(req.file){
        
            // Deletes the old image uploaded by the user
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
        
    

        try{
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'lms', // Save files in a folder named lms
                width: 250,
                height: 250,
                gravity: 'faces', // This option tells cloudinary to center the image around detected faces (if any) after cropping or resizing the original image
                crop: 'fill',
            });

            // If success
            if(result){
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url;
                // After successful upload remove the file from local storage
                fs.rm(`uploads/${req.file.filename}`)
            }
            
        }

        catch(error){
            return next(new AppError(error || 'File not uploaded, please try again', 400));
        }

    }

    // Save the user object
    await user.save();

    res.status(200).json({
        success: true,
        message: 'User details updated successfully',
        user
    });




};

export {registerUser,loginUser,logoutUser,getLoggedInUserDetails,forgotPassword,resetPassword,changePassword,updateUser};