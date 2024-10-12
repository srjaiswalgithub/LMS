import jwt from "jsonwebtoken";
import {config} from 'dotenv';
config();
import AppError from "../utils/AppError.js";

const isloggedIn = async(req,res,next)=>{
    const {token} = req.cookies;

    if(!token){
        return next(new AppError("Unauthorized, please login to continue", 401))
    }

    const decoded = await jwt.verify(token,process.env.JWT_SECRET);
    if (!decoded) {
        return next(new AppError("Unauthorized, please login to continue", 401));
    }
    req.user = decoded;
    next();
};
export default isloggedIn;