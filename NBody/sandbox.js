

var v1 ; 

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255);
	v1 = new Vector(100, 100, 50, 40); 
	console.log("vector created")
	v1.render() ;

}

function draw() { 
	background(255);
	v1.render() ;
}

function mouseClicked() { 
	if (v1.checkMouse()) {
		console.log("Vector clicked!");
		v1.set_locked(true);
	}else{
		v1.set_locked(false);
	}
}

function mouseDragged() {
	console.log(v1.get_locked());
	if (v1.get_locked()) { 
		v1.setLen(mouseX - v1.x, mouseY - v1.y) ;
	}
}