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

$("#clearbutt").click(function(){
	$.ajax({  
		url:'http://192.168.1.50/json-db',
		data: {
			task: 'delete',
			key: 'dimblog'
		}
	});	
});



function afficher( listeArticles ){

	for ( var i=0 ; i<listeArticles.length ; i++ ){
		var article = listeArticles[i];

		//console.log( article );

		$("#intitule").append('<li  role="presentation"><a class="clickTitre" value="'+i+'" href="#">'+(article.tit)+'</a></li>');
		$("#article").append( article.tex );
		$("#article").html("");

	}
	$(".clickTitre").click(function(){
		//console.log("clickTitre");
		var indArt = $(this).attr('value');
		//console.log(indArt);
		$("#article").html(listeArticles[indArt].tex);

	});

};


