import express from "express";
import pool from "../db.js";
import { walletinfor } from "../controllers/wallet.js";
const router = express.Router();

router.get("/walletinfor", (req, res) => {
    let user_id = req.session.user.user_id;
    if (!user_id) {
        res.status(400).json({msg: "user_id is required"});
        return;
    }else{
        let query = `UPDATE users SET FROM wallet WHERE user_id = '${user_id}'; `;
        walletinfor(req, res, query);

    }
});

export default router;