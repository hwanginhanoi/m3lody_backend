import express from "express";
import pool from "../db.js";
import { getTransactions } from "../controllers/transactions.js";
import multer from "multer";
const upload = multer();


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

//post transactions
router.post("/uptransaction", upload.none(),(req, res) => {
    let user_id = req.session.user.user_id;
    if (!user_id) {
        res.status(401).json({ msg: "Unauthorized" });
        return;
    } else {
        let formData = req.body;
        if (formData.music_id && formData.seller_id && formData.hashCode) {
            let query = `INSERT INTO transactions (buyer_id, seller_id, music_id, token_id) VALUES ('${user_id}', '${formData.seller_id}', '${formData.music_id}', '${formData.hashCode}');`;
            getTransactions(req, res, query);
        } else {
            res.status(400).json({ msg: "Bad Request" });
        }
    }   
})

export default router;
