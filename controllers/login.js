import express from 'express';
var router = express.Router();
import pool from '../db.js';
const app = express();

app.use(express.json());

export function login(req, res){
    const {username, password} = req.body;
    if (username && password){
        let query = `SELECT user_id, username, email FROM users WHERE username = '${username}' AND password = '${password}'`;
        pool.query(query, (err, result) => {
            if (!err) {
                // If user is found and the password matches
                if (result.rows.length > 0) {
                    req.session.authenticated = true;
                    req.session.user = {
                        user_id: result.rows[0].user_id,
                        username: result.rows[0].username,
                        email: result.rows[0].email
                    }
                    console.log(req.session.user.username);
                    res.status(200).json({
                        data: result.rows,
                        success: true
                    });
                } else {
                    res.status(403).json({msg: 'forbidden'}); // Sending a forbidden response
                }
    
            } else {
                console.error(err.message);
                res.status(500).send('Internal Server Error'); // Sending an error response
            }
        }
        );

    }else{
        res.status(400).json({msg: 'email and password are required'});
    }
}