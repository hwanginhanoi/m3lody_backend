require('dotenv').config();
const { json } = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();
import pool from './db'
import {Client} from "pg";

app.use(express.json());
// app.use(cors({origin: "*"}));
import { Request, Response } from 'express';
app.use(cors({origin: ['http://192.168.1.117:3000', 'http://localhost:3000'],credentials: true }));

const client = new Client({
    host: process.env.DATABASE_URL,
    user: process.env.DATABASE_USERNAME,
    port: parseInt(process.env.DATABASE_PORT as string),
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    ssl: {
        rejectUnauthorized: false
    }
})

// Define a route to fetch users
client.connect();
app.get('/users', (req: Request, res: Response) => {
    client.query('SELECT * FROM users', (err, result) => {
        if (!err) {
            console.log(result.rows);
            res.status(200).json(result.rows); // Sending the rows as JSON response
        } else {
            console.error(err.message);
            res.status(500).send('Internal Server Error'); // Sending an error response
        }
    });
});


let PORT:number = 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));