import bcrypt from "bcrypt";
import Joi from "joi";
import mysql from "mysql";
import jwt from "jsonwebtoken";

const saltRounds = 10;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "e-commerce",
});

export const signIn = (req, res) => {
    var login_email_pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    var login_password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@]{4,}$/;
  
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().regex(login_email_pattern).required(),
      password: Joi.string().regex(login_password_pattern).required(),
    }); //.unknown(true);
  
    const { error } = schema.validate(req.body, { abortEarly: false });
    console.log(!error);
    if (error) {
      console.log("=========",error);
      return res.json({ error: error.details[0].message });
    } else {
      try {
        const sql = "SELECT * FROM user WHERE email=?";
  
        db.query(sql, [req.body.email], (err, data) => {
          if (err) {
            console.log(err);
            return res.json({ Error: "Login error in server" });
          }
  
          if (data.length > 0) {
            bcrypt.compare(
              req.body.password.toString(),
              data[0].password,
              (err, response) => {
                if (err) {
                  console.error("Password compare error:", err);
                  return res.json({ error: "Password compare error" });
                }
                if (response) {
                  const name = data[0].name;
                  const token = jwt.sign({ name }, "jwt-secret-key", {
                    expiresIn: "1d",
                  });
                  res.cookie("token", token);
                  return res.json({ Status: "Success" });
                } else {
                  console.error("Password not matched");
                  return res.json({ error: "Password not matched" });
                }
              }
            );
          } else {
            console.log("askdhasjhdjh");
            return res.json({ error: "Email not found" });
          }
        });
      } catch (error) {
        console.error(error);
        return res.json({ error: "An error occurred" });
      }
    }
};