var sol_vec = [] ;  
var help = new HelperFunctions() ; 
var y; 
var ym1 ; 
var sigma = 10.0; 
var rho = 28.0 ; 
var beta = 8.0/3.0 ; 
var h = 0.007; 
var factor = 0.11 ; 
var upto = 700 ; 
var tranX ; 
var tranY ; 
var pause = false;
var rotate = true ;
var mY = 0 ; 
var mX = 0 ; 


function setup() {
	createCanvas(windowWidth, windowHeight);//,WEBGL) ; 
	tranX = width / 2;
	tranY = height / 2; 
	console.log(sigma, rho, beta) ;
	colorMode(HSB,100)
	tranX = width/2;
	tranY = height/2 ; 
	y = createVector(0.1,0.1,0.0);
	ym1 = createVector(0,0,0);
	for (var i=0; i < 3; i ++){
   		y = RungeKuttaStep(h,y) ; 
   		console.log(y);
   		var y_temp = createVector(y.x,y.y,y.z) ; 
   		sol_vec.push(y_temp) ; 
 	}
 
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
		 
		translate(tranX, tranY) ; 
			for (var i = 1; i < sol_vec.length; i++){
				var angleX = map(mY, 0, width, 0,2*PI);
				var angleY = map(mX, 0, height,0,2*PI);
				var temp = sol_vec[i] ;
				var tempm1 = sol_vec[i-1]; 
				var temp1 = help.rotateY(help.rotateX(temp,angleX),angleY);
				var tempm11 = help.rotateY(help.rotateX(tempm1,angleX),angleY);
				//sol_vec.set(i, temp1);

				var c_z = map(temp1.z,-20,40, 60,90);

				stroke(c_z,100,100);
				line(temp1.x/factor, temp1.y/factor, tempm11.x/factor, tempm11.y/factor);
					// line(ym1.x/factor, ym1.y/factor, y.x/factor, y.y/factor) ; 
			}
		
		
		pop(); 
		
		// console.log(ym1)
		// console.log(y)
	}
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


function HelperFunctions() {

	this.rotateX = function(array, angle){
		var x = array.x; var y = array.y; var z = array.z ; 
		var x_new = x ; 
		var y_new  = cos(angle)*y + sin(angle)*z ; 
		var z_new  = -sin(angle)*y + cos(angle)*z ; 
		var fin = createVector(x_new,y_new,z_new); 
		return fin ;
    }
    
    this.rotateY = function(array, angle){
		var x = array.x; var y = array.y; var z = array.z ;  
		var x_new = cos(angle)*x - sin(angle)*z ; 
		var y_new = y ; 
		var z_new = sin(angle)*x + cos(angle)*z ; 
		var fin = createVector(x_new,y_new,z_new); 
		return fin ;
    }
    
    this.rotateZ = function(array, angle){
		var x = array.x; var y = array.y; var z = array.z ; 
		var x_new = cos(angle)*x + sin(angle)*y  ; 
		var y_new = cos(angle)*y - sin(angle)*x ; 
		var z_new = y ; 
		var fin = createVector(x_new,y_new,z_new); 
		return fin ;
    }

}




