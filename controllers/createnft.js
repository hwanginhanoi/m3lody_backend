import express from "express";
var router = express.Router();
import pool from "../db.js";
const app = express();
import axios from "axios";
import FormData from "form-data";
import fs from "fs";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const JWT =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0MjdkMDQ4YS1jMWFiLTQzMzktOGQ1NC0yMGNlNTE0NjkyNzQiLCJlbWFpbCI6InRvcmkudHVhbkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNDZmYWRkMmY4YmVjMjA1OGMyZGMiLCJzY29wZWRLZXlTZWNyZXQiOiJhZGNkMDM5MGUyOTI4Zjg2MDY1MjA2ODBhMDc2NjM4MGVkZDEzY2VkYzZjZGZlODM1NmNiMDY0ZmI0OGQxOWE2IiwiaWF0IjoxNzExMTI0OTIxfQ.wPsJpdFP91OlXf8D6AcqwwDqoNt55o8ZK7nMWYJLr9w";

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
        let imageHash = await pinFileToIPFS(image);
        let musicHash = await pinFileToIPFS(musicFile);
        let imageLink = `https://silver-adequate-reindeer-277.mypinata.cloud/ipfs/${imageHash.IpfsHash}`;
        let musicLink = `https://silver-adequate-reindeer-277.mypinata.cloud/ipfs/${musicHash.IpfsHash}`;

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

const pinFileToIPFS = async (file) => {
    const formData = new FormData();

    formData.append("file", file.buffer, {
        filename: file.originalname,
    });

    const pinataMetadata = JSON.stringify({
        name: `${file.originalname}`,
    });
    formData.append("pinataMetadata", pinataMetadata);

    const pinataOptions = JSON.stringify({
        cidVersion: 0,
    });
    formData.append("pinataOptions", pinataOptions);

    try {
        const res = await axios.post(
            "https://api.pinata.cloud/pinning/pinFileToIPFS",
            formData,
            {
                maxBodyLength: "Infinity",
                headers: {
                    "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
                    Authorization: `Bearer ${JWT}`,
                },
            }
        );
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
