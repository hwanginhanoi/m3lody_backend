import express from "express";
import pool from "../db.js";
import { profile, nftquery } from "../controllers/profile.js";
const router = express.Router();

router.get("/accountdetail", (req, res) => {
    let user_id = req.session.user.user_id;
    let query = `SELECT * FROM users WHERE user_id = ${user_id}; `;
    profile(req, res, query);
});

router.get("/userownnft", (req, res) => {
    let user_id = req.session.user.user_id;
    let query = `SELECT * FROM music WHERE owner_id = ${user_id};`;
    nftquery(req, res, query);
});

router.get("/usercreatednft", (req, res) => {
    let user_id = req.session.user.user_id;
    let query = `SELECT nft_id, nft_name, nft_description, nft_image, nft_price, nft_owner, nft_creator, nft_datecreated, nft_dateupdated FROM nft WHERE nft_creator = ${user_id}; `;
    nftquery(req, res, query);
});



export default router;