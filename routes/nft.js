import express from "express";
import pool from "../db.js";
import { profile, nftquery } from "../controllers/profile.js";
const router = express.Router();

router.get("/userprofile", (req, res) => {
    let user_id = req.session.user.user_id;
    if (!user_id) {
        res.status(401).json({msg: "Unauthorized"});
        return;
    }else{
        let query = `SELECT users.user_id, users.username, users.password, users.email, music.music_id, music.title, music.description, music.tag, music.music_url, music.owner_id, music.price, music.picture_url 
        FROM users
        INNER JOIN music ON users.user_id = music.owner_id
        WHERE music.owner_id = ${user_id};`;
        let query2 = `SELECT * FROM users WHERE user_id = ${user_id}; `;
        
        profile(req, res, query);

    }
});

router.get("/usernft", (req, res) => {
    let user_id = 1;
    let query = `SELECT nft_id, nft_name, nft_description, nft_image, nft_price, nft_owner, nft_creator, nft_datecreated, nft_dateupdated FROM nft WHERE nft_owner = ${user_id}; `;
    nftquery(req, res, query);
});



export default router;