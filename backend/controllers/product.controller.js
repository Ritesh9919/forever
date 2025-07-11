import { Product } from "../models/product.model.js";
import { v2 as cloudinary } from "cloudinary";

// function for add product
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      size,
      bestSeller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];
    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    const imageUrls = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      bestSeller: bestSeller === "true" ? true : false,
      size: JSON.parse(size),
      image: imageUrls,
      date: Date.now(),
    };

    await Product.create(productData);
    res.status(201).json({ success: true, message: "Product added" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// function for list products
export const listProducts = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// function for get single product info
export const getProduct = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// function for remove a product
export const removeProduct = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
