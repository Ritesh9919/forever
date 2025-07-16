import express from "express";
const router = express.Router();
import {
  addToCart,
  updateCart,
  getUserCart,
} from "../controllers/cart.controller.js";
import userAuth from "../middleware/userAuth.middleware.js";

router.get("/get", userAuth, getUserCart);
router.put("/update", userAuth, updateCart);
router.post("/add", userAuth, addToCart);
export default router;
