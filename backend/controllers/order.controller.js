import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
import Stripe from "stripe";
const currency = "inr";
const deliveryCharge = 10;

// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
    const userId = req.user._id;
    const { items, amount, address } = req.body;
    console.log(amount, address);
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      amount: amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      mode: "payment",
      line_items,
    });

    return res.status(201).json({ success: true, session_url: session.url });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// verify stripe

export const verifyStripe = async (req, res) => {
  try {
    const userId = req.user._id;
    const { orderId, success } = req.body;

    if (success === "true") {
      console.log("inside success");
      await Order.findByIdAndUpdate(orderId, { $set: { payment: true } });
      await User.findByIdAndUpdate(userId, { $set: { cartData: {} } });

      return res.json({ success: true });
    } else {
      await Order.findByIdAndDelete(orderId);
      return res.json({ success: false });
    }
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
