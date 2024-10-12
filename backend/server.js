import express from 'express';
import app from './app.js';
import {config} from 'dotenv';
config();
import { v2 } from 'cloudinary';
// import Razorpay from 'razorpay';
import connectionDB from './config/connection.js';
// Cloudinary configuration
v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Razorpay configuration
// export const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_SECRET,
// });


app.listen(process.env.PORT,async()=>{
    await connectionDB();
    console.log(`server is running at http://localhost:${process.env.PORT}`);
})