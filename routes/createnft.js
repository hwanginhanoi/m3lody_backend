import express from "express";
import pool from "../db.js";
import { createnft } from "../controllers/createnft.js";
const router = express.Router();

router.post("/", createnft);
export default router;