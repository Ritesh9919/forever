import express from "express";
const router = express.Router();
import {
  registerUser,
  loginAdmin,
  loginUser,
} from "../controllers/user.controller.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/admin", loginAdmin);

export default router;
