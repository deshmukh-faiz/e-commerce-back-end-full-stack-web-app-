// signupRoutes.js
import express from "express";
import { signUp } from "../controllers/signupController.js";

const router = express.Router();

router.post("/accountsignup", signUp);

export default router;