import express from "express";
var router = express.Router();
import pool from "../db.js";
const app = express();
import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import pinFileToIPFS from "./pinFileToIPFS.js";
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

export async function createnft(req, res) {
    let user_id = req.session.user.user_id;
    if (!user_id) {
        res.status(401).json({ msg: "Unauthorized" });
        return;
    } else {
        let image = req.files["image"][0];
        let musicFile = req.files["musicFile"][0];
        let nftMetaData = req.body;
        console.log(req.session.user.username);
        console.log(musicFile);
        console.log(image);
        console.log(nftMetaData.title);
        let imageLink = await pinFileToIPFS(image);
        let musicLink = await pinFileToIPFS(musicFile);

        let query = `INSERT INTO music (title, description, tag, music_url, owner_id, price, picture_url, author) VALUES ('${nftMetaData.title}', '${nftMetaData.description}', '${nftMetaData.type}', '${musicLink}', ${req.session.user.user_id}, '${nftMetaData.price}', '${imageLink}', '${req.session.user.username}')`;
        pool.query(query, (err, result) => {
            if (!err) {
                res.status(200).json({
                    data: result.rows,
                    success: true,
                });
            } else {
                console.error(err.message);
                res.status(500).send("Internal Server Error"); // Sending an error response
            }
        });
    }
    // res.send('success');
}


