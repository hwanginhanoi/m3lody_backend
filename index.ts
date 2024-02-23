require('dotenv').config();
const { json } = require('body-parser');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken')
const app = express();
const cookieParser = require('cookie-parser');
app.use(express.json());
// app.use(cors({origin: "*"}));
app.use(cors({origin: ['http://192.168.1.117:3000', 'http://localhost:3000'],credentials: true }));



let PORT:number = 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));