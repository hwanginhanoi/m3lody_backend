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
    host: 'cos30049.cnmmc8wmy9ar.us-east-1.rds.amazonaws.com',
    user: 'superuser',
    port: 5432,
    password: '1234rewqasdF',
    database: 'cos30049',
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