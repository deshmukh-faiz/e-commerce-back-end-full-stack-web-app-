// signinRoutes.js
import express from "express";
import { signIn } from "../controllers/signinController.js";

const router = express.Router();

router.post("/signin", signIn);

export default router;