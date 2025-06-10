require("dotenv").config();
const cors = require("cors");

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("./routes");

const app = express();

const DB_CONNECTION_STRING =
  "mongodb+srv://makcim2001:ZenG7f3srZ5EVX6u@cluster0.fh4mzpp.mongodb.net/shop?retryWrites=true&w=majority";

// app.use(express.static("../frontend/dist"));

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
  .connect(DB_CONNECTION_STRING)
  .then(() => console.log("MongoDB соединение успешно"))
  .catch((err) => console.log("MongoDB error:", err));
