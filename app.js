var blog=[];

$("#envoi").click(function(){
	var titre = $("#title").val();
	var texte = $("#text").val();

	var recup = {"tit":titre, "tex":texte};
	blog.push(recup);
	console.log(blog);


});

