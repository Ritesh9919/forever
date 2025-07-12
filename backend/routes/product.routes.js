import express from "express";
const router = express.Router();
import {
  addProduct,
  listProducts,
  getProduct,
  removeProduct,
} from "../controllers/product.controller.js";
import upload from "../middleware/multer.middleware.js";
import adminAuth from "../middleware/adminAuth.middleware.js";

router.post(
  "/add",
  adminAuth,
  upload.fields([
    {
      name: "image1",
      maxCount: 1,
    },
    {
      name: "image2",
      maxCount: 1,
    },
    {
      name: "image3",
      maxCount: 1,
    },
    {
      name: "image4",
      maxCount: 1,
    },
  ]),
  addProduct
);
router.get("/single/:productId", getProduct);
router.get("/list", listProducts);
router.delete("/remove/:productId", adminAuth, removeProduct);

export default router;
