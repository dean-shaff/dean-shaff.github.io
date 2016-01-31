
var mouse ; 
var mouse_abs ; 
var e ; 
var factor = 10000;
var min = 0.2; 
var max = 13.0 ; 
var minc = 10;
var maxc = 50; 
var noiseFactor = 10;
var dragFactor = 0.5; 

var increX = 40; 
var increY = 40; 

var gridX ; 
var gridY ; 

// var grid = [] ; 
function setup() {

	createCanvas(windowWidth,windowHeight);
	mouse = [mouseX, mouseY];
	mouse_abs = [mouseX, mouseY] ; 
	e = new PointCharge(width/2,height/2);

	strokeWeight(3);
	colorMode(HSB,100);
	gridX = Math.floor(width/increX) ; // size of the grid in X
	gridY = Math.floor(height/increY) ; // size of the grid in Y 
	console.log(gridX, gridY); 

}

function draw() {
	noStroke();
	fill(0,0,100,10);
	rect(0,0,width,height);
	textSize(36);
	fill(0,0,0) ;
	textAlign(CENTER, CENTER) ; 
	// text("Dean's Website!", width/2, height/2) ; 
	
	var mouse_prev = mouse ;
	var mouse_prev_abs = mouse_abs ; 
	var noiseX = noiseFactor*Math.ceil(4*Math.random() -2) ; 
	var noiseY = noiseFactor*Math.ceil(4*Math.random() -2) ;
	// console.log(noiseX, noiseY) 
	// e.renderCharge() ;
	var mag = factor*e.calcVec(mouseX, mouseY) ;
	// console.log(mag);
	var c = map(mag, 0, 100, minc, maxc);
	c = constrain(c, minc,maxc);
	// console.log(c);
	
	stroke(c,100,100);
	var diffX = mouseX - mouse_prev_abs[0] ; 
	var diffY = mouseY - mouse_prev_abs[1] ; 
	var speed = Math.sqrt(Math.pow(diffX,2) + Math.pow(diffY,2)) ; 
	// console.log(speed);
	var mouseX_next = mouse_prev[0] + diffX*dragFactor ; 
	var mouseY_next = mouse_prev[1] + diffY*dragFactor ; 
	// mouse = calcClosestGridPoint(mouseX, mouseY) ;
	if (speed <= 2){
		var chooseX = Math.random() ; 
		var chooseY = Math.random() ; 

		if (chooseX > 0.5 && chooseY < 0.5){
			mouse = [Math.ceil((mouseX + noiseX)/gridX)*gridX , Math.floor((mouseY + noiseY)/gridY)*gridY] ;
		} else if (chooseX < 0.5 && chooseY < 0.5){
			mouse = [Math.floor((mouseX + noiseX)/gridX)*gridX , Math.floor((mouseY + noiseY)/gridY)*gridY] ;
		} else if (chooseX < 0.5 && chooseY > 0.5){
			mouse = [Math.floor((mouseX + noiseX)/gridX)*gridX , Math.ceil((mouseY + noiseY)/gridY)*gridY] ;
		}else if (chooseX > 0.5 && chooseY > 0.5){
			mouse = [Math.ceil((mouseX + noiseX)/gridX)*gridX , Math.ceil((mouseY + noiseY)/gridY)*gridY] ;
		}
	}
	else{
		mouse = [Math.floor((mouseX + noiseX)/gridX)*gridX , Math.floor((mouseY + noiseY)/gridY)*gridY] ;
	}
	mouse_abs = [mouseX, mouseY] ; 
	// console.log(mouse) ; 
	// line(mouse_prev[0],mouse_prev[1],mouseX_next,mouseY_next) ; 
	line(mouse_prev[0],mouse_prev[1],mouse[0],mouse[1]) ; 

}


function PointCharge (xPos, yPos) {
	this.xPos = xPos ;
	this.yPos = yPos ;

	this.calcVec = function(x ,y){

		var diffX = x - this.xPos ;
		var diffY = y - this.yPos ; 
		var r = Math.sqrt(Math.pow(diffX,2) + Math.pow(diffY,2));
		var mag = pow(r,-1)
		var x_r = diffX * mag ; // in case I want this later 
		var y_r = diffY * mag ; // ^^
		return mag ; 
	};

	this.renderCharge = function(){
		stroke(0,0,0);
		ellipse(this.xPos,this.yPos,50,50);
	};
}