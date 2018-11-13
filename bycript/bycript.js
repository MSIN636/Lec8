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
    var user = req.body;              //Get the parsed information
    if(!user.username || !user.password ){
        res.render('show_message', {message: "Sorry, you provided worng info", type: "error"});
    } else {
		
        var newUser = new User({
            username: user.username,
            password: user.password,
        });
		
		 bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(newUser.password, salt, function(err, hash) {
				newUser.password = hash;
				newUser.save(function(err, entry){
					if(err) throw err;
					else
						res.json(entry);
				});
			});
		});
	}
	});


app.listen(8080);
