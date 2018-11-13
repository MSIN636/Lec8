var mongo = require('mongodb');
var mongoose = require('mongoose');
var express= require('express');
var app = express();
var bcrypt = require('bcryptjs');

mongoose.connect('mongodb://alfred:password00@ds249233.mlab.com:49233/msin636' );

app.set('views','./views');
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


var userSchema = mongoose.Schema({
    username: String,
    password: String,
});
var User = mongoose.model("User", userSchema);

app.get('/', function(req, res){
    res.render('login');
})

app.post('/', function(req, res){
	var login = false;
    var user = req.body;              //Get the parsed information
    if(!user.username || !user.password ){
        res.render('show_message', {message: "Sorry, you provided worng info", type: "error"});
    } else {
		 User.findOne({username:user.username},function(err,data){
			 console.log(data.password);
			 bcrypt.compare(user.password,data.password, function(err, isMatch) {
			   if(isMatch){
			 res.send('Access Granted');
		 }else{
			 res.send('Access Denied');
		 }
			
			});
			
		 });
		 
		 
		}
});

app.listen(8080);