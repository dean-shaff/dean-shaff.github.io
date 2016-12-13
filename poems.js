var poems = [
	"The prestigious\nmoment is shining their\nfree attention to(o)",
	"A lot of probe(s) (were)\ndiagnosed with several\nthousand complete cheers",
	"conservatives will\nneed to live with the shadows\n(of an) activist",
	"challenges were there(:)\na candidate to destroy\nnuclear messages", 
	"migration between\ngovernment probe and Belgian\nfashion exercise", 
	"someone who failed\nto pilot their future bounces\nback before many",
	"photos(:) Pluto on\nthe horizon(,) Police(,) fire(,)\nSea(,) Liberia",
	"Francisco workers\nviewing the past two months\nas being set up",
	"Tuesday night he also\ntakes her temple after he was\ntop country support",
	"canopy is (just)\nthe same fish as the summit\nit suggests that their"
]

var re_newline = /\n/g; 

$(document).ready(function(){

	for (var i=0; i<poems.length; i++){
		$("#poems").append(function(){
			var ele = $("<p>{}</p>".format(poems[i].replace(re_newline, "<br>"))); 
			return ele
		});
	}
});