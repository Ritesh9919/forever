import { User } from "../models/user.model.js";

// add product to user cart

export const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    const user = await User.findById(userId);
    const cartData = user.cartData;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await User.findByIdAndUpdate(userId, {
      $set: { cartData },
    });

    return res.status(200).json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// get user cart
export const getUserCart = async (req, res) => {
  try {
  } catch (error) {}
};

// update user cart
export const updateCart = async (req, res) => {
  try {
  } catch (error) {}
};
