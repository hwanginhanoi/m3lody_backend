import express from "express";
import pool from "../db.js";
import { createnft } from "../controllers/createnft.js";
import multer from 'multer';
const router = express.Router();
const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
router.post("/", upload.fields([{ name: 'image', maxCount: 1 }, { name: 'musicFile', maxCount: 1 }]), createnft);
export default router;