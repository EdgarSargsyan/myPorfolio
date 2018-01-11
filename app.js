const express = require('express');
const path = require('path');
const config = require('./config/index.js');
const ejs = require("ejs")
const ejsMate = require("ejs-mate");
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const skills = require('./routes/skills');

const users = require('./routes/users');

const app = express();

// view engine setup
app.set("views",`${__dirname}/views`);
app.set("view engine",config.get("view-engine"));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.engine("ejs",ejsMate);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({
  secret:"mySecretWord",
  key:"SESSION_ID",
  resave:true,
  saveUninitialized:true,
  cookie: {
    path:'/',
    maxAge: null ,
    httpOnly: true
  }
}));

app.use('/', index);
app.use('/skills', skills);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(config.get('port'),()=>{
  console.log(`Server running on port 3000 ...`);
});
