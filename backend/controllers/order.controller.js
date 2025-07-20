import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";

// Placing order using COD method

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { items, amount, address } = req.body;

    if (!items || !amount || !address) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const orderData = {
      userId,
      items,
      amount: Number(amount),
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new Order(orderData);
    await newOrder.save();
    await User.findByIdAndUpdate(userId, { $set: { cartData: {} } });
    return res.status(201).json({ success: true, message: "Order placed" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Placing order using Stripe method
export const placeOrderStripe = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Placing order using Razorpay method
export const placeOrderRazorpay = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// All orders data for admin panel
export const allOrdersAdmin = async (req, res) => {
  try {
    const orders = await Order.find({});
    return res
      .status(200)
      .json({ success: true, orders, message: "Orders fetched" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// All Order data for frontend
export const userOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ userId });
    return res
      .status(200)
      .json({ success: true, orders, message: "User orders fetched" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// update order status for admin
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await Order.findByIdAndUpdate(orderId, { $set: { status } });
    return res.status(200).json({ success: true, message: "Status updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
