import express from "express";
import { getPurchase } from "../scripts/getFromTxHash.js";
var router = express.Router();
router.post("/", async (req, res) => {
    let { hash } = req.body;
    let result = await getPurchase(hash);
    res.status(200).json({
        data: result,
        success: true
    });
});
export default router;