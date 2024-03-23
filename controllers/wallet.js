import express from 'express';
var router = express.Router();
import pool from '../db.js';
const app = express();

app.use(express.json());

export function walletinfor(req, res, query) {
    pool.query(query, (err, result) => {
        if (!err) {
            res.status(200).json({
                data: result.rows,
                success: true
            });
        } else {
            console.error(err.message);
            res.status(500).send('Internal Server Error'); // Sending an error response
        }
    }
    );
}

export function nftquery(req, res, query) {
    pool.query(query, (err, result) => {
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
    }
    );
}


