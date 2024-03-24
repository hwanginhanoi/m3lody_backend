import express from "express";
import pool from "../db.js";
import { walletinfor } from "../controllers/wallet.js";
const router = express.Router();

router.get("/", (req, res) => {
    let user_id = req.session.user.user_id;
    let query = `UPDATE users SET salary = 50000, department = 'IT' WHERE employee_id = 123;`;
    walletinfor(req, res, query);
});

export default router;