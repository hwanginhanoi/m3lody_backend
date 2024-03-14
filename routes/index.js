var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('this is index route')
});

router.get('/test', function(req, res, next) {
  res.send('hello')
});

module.exports = router;
