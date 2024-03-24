import express from 'express';
import path from 'path';
// import cookieParser from 'cookie-parser';
import logger from 'morgan';
// import indexRouter from './routes/index';
// import usersRouter from './routes/users';
import transactionsRouter from './routes/transactions.js';
import registerRouter from './routes/register.js';
import loginRouter from './routes/login.js';
import accountRouter from './routes/account.js';
import walletRouter from './routes/wallet.js';
import profileRouter from './routes/nft.js';
import createnftRouter from './routes/createnft.js';
import marketRouter from './routes/marketplace.js';
import dashboardRouter from './routes/dashboard.js';
import updateAccountRouter from './routes/updateaccount.js';
import cors from 'cors';
import session from 'express-session';
import { create } from 'domain';
const app = express();
app.use(cors({ origin: ['http://192.168.1.117:3000', 'http://localhost:5173'], credentials: true }));

app.use(session({
    secret: 'secret',
    cookie: {
        maxAge: 2592000000,
        httpOnly: false,
    }, // 30 days in ms
    saveUninitialized: false,
    resave: false

})
);



// view engine setup    

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use('/transactions', transactionsRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/account', accountRouter);
app.use('/wallet', walletRouter);
app.use('/createnft', createnftRouter);
app.use('/purchase', purchaseRouter);
app.use('/marketplace', marketRouter);
app.use('/check', checkRouter);
app.use('/dashboard', dashboardRouter);
app.use('/updateAccount', updateAccountRouter);


app.post('/logout', (req, res) => {
    req.session.destroy();
    console.log('logout success');
    res.clearCookie('connect.sid');
    res.json({ msg: 'logout success' });

});

app.post('/check', (req, res) => {
    if (req.session.authenticated){
        res.json({msg: 'authenticated'});
    }else{
        res.status(403).json({msg: 'forbidden'});
    }
});
const PORT = 3001;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
