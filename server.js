//web server

var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var fs = require('fs');

app.listen(3000, function(){
	console.log('server ok');
});

var articles =[];
charger();
//middleware

app.use(bodyparser.urlencoded({extended:false}));
app.use(express.static(__dirname + '/'));

//jade

app.set('views', './views');
app.set('view engine', 'jade');

//node fs
//afficher les elements sauvegardes
function charger () {
	fs.readFile('dim.json', function(err, data){
  		if (err) throw err;
  		articles=JSON.parse(data);
	});
};

function sauvegarde (){
	fs.writeFile('dim.json', JSON.stringify(articles), function(err){
 		 if (err) throw err;
  		console.log('The file has been saved!');
	});
};


app.get('/', function(req, res){
	res.render('admin');
});

app.get('/index', function(req,res){
	res.render('index');
})
//route pour enregistrer
app.post('/Dimblog', function (req, res) {
	var save = JSON.parse(req.body.value);
	articles.push (save);
	sauvegarde();
	res.send('ok');
   //console.log(articles);
   		
});
//route pour afficher
app.get('/Koko', function (req, res){
	res.send(JSON.stringify(articles));
});
//route pour effacer
app.get('/Delete', function(req, res){

})


