import express from "express";
import pool from "../db.js";
import { updateAccount } from "../controllers/updateaccount.js";
import multer from "multer";
const router = express.Router();
const upload = multer();

router.post("/", upload.none(),(req, res) => {
    let user_id = req.session.user.user_id;
    if (!user_id) {
        res.status(401).json({msg: "Unauthorized"});
        return;
    }else{
        let formData = req.body;
        if (formData.phone_num && formData.description && formData.address && formData.language) {
            let query = `UPDATE users SET phone_num = ${formData.phone_num}, description = ${formData.description}, address = ${formData.address}, language = ${formData.language} WHERE user_id = ${user_id};`;
            updateAccount(req, res, query);
        }else{
            res.status(400).json({msg: "Bad Request"});
        }

    }
});

export default router;