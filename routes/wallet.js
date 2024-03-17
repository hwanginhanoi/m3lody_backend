import express from "express";
import pool from "../db.js";
import { walletinfor } from "../controllers/wallet.js";
const router = express.Router();

router.get("/walletinfor", (req, res) => {
    let user_id = req.session.user.user_id;
    console.log(user_id);
    let query = `SELECT * FROM wallet WHERE user_id = '${user_id}'; `;
    walletinfor(req, res, query);
});

// router.get("/usernft", (req, res) => {
//     let user_id = 1;
//     let query = `SELECT nft_id, nft_name, nft_description, nft_image, nft_price, nft_owner, nft_creator, nft_datecreated, nft_dateupdated FROM nft WHERE nft_owner = ${user_id}; `;
//     nftquery(req, res, query);
// });



export default router;