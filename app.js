import express from 'express';
import path from 'path';
// import cookieParser from 'cookie-parser';
import logger from 'morgan';
// import indexRouter from './routes/index';
// import usersRouter from './routes/users';
import transactionsRouter from './routes/transactions.js';
import registerRouter from './routes/register.js';
import loginRouter from './routes/login.js';
import cors from 'cors';
import session from 'express-session';
const app = express();
app.use(cors({origin: ['http://192.168.1.117:3000', 'http://localhost:5173'],credentials: true }));

app.use(session({
    secret: 'secret',
    cookie: {maxAge: 2592000000}, // 30 days in ms
    saveUninitialized: false,
    resave: false

})
);



// view engine setup    

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

// app.use('/index', indexRouter);
// app.use('/users', usersRouter);
app.use('/transactions', transactionsRouter);
app.use('/register', registerRouter );
app.use('/login', loginRouter);


app.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({msg: 'logout success'});
});

app.get('/check', (req, res) => {
    if (req.session.authenticated){
        res.json(req.session);
    }else{
        res.status(403).json({msg: 'forbidden'});
    }
});
const PORT = 3001;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
