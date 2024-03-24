import express from "express";
import pool from "../db.js";
import { getTransactions } from "../controllers/transactions.js";

const router = express.Router();
//get transactions
router.get("/", (req, res) => {
    let user_id = req.session.user.user_id;
    if (!user_id) {
        res.status(401).json({ msg: "Unauthorized" });
        return;
    } else {
        let query = "SELECT * FROM transactions";
        getTransactions(req, res, query);
    }
});

export default router;
