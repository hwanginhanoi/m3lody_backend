let { Pool } = require("pg");

const dotenv = require("dotenv");

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
    host: "cos30049.cnmmc8wmy9ar.us-east-1.rds.amazonaws.com",
    user: "superuser",
    password: "1234rewqasdF",
    port: 5432,
    database: "cos30049",
    ssl: { rejectUnauthorized: false },
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

module.exports = pool;
