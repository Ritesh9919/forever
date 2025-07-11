import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

// App config
const app = express();
const PORT = process.env.PORT || 8000;
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// api endpoint

app.get("/", (req, res) => {
  res.send("Api working");
});

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
