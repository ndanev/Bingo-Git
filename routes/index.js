var session = require('express-session');
var cookieParser = require('cookie-parser');

var express = require('express');
var router = express.Router();

// get bingo page
router.get('/', function(req, res) {
    res.render('index');
    console.log(req.cookies);
    console.log(req.session);
});

module.exports = router;