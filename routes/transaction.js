var express = require('express');
var router = express.Router();
let pool = require('./db');


router.get('/transaction'), function(req, res, next) {
    res.send('this is transaction route');
}

module.exports = router;