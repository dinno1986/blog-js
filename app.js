



$("#envoi").click(function(){
	var titre = $("#title").val();
	var texte = $("#text").val();
	var uneDate = new Date();
	var recup = {"tit":titre, "tex":texte, "dat":uneDate};


	//envoyer	
	$.ajax({
		url: 'http://192.168.1.50/json-db',
		data : {
			task : 'set',
			key : 'dimblog',
			value :  JSON.stringify(recup),
		}
	});
});


	//appeler la fonction
	$.ajax({
		url:'http://192.168.1.50/json-db',
		data: {
			task: 'get',
			key: 'dimblog',
		},
		success : function(data){
			var mesArticles = JSON.parse(data);
			afficher( JSON.parse(data));
			list ( JSON.parse(data))
				console.log(mesArticles);//pour trouver l'ID des objets
			}
		});


	


	function afficher( listeArticles ){

		for ( var i=0 ; i<listeArticles.length ; i++ ){
			var article = listeArticles[i];

			//console.log( article );
			$("#intitule").append('<li role="presentation"><a class="clickTitre" value="'+i+'" href="#">'+(article.tit)+'</a></li>');
			$("#article").append( article.tex );
			$("#horloge").html(article.dat);
			//console.log(article.dat);
			$("#article").html("");

		}
		$(".clickTitre").click(function(){
			//console.log("clickTitre");
			var indArt = $(this).attr('value');
			//console.log(indArt);
			$("#article").html(listeArticles[indArt].tex);
		});
	};


	$("#text").on('keyup',function(){

		var convertir = new showdown.Converter();
		text      = $("#text").val();
		var html      = convertir.makeHtml(text);
		$("#text2").html(html);

	});



	function list( mesArticles ) {

		for ( var i=0 ; i<mesArticles.length ; i++ ) {
			var article = mesArticles[i];
			console.log( article );

			$(".icone").append('<li role="presentation"><a class="clickTitreAdmin" value="'+i+'" href="#" >'+article.tit+'</a></li>');
			$(".icone").append('<button class="suprim" data-id="' + article._id + '">Suppr</button>');
		}
	

		 $(".suprim").click(function(){
			var cur_Id = $(this).data('id');
			console.log(cur_Id)
	 		$.ajax({  
				url:'http://192.168.1.50/json-db',
					data: {
						task: 'delete',
						_id: cur_Id,

	 				}

			});

		});


	}



