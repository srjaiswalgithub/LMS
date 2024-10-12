import express from 'express';
var route = express.Router();
import { contactUs,userStats } from '../controller/miscellaneous.controller.js';

import isloggedIn from '../middleware/isloggedIn.js';
import authorizeRoles from '../middleware/authorizeRoles.js';
route.route('/contact').post(contactUs);
route
  .route('/admin/stats/users')
  .get(isloggedIn, authorizeRoles('ADMIN'), userStats);

export default route;