import express from "express";
import pool from "../db.js";
import { querryAllNFT} from "../controllers/marketplace.js";
const router = express.Router();

router.get("/", (req, res) => {
    let query = `SELECT * FROM music ORDER BY RANDOM()`
    querryAllNFT(req, res, query);
});

export default router;