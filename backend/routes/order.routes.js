import express from "express";
const router = express.Router();
import {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  updateOrderStatus,
  userOrders,
  allOrdersAdmin,
  verifyStripe,
} from "../controllers/order.controller.js";
import userAuth from "../middleware/userAuth.middleware.js";
import adminAuth from "../middleware/adminAuth.middleware.js";

// Admin features
router.get("/lists", adminAuth, allOrdersAdmin);
router.post("/status", adminAuth, updateOrderStatus);

// Payment features
router.post("/place", userAuth, placeOrder);
router.post("/stripe", userAuth, placeOrderStripe);
router.post("/razorpay", userAuth, placeOrderRazorpay);

// User features
router.get("/userOrders", userAuth, userOrders);

// verify stripe
router.post("/verifyStripe", userAuth, verifyStripe);

export default router;
