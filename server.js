
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
// import signupRoutes from "./routes/signupRoutes.js";
// import signinRoutes from "./routes/signinRoutes.js";
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














// import express from "express";
// import { app } from "./app.js";
// import mysql from "mysql";
// import cors from "cors";
// import bcrypt from "bcrypt";
// import cookieParser from "cookie-parser";
// import Joi from "joi";
// import jwt from "jsonwebtoken";
// import Razorpay from "razorpay";
// import { connectDB } from "./config/database.js";
// import { config } from "dotenv";
// config({ path: "./config/config.env" });

// const saltRounds = 10; // Define the number of salt rounds

// connectDB(); // Connect to the database



// // Server running:
// app.listen(process.env.PORT, () => {
//   console.log(`Server is running on ${process.env.PORT}`);
// });


// // CORS setup
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET, POST, PUT, DELETE"],
//     credentials: true,
//   })
// );

// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// app.post("/SignUpForm", (req, res) => {
//   const sql = "INSERT INTO user (`name`, `email`, `password`) VALUES(?) ";

//   // Generate a salt and hash the password
//   bcrypt.hash(req.body.password.toString(), saltRounds, (err, hash) => {
//     if (err) {
//       console.error("Error for hashing password:", err);
//       return res.status(500).json({ Error: "Error for hashing password" });
//     }
//     const values = [req.body.name, req.body.email, hash];
//     db.query(sql, [values], (err, result) => {
//       if (err) {
//         console.error("Inserting data error in server:", err);
//         return res.status(500).json({ Error: "Inserting data error in server" });
//       }
//       return res.json({ Status: "Success" });
//     });
//   });
// });


// // Login:
// app.post("/SignInForm", async (req, res) => {
//   var login_email_pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//   var login_password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@]{4,}$/;

//   const schema = Joi.object().keys({
//     email: Joi.string().regex(login_email_pattern).required(),
//     password: Joi.string().regex(login_password_pattern).required(),
//   }); //.unknown(true);

//   const { error } = schema.validate(req.body, { abortEarly: false });
//   if (error) {
//     console.log(error);
//     return res.json({ error: error.details[0].message });
//   } else {
//     try {
//       const sql = "SELECT * FROM user WHERE email=?";

//       db.query(sql, [req.body.email], (err, data) => {
//         if (err) {
//           return res.json({ Error: "Login error in server" });
//         }

//         if (data.length > 0) {
//           bcrypt.compare(
//             req.body.password.toString(),
//             data[0].password,
//             (err, response) => {
//               if (err) {
//                 console.error("Password compare error:", err);
//                 return res.json({ error: "Password compare error" });
//               }
//               if (response) {
//                 const name = data[0].name;
//                 const token = jwt.sign({ name }, "jwt-secret-key", {
//                   expiresIn: "1d",
//                 });
//                 res.cookie("token", token);
//                 return res.json({ Status: "Success" });
//               } else {
//                 console.error("Password not matched");
//                 return res.json({ error: "Password not matched" });
//               }
//             }
//           );
//         } else {
//           return res.json({ error: "Email not found" });
//         }
//       });
//     } catch (error) {
//       console.error(error);
//       return res.json({ error: "An error occurred" });
//     }
//   }
// });

// // Database connection
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "e-commerce",
// });

// // Insert data into MySQL
// const insertPayment = (paymentData) => {
//   const sql = 'INSERT INTO payments SET ?';

//   db.query(sql, paymentData, (err, result) => {
//     if (err) throw err;
//     console.log('Payment inserted:', result);
//   });
// };

// // Example usage
// const paymentData = {
//   razorpay_order_id: 'order123',
//   razorpay_payment_id: 'payment123',
//   razorpay_signature: 'signature123',
// };

// insertPayment(paymentData);


// export { app};