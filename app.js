// app.js

import express from "express";
import cors from "cors";
import paymentRoutes from "./routes/paymentRoutes.js";
import signupRoutes from "./routes/signupRoutes.js";
import signinRoutes from "./routes/signinRoutes.js";

export const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", paymentRoutes);
app.use("/accountsignup", signupRoutes);
app.use("/api/signin", signinRoutes);

app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);
