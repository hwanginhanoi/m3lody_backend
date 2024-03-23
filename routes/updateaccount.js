import express from "express";
import pool from "../db.js";
import { walletinfor } from "../controllers/wallet.js";
const router = express.Router();

router.get("/", (req, res) => {
    let user_id = req.session.user.user_id;
    let query = `SELECT * FROM wallet WHERE user_id = '${user_id}'; `;
    walletinfor(req, res, query);
});

export default router;