import express from 'express';
import path from 'path';
// import cookieParser from 'cookie-parser';
import logger from 'morgan';
// import indexRouter from './routes/index';
// import usersRouter from './routes/users';
import transactionsRouter from './routes/transactions.js';
import registerRouter from './routes/register.js';
import cors from 'cors';
import session from 'express-session';
const app = express();
app.use(cors());

app.use(session({
    secret: 'secret',
    cookie: false,
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
app.post('/login', (req, res) => {
    console.log(req.sessionID);
    res.send('hello')
    console.log('hello');
});
const PORT = 3001;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
