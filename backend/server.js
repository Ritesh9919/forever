import express from "express";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import "dotenv/config";

// App config
const app = express();
const PORT = process.env.PORT || 8000;
connectDB();

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
