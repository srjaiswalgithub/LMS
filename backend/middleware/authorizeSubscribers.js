import AppError from "../utils/AppError.js";

// Middleware to check if user has an active subscription or not
const authorizeSubscribers = async (req, _res, next) => {
    // If user is not admin or does not have an active subscription then error else pass
    if (req.user.role !== "ADMIN" && req.user.subscription !== "active") {
      return next(new AppError("Please subscribe to access this route.", 403));
    }
  
    next();
};
export default authorizeSubscribers;