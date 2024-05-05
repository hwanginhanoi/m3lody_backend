import * as dotenv from 'dotenv';
dotenv.config();
import pg from 'pg';
const { Pool } = pg;

dotenv.config();

const {
    DATABASE_URL,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    DATABASE_PORT,
    DATABASE,
} = process.env;

// Create a new pool instance
const pool = new Pool({
    host: "localhost",
    user: "superuser",
    password: "1234rewqasdF",
    port: 5432,
    database: "superuser",
    // ssl: { rejectUnauthorized: false },
});

function pools(query, res) {
    pool.query("SELECT * FROM accounts", (err, result) => {
        if (!err) {
            console.log(result.rows);
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

export default pool;