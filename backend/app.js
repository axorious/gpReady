require("dotenv").config();
const cors = require("cors");

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("./routes");

const app = express();

app.use(express.static("../frontend/dist"));

app.use(
  cors({
    origin: ["https://gp-ready-q4fu.vercel.app/", "http://localhost:5173"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api", routes);

mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// экпорт для Vercel
module.exports = app;
