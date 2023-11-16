
import express from "express";
import { app } from "./app.js";
import mysql from "mysql";
import cors from "cors";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import Joi from "joi";
import jwt from "jsonwebtoken";
import Razorpay from "razorpay";
import { connectDB } from "./config/database.js";
import { config } from "dotenv";

config({ path: "./config.env" });

const saltRounds = 10; // Define the number of salt rounds

connectDB(); // Connect to the database

// CORS setup
app.use(
  cors({
    origin: `${process.env.PORT2}`,
    methods: ["GET, POST, PUT, DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use("/signup", signupRoutes);
// app.use("/api/signin", signinRoutes);

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "e-commerce",
});

// Insert data into MySQL
const insertPayment = (paymentData) => {
  const sql = 'INSERT INTO payments SET ?';

  db.query(sql, paymentData, (err, result) => {
    if (err) throw err;
    console.log('Payment inserted:', result);
  });
};

// Example usage
const paymentData = {
  razorpay_order_id: 'order123',
  razorpay_payment_id: 'payment123',
  razorpay_signature: 'signature123',
};

insertPayment(paymentData);


export { app};

// Server running:
app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
