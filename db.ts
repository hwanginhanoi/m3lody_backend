import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {
    DATABASE_URL,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    DATABASE_PORT,
    DATABASE
} = process.env;

// Create a new pool instance
const pool = new Pool({
    host: 'cos30049.cnmmc8wmy9ar.us-east-1.rds.amazonaws.com',
    user: 'superuser',
    password: '1234rewqasdF',
    port: 5432,
    database: 'cos30049',
    ssl: { rejectUnauthorized: false }
});

export default pool;
