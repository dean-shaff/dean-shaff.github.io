
var lorentz = new LorentzAttractor() ; 

$("#dean-button").click(function(e){
	// console.log(e) ;
	// console.log(this) ; 
	// var lorentz = new LorentzAttractor() ;
	lorentz.pause();
	if ($(this).text() == "Pause"){
		$(this).html("Run");
	}else if ($(this).text() == "Run") {
		$(this).html("Pause");
	}
	
	// pause = !pause ;
	// console.log("Button clicked!")
	// pause = ! pause ;		
});

$("#zoom-in").click(function(){
	lorentz.zoomIn();
	// console.log("zoomed in!")
});

$("#zoom-out").click(function(){
	lorentz.zoomOut();

	// console.log("zoomed out!")
});