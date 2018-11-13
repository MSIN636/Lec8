var express = require('express')
var cookieParser = require('cookie-parser');
var flash= require('connect-flash');
var session = require('express-session');
var path = require('path');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
  
app.use(cookieParser());
app.use(session({secret:'secret'}));
  
app.use(flash());


app.get('/', function(req, res){
  res.render('index', { message: req.flash('info') });
});

app.get('/flash', function(req, res){
  req.flash('info', 'Hi there!')
  res.redirect('/');
});

app.get('/no-flash', function(req, res){
  res.redirect('/');
});

app.get('/multiple-flash', function(req, res){
    req.flash('info', ['Welcome', 'Please Enjoy']);
    res.redirect('/');
});

app.listen(3000);
