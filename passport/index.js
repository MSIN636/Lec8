/*  EXPRESS SETUP  */

var express = require('express');
var app = express();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var mongoose = require('mongoose');
mongoose.connect('mongodb://alfred:password00@ds249233.mlab.com:49233/msin636');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var port = process.env.PORT || 3000;
app.listen(port , function(){
  console.log('App listening on port ' + port)
});



app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req, res){
  res.sendFile(__dirname+'/auth.html')
});

app.get('/success', function(req, res) {
  res.send("Welcome "+ req.query.username + "!!")
});

app.get('/error', function(req, res){
  res.send("error logging in")
});

passport.serializeUser(function(user, callback) {
  callback(null, user);
});

passport.deserializeUser(function(id, callback) {
  User.findById(id, function(err, user) {
    callback(err, user);
  });
});

/* MONGOOSE SETUP */
var Schema = mongoose.Schema;
var UserDetail = new Schema({
      username: String,
      password: String
    });
var UserDetails = mongoose.model('User', UserDetail);

/* PASSPORT LOCAL AUTHENTICATION */
passport.use(new LocalStrategy(
  function(username, password, callback) {
      UserDetails.findOne({ username: username },
        function(err, user) {
          if (err) {return callback(err); }
          if (!user) {
            return callback(null, false);
          }
          if (user.password != password) {
            return callback(null, false);
          }
          return callback(null, user);
      });
  }
));

app.post('/',
  passport.authenticate('local', { failureRedirect: '/error' }),
  function(req, res) {
    res.redirect('/success?username='+req.user.username);
  });
