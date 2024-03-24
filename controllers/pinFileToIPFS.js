import express from "express";
var router = express.Router();
import pool from "../db.js";
const app = express();
import axios from "axios";
import FormData from "form-data";
import fs from "fs";
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

export default async function pinFileToIPFS(file){
    //jwt token
    const JWT =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0MjdkMDQ4YS1jMWFiLTQzMzktOGQ1NC0yMGNlNTE0NjkyNzQiLCJlbWFpbCI6InRvcmkudHVhbkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNDZmYWRkMmY4YmVjMjA1OGMyZGMiLCJzY29wZWRLZXlTZWNyZXQiOiJhZGNkMDM5MGUyOTI4Zjg2MDY1MjA2ODBhMDc2NjM4MGVkZDEzY2VkYzZjZGZlODM1NmNiMDY0ZmI0OGQxOWE2IiwiaWF0IjoxNzExMTI0OTIxfQ.wPsJpdFP91OlXf8D6AcqwwDqoNt55o8ZK7nMWYJLr9w";
    let resultlink = "";
    const formData = new FormData();

    //append file to formdata
    formData.append("file", file.buffer, {
        filename: file.originalname,
    });
    //metadata
    const pinataMetadata = JSON.stringify({
        name: `${file.originalname}`,
    });
    formData.append("pinataMetadata", pinataMetadata);

    const pinataOptions = JSON.stringify({
        cidVersion: 0,
    });
    formData.append("pinataOptions", pinataOptions);
    //send file to pinata
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
        resultlink = `https://silver-adequate-reindeer-277.mypinata.cloud/ipfs/${res.data.IpfsHash}`
        return resultlink;
    } catch (error) {
        console.log(error);
    }
};