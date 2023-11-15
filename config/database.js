// database.js

import mysql from "mysql";
import Razorpay from "razorpay";

export const connectDB = () => {
  const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_APT_SECRET,
  });

  db.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return;
    }
    console.log("Connected to MySQL");
  });

  global.db = db; // Make the MySQL connection globally accessible
  global.instance = instance; // Make the Razorpay instance globally accessible
};













// import mongoose from "mongoose";

// export const connectDB = async () => {
//   const { connection } = await mongoose.connect(process.env.MONGO_URI);
//   console.log(`Mongodb is connected with ${connection.host}`);
// };