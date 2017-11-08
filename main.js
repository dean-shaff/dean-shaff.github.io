// main.js
// Just for formatting the main page.

var hrefs = [
		"./NBody/NBody.html",
		"./LorentzAttractor/LorentzAttractor.html",
		"https://planet-tracker.herokuapp.com/",
		"https://github.com/dean-shaff",
		"./dean_shaff_cv.pdf",
		"https://dean-shaff.github.io/blog/",
		"./poems.html",
		"https://ephem-api.herokuapp.com/"
];

var buttonText = [
	"NBodySimulator",
	"LorentzAttractor",
	"Planet Tracker",
	"GitHub",
	"CV",
	"Blog",
	"Poems",
	"Ephemerides API"
];

$(document).ready(function(){
	for (var i=0; i<hrefs.length; i++){
		$('#button-list').append(function(){
			// var ele = $("<div class='row'> <div class='three columns'> \
			// 	<a href='{}' class='button  u-full-width'>{}</a> \
			// 	</div></div>".format(hrefs[i], buttonText[i]));
			// var ele = $("<a href='{}' class='button no-border'>{}</a>".format(hrefs[i], buttonText[i]));
			var ele = $("<a class='no-format pad' href='{}'>{} </a>".format(hrefs[i], buttonText[i]));
			return ele;
		});
	}
});
