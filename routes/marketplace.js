import express from "express";
import pool from "../db.js";
import { querryAllNFT } from "../controllers/marketplace.js";
const router = express.Router();
//get all nft
router.get("/", (req, res) => {
    let user_id = req.session.user.user_id;
    if (!user_id) {
        res.status(401).json({ msg: "Unauthorized" });
        return;
    } else {
        let query = `SELECT * FROM music`;
        querryAllNFT(req, res, query);
    }
});
//get nft by id
router.get("/:id", (req, res) => {
    let user_id = req.session.user.user_id;
    if (!user_id) {
        res.status(401).json({ msg: "Unauthorized" });
        return;
    } else {
        let query = `SELECT * FROM music WHERE music_id = ${req.params.id}`;
        querryAllNFT(req, res, query);
    }
});

export default router;
