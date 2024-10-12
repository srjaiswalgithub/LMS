import AppError from "../utils/AppError.js";


// Middleware to check if user is admin or not
const authorizeRoles = (...roles)=> async(req,res,next)=>{
    if(! roles.includes(req.user.role)){
        return next(new AppError("You do not have permission to view this route", 403));
    }

    next();
    
}

export default authorizeRoles;