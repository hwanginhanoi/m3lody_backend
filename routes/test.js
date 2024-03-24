import express from "express";
import { getPurchase } from "../scripts/getFromTxHash.js";
var router = express.Router();
router.get("/", async (req, res) => {
    let result = await getPurchase("0x5d4db2b495bbdd6862075f1e67b49467144387fd8502a44606a52572067fbc6f");
    let resultJson = JSON.stringify({ name: result });
    res.status(200).json({
        data: resultJson,
        success: true
    });
});
export default router;