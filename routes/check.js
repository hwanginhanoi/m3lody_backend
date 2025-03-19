import express from "express";
import { getPurchase } from "../scripts/getFromTxHash.js";
var router = express.Router();
//check purchase
router.post("/", async (req, res) => {
    let { hash, id } = req.body;
    let result = await getPurchase(hash, id);
    res.status(200).json({
        data: result,
        success: true
    });
});
export default router;