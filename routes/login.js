import express from "express";
import pool from "../db.js";
import { login } from "../controllers/login.js";
const router = express.Router();

router.post("/", login);



export default router;