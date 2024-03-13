require('dotenv').config();
const { json } = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();
import pool from './db'
import {Client} from "pg";
import {Network, Alchemy, Utils, BigNumber} from 'alchemy-sdk';
app.use(express.json());
// app.use(cors({origin: "*"}));
import { Request, Response } from 'express';
app.use(cors());

const settings = {
    apiKey: "cB-jqW7qNhmG-fbEvH2BT3gvwe1prbHZ",
    network: Network.ETH_SEPOLIA,
};

<<<<<<< Updated upstream
// Define a route to fetch users
client.connect();
app.get('/users', (req: Request, res: Response) => {
    client.query('SELECT * FROM accounts', (err, result) => {
        if (!err) {
            console.log(result.rows);
            res.status(200).json({
                data: result.rows,
                success: true
            });
        } else {
            console.error(err.message);
            res.status(500).send('Internal Server Error'); // Sending an error response
        }
    });
});
=======
const alchemy = new Alchemy(settings);

let balance;
let hex: string | undefined;
balance = alchemy.core
    .getBalance('0xF6953544A402CD2AFb3045d1d7e8a21eF58bCE7f')
    .then(balance =>{
        hex = balance._hex;
        let balanceInETH = (parseInt(hex as string) / 100 ** 9).toFixed(5) + " ETH";
        console.log(balanceInETH);
    })
>>>>>>> Stashed changes


let PORT:number = 3001;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));