var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var engine = require('ejs-mate');
var flash = require('connect-flash');
var debug = require('debug')('passport-mongo');
var passportConfig = require('./server/config/passport');


//passport
var passport = require('passport');
var expressSession = require('express-session');
//db
var dbConfig = require('./server/config/db');
var mongoose = require('mongoose');
// Initialize Passport
var initPassport = require('./server/passport/init');
//app
var app = express();


// Connect to DB
mongoose.connect(dbConfig.url);



// view engine setup
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'ejs');



// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + 'public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// Configuring Passport
app.use(expressSession({secret: passportConfig.passportSecret}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());


//routes
initPassport(passport);
var router = require('./server/router')(app, passport); 




/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}





//set port
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.info('Express server listening on port ' + server.address().port);
});

module.exports = app;
