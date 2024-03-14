var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let pool = require('./db');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// app.get('/hello', (req, res) => {
//     pool.query('SELECT * FROM accounts', (err, result) => {
//         if (!err) {
//             console.log(result.rows);
//             res.status(200).json({
//                 data: result.rows,
//                 success: true
//             });
//         } else {
//             console.error(err.message);
//             res.status(500).send('Internal Server Error'); // Sending an error response
//         }
//     });
// });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', indexRouter);
app.use('/users', usersRouter);

let PORT = 3001;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));


