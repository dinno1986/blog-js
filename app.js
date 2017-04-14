//var blog=[];



$("#envoi").click(function(){
	var titre = $("#title").val();
	var texte = $("#text").val();

	var recup = {"tit":titre, "tex":texte};
//	blog.push(recup);
//	console.log(blog);

	var app={name:"dim"};
	
	$.ajax({
		url: 'http://192.168.1.50/json-db',
		data : {
			task : 'set',
			key : 'dimblog',
			value :  JSON.stringify(recup),
		}
	});
});




$.ajax({
		url:'http://192.168.1.50/json-db',
		data: {
			task: 'get',
			key: 'dimblog',
		},
		success : function(data){
			var mesArticles = JSON.parse(data);

			afficher( JSON.parse(data));
		}
});



function afficher( listeArticles ){

	for ( var i=0 ; i<listeArticles.length ; i++ ){
		var article = listeArticles[i];

		console.log( article );

		$("#intitule").append('<li role="presentation"><a href="#">'+(article.tit)+'</a></li>');
		$("#article").append( article.tex );

	}
};

