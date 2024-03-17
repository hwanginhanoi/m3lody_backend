import express from "express";
import pool from "../db.js";
import { profile, nftquery } from "../controllers/profile.js";
const router = express.Router();

router.get("/userprofile", (req, res) => {
    let user_id = 1;
    let query = `SELECT username, user_id, datejoined, description, avatar_url FROM users WHERE user_id = ${user_id}; `;
    profile(req, res, query);
});

router.get("/usernft", (req, res) => {
    let user_id = 1;
    let query = `SELECT nft_id, nft_name, nft_description, nft_image, nft_price, nft_owner, nft_creator, nft_datecreated, nft_dateupdated FROM nft WHERE nft_owner = ${user_id}; `;
    nftquery(req, res, query);
});



export default router;