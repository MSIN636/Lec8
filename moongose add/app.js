var mongo = require('mongodb');
var mongoose = require('mongoose');
var express= require('express');
var app = express();
mongoose.connect('mongodb://alfred:password00@ds249233.mlab.com:49233/msin636' );

app.set('views','./views');
app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


var personSchema = mongoose.Schema({
    name: String,
    age: Number,
    nationality: String
});
var Person = mongoose.model("user", personSchema);

app.get('/', function(req, res){
    res.render('person');
})

app.post('/', function(req, res){
    var personInfo = req.body;              //Get the parsed information
    if(!personInfo.name || !personInfo.age || !personInfo.nationality){
        res.render('show_message', {message: "Sorry, you provided worng info", type: "error"});
    } else {
        var newPerson = new Person({
            name: personInfo.name,
            age: personInfo.age,
            nationality: personInfo.nationality
        });
        newPerson.save(function(err, entry){
			console.log(entry);
            if(err)
                res.render('show_message', {message: "Database error", type: "error"});
            else
                res.render('show_message', {message: "New person added", type: "success", person: personInfo});
        });
    }
});



app.listen(8080);
