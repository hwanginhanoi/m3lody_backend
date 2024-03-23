import express from "express";
import pool from "../db.js";
import { register } from "../controllers/register.js";
const router = express.Router();

router.post("/", (req, res) => {
    let {email, password} = req.body;
    if (!email || !password) {
        res.status(400).json({msg: "email and password are required"});
        return;
    }else{
        let query =
            `Insert INTO users (username, password, email, phone_num, description, address, language, avatar_url) VALUES ('', '${password}', '${email}', '', '', '', '', '');`;
        register(req, res, query);
    }
});

export default router;
