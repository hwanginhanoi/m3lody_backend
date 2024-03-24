import express from "express";
import pool from "../db.js";
import { updateAccount } from "../controllers/updateaccount.js";
const router = express.Router();
import multer from "multer";
const upload = multer();
import pinFileToIPFS from "../controllers/pinFileToIPFS.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//update account information
router.post("/", upload.fields([{name:'image', maxCount: 1}]),async (req, res) => {
    let user_id = req.session.user.user_id;
    let image = req.files['image'][0];
    console.log(image);
    let avatar_url = "";
    if (!user_id) {
        res.status(401).json({msg: "Unauthorized"});
        return;
    }else{
        let formData = req.body;
        console.log(formData);
        if (formData.phone_num && formData.email && formData.address && formData.language && (formData.avatar_url)) {
            avatar_url = formData.avatar_url;
            if (image) {
                avatar_url = await pinFileToIPFS(image);
            }
            console.log(avatar_url);
            let query = `UPDATE users SET phone_num = '${formData.phone_num}', email = '${formData.email}', address = '${formData.address}', language = '${formData.language}', avatar_url = '${avatar_url}' WHERE user_id = ${user_id};`;
            updateAccount(req, res, query);
        }else{
            res.status(400).json({msg: "Bad Request"});
        }

    }
});


//update security information
router.post ("/updatesecurity", upload.none(), (req, res) => {
    let user_id = req.session.user.user_id;
    if (!user_id) {
        res.status(401).json({msg: "Unauthorized"});
        return;
    }else{
        let formData = req.body;
        let getCurrentPassword = `SELECT password FROM users WHERE user_id = ${user_id};`;
        if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
            res.status(400).json({msg: "Bad Request"});
            return;
        }else{

            pool.query(getCurrentPassword, (err, result) => {
                if (!err) {
                    if (result.rows[0].password === formData.currentPassword) {
                        if (formData.newPassword === formData.confirmPassword) {
                            let query = `UPDATE users SET password = '${formData.newPassword}' WHERE user_id = ${user_id};`;
                            updateAccount(req, res, query);
                        }else{
                            res.status(400).json({msg: "Bad Request"});
                        }
                    }else{
                        res.status(400).json({msg: "Bad Request"});
                    }
                }else{
                    console.error(err.message);
                    res.status(500).send('Internal Server Error');
                }
            });
        }
    }
});

export default router;