import express from "express";
import pool from "../db.js";
import { register } from "../controllers/register.js";
const router = express.Router();
import multer from "multer";
const upload = multer();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

router.post("/", upload.none(), async (req, res) => {
    let formData = req.body;

    if (!formData.email || !formData.password || !formData.username) {
        res.status(400).json({ msg: "credentials are required" });
        return;
    } else {
        if (formData.password !== formData.confirmPassword) {
            res.status(400).json({ msg: "Password does not match" });
            return;
        } else {
            let query = `Insert INTO users (username, password, email, phone_num, description, address, language, avatar_url) VALUES ('${formData.username}', '${formData.password}', '${formData.email}', '', '', '', '', '');`;
            register(req, res, query);
        }
    }
});

export default router;
