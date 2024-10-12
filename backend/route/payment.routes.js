import { Router } from 'express';
import {
  // getRazorpayApiKey,
  buySubscription,
  // verifySubscription,
  cancelSubscription,
  allPayments,
} from '../controller/payment.controller.js';


import isloggedIn from '../middleware/isloggedIn.js';
import authorizeRoles from '../middleware/authorizeRoles.js';
import authorizeSubscribers from '../middleware/authorizeSubscribers.js';

const router = Router();

router.route('/subscribe').get(isloggedIn, buySubscription);
// router.route('/verify').post(isloggedIn, verifySubscription);
router
  .route('/unsubscribe')
  .get(isloggedIn, authorizeSubscribers, cancelSubscription);
// router.route('/razorpay-key').get(isloggedIn, getRazorpayApiKey);
router.route('/').get(isloggedIn, authorizeRoles('ADMIN'), allPayments);

export default router;