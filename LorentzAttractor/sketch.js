var sol_vec = [] ;  
var help = new HelperFunctions() ; 
var y; 
var ym1 ; 
var sigma = 10.0; var sigma_init = 10.0 ; 
var rho = 28.0 ; var rho_init = 28.0 ; 
var beta = 8.0/3.0 ; var beta_init = 8.0/3.0; 
var h = 0.007; 
var factor = 0.11 ; 
var upto = 700 ; 
var tranX ; 
var tranY ; 
var pause = false;
var rotate = true ;
var mY = 0 ; 
var mX = 0 ; 
var CoM ; 
var CoM_rotate ; 
var delayCoM = 500 ;
var counter = 0 ;
var y_init = [0.1, 0.1, 0.0] ; 

function setup() {
	createCanvas(windowWidth, windowHeight);//,WEBGL) ; 
	tranX = width / 2;
	tranY = height / 2; 
	console.log(sigma, rho, beta) ;
	colorMode(HSB,100)
	tranX = width/2;
	tranY = height/2 ; 
	y = createVector(y_init[0],y_init[1],y_init[2]);
	ym1 = createVector(0,0,0);
	for (var i=0; i < 3; i ++){
   		y = RungeKuttaStep(h,y) ; 
   		console.log(y);
   		var y_temp = createVector(y.x,y.y,y.z) ; 
   		sol_vec.push(y_temp) ; 
 	}
	CoM = calcCenterOfMass(sol_vec);	
	var angleX = map(mY, 0, width, 0,2*PI);
	var angleY = map(mX, 0, height,0,2*PI);
	CoM_rotate = help.rotateY(help.rotateX(CoM, angleX),angleY)
 	// console.log(sol_vec[sol_vec.length - 1]) ;
 	// console.log(sol_vec[sol_vec.length - 2]) ;
 	background(100);
}

function draw() {
	// background(0) ; 
	if (! pause){
		ym1 = sol_vec[sol_vec.length - 1] ; 
		y = RungeKuttaStep(h, y) ; 
		var y_temp = createVector(y.x, y.y, y.z);
		sol_vec.push(y_temp) ; 
		if (sol_vec.length > upto){
			sol_vec.splice(i, 1); 
		}
		// var c_z = map(y_temp.z, -10, 40, 50, 90);
		// console.log(c_z, y_temp.z) ;
		// console.log(c_z) ; 
		// stroke(c_z, 100,100) ; 
		// console.log(ym1.x/factor, ym1.y/factor, y.x/factor, y.y/factor);
		strokeWeight(1);
		background(0,0,0);
		push() ; 
		CoM = calcCenterOfMass(sol_vec);	
		var angleX = map(mY, 0, width, 0,2*PI);
		var angleY = map(mX, 0, height,0,2*PI);
		CoM_rotate = help.rotateY(help.rotateX(CoM, angleX),angleY)
		// if (counter == delayCoM){
		// 	CoM = calcCenterOfMass(sol_vec);	
		// 	var angleX = map(mY, 0, width, 0,2*PI);
		// 	var angleY = map(mX, 0, height,0,2*PI);
		// 	CoM_rotate = help.rotateY(help.rotateX(CoM, angleX),angleY)
		// } else if (counter > delayCoM){
		// 	counter = 0 ; 
		// }
		// translate(tranX+(CoM.x/factor), tranY + (CoM.y/factor)) ; 
		translate(tranX, tranY) ; 
			for (var i = 1; i < sol_vec.length; i++){
				var temp = sol_vec[i] ;
				var tempm1 = sol_vec[i-1]; 
				var temp1 = help.rotateY(help.rotateX(temp,angleX),angleY);
				var tempm11 = help.rotateY(help.rotateX(tempm1,angleX),angleY);

				//sol_vec.set(i, temp1);

				var c_z = map(temp1.z,-20,40, 60,90);

				stroke(c_z,100,100);
				line((temp1.x - CoM_rotate.x)/factor, (temp1.y - CoM_rotate.y)/factor, (tempm11.x - CoM_rotate.x)/factor, (tempm11.y - CoM_rotate.y)/factor);
				// line((temp1.x)/factor, (temp1.y)/factor, (tempm11.x)/factor, (tempm11.y)/factor);
					// line(ym1.x/factor, ym1.y/factor, y.x/factor, y.y/factor) ; 
			}
		
		
		pop(); 
		counter += 1; 
		// console.log(ym1)
		// console.log(y)
	}
}

function calcCenterOfMass(vector){
	//assume vector is an array of processing Pvectors 
	var mean_x = 0.0 ;
	var mean_y = 0.0 ;
	var mean_z = 0.0 ; 
	for (var i =0; i<vector.length; i++){
		mean_x += vector[i].x;
		mean_y += vector[i].y; 
		mean_z += vector[i].z; 
	}
	var CoM =  createVector(mean_x/vector.length , mean_y/vector.length, mean_z/vector.length);
	return CoM ;
}

function f(y_n){
	//working 
	var x = sigma*(y_n.y - y_n.x);
	var y = y_n.x*(rho - y_n.z) - y_n.y;
  	var z = y_n.x*y_n.y - beta*y_n.z ;
  	var f = createVector(x,y,z);
  	return f ;
}

function RungeKuttaStep(h, y_n) {
	//working 
	var k1 = f(y_n);
	var k2 = f(y_n.add(k1.mult(h/2)));
	var k3 = f(y_n.add(k2.mult(h/2)));
	var k4 = f(y_n.add(k3.mult(h)));
	var y_np1 = y_n.add((k1.add((k2.mult(2))).add((k3.mult(2))).add(k4)).mult(h/6.));
	
	// console.log(y_np1); 
	return y_np1 ;

}
function keyTyped(){
	if (key == 'p'){
		pause = ! pause; 
	}
}

function mouseDragged(){
	mX = mouseX - tranX; 
	mY = mouseY - tranY; 
}

// $("#dean-button").click(function(){
// 	console.log("Button clicked!")
// 	pause = ! pause ;		
// });
function LorentzAttractor() {

	this.pause = function(){
		console.log("function called!");
		pause = !pause;
	}

	this.zoomIn = function(){
		factor -= 0.02 ; 
	}

	this.zoomOut = function() {
		factor += 0.02 ; 
	}
	this.adjustRho = function(rho_new) {
		rho = rho_new ; 
	}
	this.adjustSigma = function(sigma_new) {
		sigma = sigma_new ; 
	}
	this.adjustBeta = function(beta_new) {
		beta = beta_new ; 
	}
	this.resetY = function() {
		y = createVector(y_init[0],y_init[1],y_init[2]);
		sol_vec = [] ; 
		for (var i=0; i < 3; i ++){
	   		y = RungeKuttaStep(h,y) ; 
	   		console.log(y);
	   		var y_temp = createVector(y.x,y.y,y.z) ; 
	   		sol_vec.push(y_temp) ; 
 		}	
 		rho = rho_init;
 		beta = beta_init;
 		sigma = sigma_init ;
	}
}





