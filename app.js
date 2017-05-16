
$("#envoi").click(function(){
	console.log('yufzytrf');

	var titre = $("#title").val();
	var texte = $("#text").val();
	var uneDate = new Date();
	var recup = {"tit":titre, "tex":texte, "dat":uneDate};
	//envoyer	
	
	$.ajax({

		url: '/Dimblog',
		method:"POST",
		data : {
			task : 'set',
			key : 'dimblog',
			value :  JSON.stringify(recup),
		}
	});
});

	//appeler la fonction
$.ajax({

		url:'/Koko',
		data: {
			task: 'get',
			key: 'dimblog',
		},
		success : function(data){
			if(data !==null){
			var mesArticles = JSON.parse(data);
			afficher( JSON.parse(data));
			list ( JSON.parse(data))
		}
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
			$(".icone").append('<button id="supp" class="suprim" data-id="' + article.id + '">Suppr</button>');
			$(".icone").append('<button class="modif" data-texte="' + article.id + '">Modif</button>');
		}
	
		$(".icone").delegate('#supp','click',function(){
		 // $(".suprim").click(function(){
			var idEnCours = $(this).attr('data-id');
			console.log(idEnCours)
	 		$.ajax({  
				url:'/Delete',
				method: 'post',
					data: {
						
						id: idEnCours,

	 				}

			});

		 });


		 $(".clickTitreAdmin").click(function(){
		 	var ind = $(this).attr('value');
		 	console.log(ind);
		 	$("#title2").val(mesArticles[ind].tit);
		 	$("#text3").val( mesArticles[ind].tex);
		 })

		 $(".modif").click(function(){
		 	var titre = $("#title2").val();
			var texte = $("#text3").val();
		 	var modification = $(this).data('texte');
		
			$.ajax({

				url:'/Update',
				data: {
					task: 'update',
					_id: modification,
					value: JSON.stringify( {tit:titre,tex:texte}),
				}
	        });
		 });

};

$("#clearbutt").click(function(){
	$.ajax({
	url:'/Delete',
		data: {
			task: 'delete',
			key: 'dimblog'
		}
	});
});

