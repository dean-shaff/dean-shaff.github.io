
var nb = new NBodyDOM() ; 

$("#start-button").click(function(e){
	nb.start();
});

$("#reset-button").click(function(e){
	nb.restart();
});
