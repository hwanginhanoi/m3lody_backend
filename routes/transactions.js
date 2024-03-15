import express from 'express';
import pool from '../db.js';
import { getTransactions } from '../controllers/transactions.js';

const router = express.Router();

router.get('/', (req, res) => {
    let query = 'SELECT * FROM transactions';
    getTransactions(req, res, query);
});

export default router;
