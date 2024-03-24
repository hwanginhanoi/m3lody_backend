import express from "express";
import pool from "../db.js";
import { walletinfor } from "../controllers/wallet.js";
const router = express.Router();
import multer from "multer";
const upload = multer();

router.get("/walletinfor", (req, res) => {
    let user_id = req.session.user.user_id;
    if (!user_id) {
        res.status(401).json({msg: "Unauthorized"});
        return;
    }else{
        let query = `SELECT * FROM wallet WHERE user_id = '${user_id}'; `;
        walletinfor(req, res, query);

    }
});

router.post("/postwallet", (req, res) => {
    let user_id = req.session.user.user_id;
    if (!user_id) {
        res.status(401).json({msg: "Unauthorized"});
        return;
    }else{
        let formData = req.body;
        if (formData.wallet_address) {
            let query = `INSERT INTO wallet (user_id, wallet_address) VALUES ('${user_id}', '${formData.wallet_address}');`;
            walletinfor(req, res, query);
        }else{
            res.status(400).json({msg: "Bad Request"});
        }

    }
})

router.post("/addwallet", upload.none(), (req, res) => {
    let user_id = req.session.user.user_id;
    if (!user_id) {
        res.status(401).json({msg: "Unauthorized"});
        return;
    }else{
        let formdata = req.body;
        let wallet_address = formdata.wallet_address;
        let query = `INSERT INTO wallet (user_id, wallet_address) VALUES ('${user_id}', '${wallet_address}');`;
        walletinfor(req, res, query);
    }
});

router.post("/updatewallet", upload.none(), (req, res) => {
    let user_id = req.session.user.user_id;
    if (!user_id) {
        res.status(401).json({msg: "Unauthorized"});
        return;
    }else{
        let formdata = req.body;
        let wallet_address = formdata.wallet_address;
        let query = `UPDATE wallet SET wallet_address = '${wallet_address}' WHERE user_id = '${user_id}';`;
        walletinfor(req, res, query);
    }
});

export default router;