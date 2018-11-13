var express = require('express');
var multer  = require('multer')
var upload = multer({ dest: 'public/images' })
var path = require('path');
var express = require('express');
var fs = require('fs')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req,res){
	res.render('upload');
});

app.post('/',upload.single('avatar'), function(req, res, next) {
    if(req.file){
      var profileimage = req.file.filename;

	  var path = '/images/'+profileimage;
	  console.log(path);
      res.render('upload',{pic:path});
    }else{
      var profileimage = 'noimage.jpg';
    }
});
app.listen(3000);
