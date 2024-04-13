const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const userRoutes = require("./Routes/userRoutes.js");

dotenv.config();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    res.status(200).json(req);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.use("/api/users", userRoutes);
app.get("/verify-ip", async (req, res) => {
  try {
    res.status(200).json(req);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL1);

    console.log("Connected to MongoDB");

    app.listen(process.env.PORT, () => {
      console.log("Server is Listening");
    });
  } catch (error) {
    console.log({
      msg: "Unable to Connect to the Database",
      error: error.message,
    });
    console.log(error);
  }
};

connectDB();
