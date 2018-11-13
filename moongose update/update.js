var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://alfred:password00@ds249233.mlab.com:49233/msin636');
var personSchema = mongoose.Schema({
    name: String,
    age: Number,
    nationality: String
});
var Person = mongoose.model("Person", personSchema);
app.get('/update/:id', function(req, res){
    Person.update({name:"alfred"},{age:req.params.id}, function(err, response){
        if(err) res.json({message: "Error in updating person with id " + req.params.id});
        res.json(response);
    });
});
app.listen(3000); 
