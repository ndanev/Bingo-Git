var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var morgan = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bingo-game', { useNewUrlParser: true });
var db = mongoose.connection;


var routes = require('./routes/index');
var users = require('./routes/users');

// init app
var app = express();

// routes
app.use('/', routes);
app.use('/users', users);

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

// bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// init morgan
app.use(morgan('dev'));

// init cookies
app.use(cookieParser());

// express session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// static files
//app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

//passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));

// connect flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
  });


// route bingo game
//app.get('/bingo-game', function(req, res) {
  //  res.sendFile(path.join(__dirname + '/index.html'));
//});

// route login page
//app.get('/login', function(req, res) {
    //res.sendFile(path.join(__dirname + '/login.html'));
//});

// route sign up page
//app.get('/signup', function(req, res) {
   // res.sendFile(path.join(__dirname + '/signup.html'));
//})


//generate ticket
app.get('/generateTicket', function(req, res) {
    generateTicket();
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(ticket));
});


// start game
app.get('/startGame', function(req, res) {
    startGame();
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(startNumbers));
})


// 
function nextNumber() {
    var n = Math.floor(Math.random() * 90);
    return n;
}

// generate ticket rows with parameters x and y
var ticket = [];

function row(x, y) {
    var countNumbers = 0;
    var countZeroes = 0;
    for (i = x; i < y; i++) {
        var counter = 0;
        var a = nextNumber();
        if (ticket.includes(a)) {
            a = 0;
            
        }
        if (a != 0) {
            counter++
            countNumbers++
            if (countNumbers > 5) {
                a = 0
            }
        }
        if (a == 0) {
            counter++
            countZeroes++
            if (countZeroes > 4) {
                i--
                continue;
            }
        }
        ticket[i] = a
    }
}

// Ticket Generator
function generateTicket() {
    row(0, 9);
    row(9, 18);
    row(18, 27);
    row(27, 36);
    row(36, 45);
    row(45, 54);
}


// start game function, random numbers
var startNumbers = 0;

function startGame() {
    var numbers = Math.floor(Math.random() * 90);
    if (numbers === 0) {
        numbers = Math.floor(Math.random() * 90);
        startNumbers = numbers;
    } 
    startNumbers = numbers;
}





// listening on port 3000
app.listen(process.env.port || 4000, function() {
    console.log('Listening on port 4000...');
});