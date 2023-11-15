// signupController.js
import bcrypt from "bcrypt";
import Joi from "joi";
import mysql from "mysql";

const saltRounds = 10;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "e-commerce",
});

export const signUp = (req, res) => {
  const { name, email, password } = req.body;

  const schema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  const { error } = schema.validate({ name, email, password });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  } else {
    const sql = "INSERT INTO user (`name`, `email`, `password`) VALUES(?) ";

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        return res.status(500).json({ Error: "Error for hashing password" });
      }
      const values = [name, email, hash];
      db.query(sql, [values], (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ Error: "Inserting data error in server" });
        } else {
          console.log("req from body",req.body);
          return res.json({ Status: "Success" });
        }
      });
    });
  }
};
