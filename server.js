//web server

var express = require('express');
var app = express();
var bodyparser = require('body-parser');

app.listen(3000, function(){
	console.log('server ok');
});

var articles =[];

//middleware

app.use(bodyparser.urlencoded({extended:false}));
app.use(express.static(__dirname + '/'));

//jade

app.set('views', './views');
app.set('view engine', 'jade');

//routes

app.get('/', function(req, res){
	res.render('admin');
});

app.get('/index', function(req,res){
	res.render('index');
})

app.post('/Dimblog', function (req, res) {
	var save = JSON.parse(req.body.value);
	articles.push (save);
   console.log(articles);
});

app.get('/Koko', function (req, res){
	res.send(JSON.stringify(articles));
});


