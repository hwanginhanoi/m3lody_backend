import express from "express";
import pool from "../db.js";
import { profile, nftquery } from "../controllers/profile.js";
const router = express.Router();

//get account detail
router.get("/accountdetail", (req, res) => {
    let user_id = req.session.user.user_id;
    if (!user_id) {
        res.status(401).json({ msg: "Unauthorized" });
        return;
    } else {
        let query = `SELECT * FROM users WHERE user_id = ${user_id}; `;
        profile(req, res, query);
    }
});

//get user own nfts
router.get("/userownnft", (req, res) => {
    let user_id = req.session.user.user_id;
    if (!user_id) {
        res.status(401).json({ msg: "Unauthorized" });
        return;
    } else {
        let query = `SELECT * FROM music WHERE owner_id = ${user_id};`;
        nftquery(req, res, query);
    }
});


export default router;
