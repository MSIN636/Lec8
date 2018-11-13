var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://alfred:password00@ds249233.mlab.com:49233/msin636' );
var personSchema = mongoose.Schema({
    name: String,
    age: Number,
    nationality: String
});
var Person = mongoose.model("Person", personSchema);
app.get('/all', function(req, res){
    Person.find(function(err, response){
        res.json(response);
    });
});
app.listen(3000);
