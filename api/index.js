require("dotenv").config();
const express = require("express");
const connectDB = require("../config/db");
const authRoutes = require("../routes/authRoutes");
const fileRoutes = require("../routes/fileRoutes");

const app = express();
app.use(express.json());
app.use(require("cors")());

connectDB();

app.get("/", (req, res) => {
  res.send("StudyAI Backend is running!");
});

app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);

module.exports = app;
