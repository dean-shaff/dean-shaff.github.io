var mp3name = "girlfriend_in_a_coma.mp3";
var audio = new Audio(mp3name);
var filereader = new FileReader ; 

$("#start-button").click(function(e){
	if ($(this).text() == "Play audio!"){
		audio.play();
		$(this).html("Pause audio!"); 
	}else {
		audio.pause();
		$(this).html("Play audio!");
	}
})

$("#array-loader").click(function(e){

	filereader.onload = function(e) {
		var text = reader.result ; 
	}

	filereader.readAsArrayBuffer(audio);

})