import express from "express";
import pool from "../db.js";
import { profile } from "../controllers/profile.js";
const router = express.Router();

router.get("/userdata", (req, res) => {
    let user_id = 1;
    let query = `SELECT name, user_id, datejoined FROM users WHERE user_id = ${user_id};`;
    profile(req, res, query);
});



export default router;