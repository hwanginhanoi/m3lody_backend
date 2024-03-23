import express from "express";
var router = express.Router();
import pool from "../db.js";
const app = express();
import axios from "axios";
import FormData from "form-data";
import fs from "fs";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0MjdkMDQ4YS1jMWFiLTQzMzktOGQ1NC0yMGNlNTE0NjkyNzQiLCJlbWFpbCI6InRvcmkudHVhbkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNDZmYWRkMmY4YmVjMjA1OGMyZGMiLCJzY29wZWRLZXlTZWNyZXQiOiJhZGNkMDM5MGUyOTI4Zjg2MDY1MjA2ODBhMDc2NjM4MGVkZDEzY2VkYzZjZGZlODM1NmNiMDY0ZmI0OGQxOWE2IiwiaWF0IjoxNzExMTI0OTIxfQ.wPsJpdFP91OlXf8D6AcqwwDqoNt55o8ZK7nMWYJLr9w";

export async function createnft(req, res) {
    let image = req.files['image'];
    // let musicFile = req.files['musicFile'][0];
    let title = req.body;
    console.log(title);
    console.log(image);




    // let formData = new FormData();
    // formData.append("file", image.buffer, {
    //     filename: image.originalname,
    //     contentType: image.mimetype,
    // });
    // formData.append("file", musicFile.buffer, {
    //     filename: musicFile.originalname,
    //     contentType: musicFile.mimetype,
    // });
    // const pinataMetadata = JSON.stringify({
    //     name: "File name",
    // });
    // formData.append("pinataMetadata", pinataMetadata);

    // const pinataOptions = JSON.stringify({
    //     cidVersion: 0,
    // });
    // formData.append("pinataOptions", pinataOptions);
    // try {
    //     const theres = await axios.post(
    //         "https://api.pinata.cloud/pinning/pinFileToIPFS",
    //         formData,
    //         {
    //             maxBodyLength: "Infinity",
    //             headers: {
    //                 "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
    //                 Authorization: `Bearer ${JWT}`,
    //             },
    //         }
    //     );
    //     console.log(theres.data);
    //     res.send(theres.data);
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).send("Internal Server Error");
    // }

    res.send("success");
    



















    
    // let query = `INSERT INTO music (title, description, tag, preview_url, owner_id, price, music_id) VALUES ('${formData.title}', '${formData.description}', '${formData.tag}', '${formData.preview_url}', ${req.session.user.user_id}, ${formData.price}, ${formData.music_id})`;
    // pool.query(query, (err, result) => {
    //     if (!err) {
    //         console.log(result.rows);
    //         res.status(200).json({
    //             data: result.rows,
    //             success: true,
    //         });
    //     } else {
    //         console.error(err.message);
    //         res.status(500).send("Internal Server Error"); // Sending an error response
    //     }
    // });
}


// const pinFileToIPFS = async () => {
//     const formData = new FormData();
//     const src = "path/to/file.png";

//     const file = fs.createReadStream(src);
//     formData.append("file", file);

//     const pinataMetadata = JSON.stringify({
//         name: "File name",
//     });
//     formData.append("pinataMetadata", pinataMetadata);

//     const pinataOptions = JSON.stringify({
//         cidVersion: 0,
//     });
//     formData.append("pinataOptions", pinataOptions);

//     try {
//         const res = await axios.post(
//             "https://api.pinata.cloud/pinning/pinFileToIPFS",
//             formData,
//             {
//                 maxBodyLength: "Infinity",
//                 headers: {
//                     "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
//                     Authorization: `Bearer ${JWT}`,
//                 },
//             }
//         );
//         console.log(res.data);
//     } catch (error) {
//         console.log(error);
//     }
// };
// pinFileToIPFS();
