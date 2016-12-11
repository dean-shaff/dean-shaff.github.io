
var lorentz = new LorentzAttractor() ; 

$("#dean-button").click(function(e){
	lorentz.pause();
	if ($(this).text() == "Pause"){
		$(this).html("Run");
	}else if ($(this).text() == "Run") {
		$(this).html("Pause");
	}	
});

$("#zoom-in").click(function(){
	lorentz.zoomIn();
	// console.log("zoomed in!")
});

$("#zoom-out").click(function(){
	lorentz.zoomOut();
// console.log("zoomed out!")
});

$("#reset").click(function(){
	lorentz.resetY();
// console.log("zoomed out!")
});

$('#slider-beta').slider().on('slide', function(ev){
	lorentz.adjustBeta(ev.value) ;
	$("#betaVal").text(ev.value.toFixed(2)) ;  
});

$('#slider-sigma').slider().on('slide', function(ev){
	lorentz.adjustSigma(ev.value) ;
	$("#sigmaVal").text(ev.value.toFixed(2)) ; 
});

$('#slider-rho').slider().on('slide', function(ev){
	lorentz.adjustRho(ev.value) ; 
	$("#rhoVal").text(ev.value.toFixed(2)) ;
});
$('#slider-alpha').slider().on('slide', function(ev){
	lorentz.adjustAlpha(ev.value) ; 
	$("#alphaVal").text(ev.value.toFixed(2)) ;
});
$('#slider-gamma').slider().on('slide', function(ev){
	lorentz.adjustGamma(ev.value) ; 
	$("#gammaVal").text(ev.value.toFixed(2)) ;
});


