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
    connectionString: DATABASE_URL,
    user: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    port: parseInt(DATABASE_PORT || '5432'),
    database: DATABASE
});

export default pool;
