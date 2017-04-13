var blog=[];

$("#envoi").click(function(){
	var titre = $("#title").val();
	var texte = $("#text").val();

	var recup = {"tit":titre, "tex":texte};
	blog.push(recup);
	console.log(blog);

	var app={name:"dim"};
	
	$.ajax({
		url: 'http://192.168.1.50/json-db',
		data : {
			task : 'set',
			key : 'dimblog',
			value :  JSON.stringify(blog),
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
			console.log(data);

			}
		});
