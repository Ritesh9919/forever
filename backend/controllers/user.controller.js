import { User } from "../models/user.model.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import generateAccessToken from "../utils/generateAccessToken.js";

// Route for user login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // checking if user exists or not
    const exists = await User.findOne({ email });
    if (!exists) {
      return res
        .status(404)
        .json({ success: false, message: "User doesn't exists" });
    }
    // checking password
    const isMatch = await bcrypt.compare(password, exists.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credential" });
    }

    const token = generateAccessToken(exists._id);
    return res
      .status(200)
      .json({ success: true, message: "User login successfully", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Router for user register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // checking user already exists or not
    const exists = await User.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Validating email format and strong password
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a strong password" });
    }

    // Hashing user password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Creating jwt token
    const token = generateAccessToken(newUser._id);
    return res
      .status(201)
      .json({ success: true, message: "User login successfully", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
// Route for admin login
export const loginAdmin = async (req, res) => {
  try {
  } catch (error) {}
};
