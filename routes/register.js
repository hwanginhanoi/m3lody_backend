import express from "express";
import pool from "../db.js";
import { register } from "../controllers/register.js";
const router = express.Router();

router.post("/", (req, res) => {
    let generateUUID = () => {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = (Math.random() * 16) | 0,
                v = c === "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
    let uuid = generateUUID();  
    let email = req.body.email;
    let password = req.body.password;
    console.log(email, password, uuid);
    res.send("register");
    // let query =
    //     `Insert INTO users (user_id ,username, password, email, phone_num, description, address, language, avatar_url) VALUES (${uuid}, '${email}', 'hihi', 'khanh@gmail.com', '', '', '', '', '');`;
    // register(req, res, query);
});

export default router;
