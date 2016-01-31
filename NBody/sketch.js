var sim ; 
var num_bodies = 4 ;

var balls = [] ;
var sliders = [] ; 
var sliders_m = [] ;  // for the masses

var y_init ; 
var y_init1 ; //temporary 
var rando = 100 ; 
var h = 0.0001;
var rate = 5000;
var G = 10000.; 
var masses = [20.,20.,1.,1.] ;
var masses_init = masses.slice(0) ; 
var start = false ;


function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255);
	// createCanvas(1200,700);
	var y_from1 = [width/2+200, 0.0, height/2, 0.0,
                   width/2 - 50, 0.0, height/2, -0.75*rando,
                   width/2 -250, 0.0, height/2, 0.6*rando,
                   width/2 -200, 0.0, height/2, rando*1.1];

    y_init = y_from1.slice(0);
    y_init1 = y_from1.slice(0); // this is a temporary variable, until I get sliders working 
    sim = new NBodySim(G,masses_init,y_from1) ; 
    var y_cur = sim.grab_y(); 
    console.log(y_cur.length);
    for (var j=0; j < num_bodies; j++){
    	var xy = sim.get_xy(j); 
    	var ball_j = new Ball(xy[0], xy[1], masses[j], masses[j]); 
    	ball_j.render();
    	// var ball_j = new Ball(xy[0], xy[1], 20,20);//masses[j], masses[j]); 
    	balls.push(ball_j);
    	// console.log(balls[j].x, balls[j].y);
    }
	// fill(255); 
	// rect(0,0,200,height);
	var counter = 1 ;
	for (var j=0; j < num_bodies; j++){
		var j1 = j + 1;
        var velx = "vel x " + j1; 
        var vely = "vel y " + j1;
        var mass_i = "mass " + j1;

        var slider_m = new Slider(width - 250,width - 250, counter * 50, 0., 200., 150, mass_i);
        var slider_vx = new Slider(75,50, counter*50,-rando, rando, 150, velx ) ;
        counter += 1;
        var slider_vy = new Slider(75,50, counter*50,-rando, rando, 150, vely ) ;
        counter += 1; 

        slider_m.setVal(masses[j]) ;
        slider_vx.setVal(y_cur[4*j + 1]);
        slider_vy.setVal(y_cur[4*j + 3]);

        slider_m.render();
        slider_vx.render();
        slider_vy.render();

        sliders_m.push(slider_m);
        sliders.push(slider_vx) ;
        sliders.push(slider_vy) ;        
    }
    // console.log("Done");   
    // console.log(sliders.length)
}

function draw() {

	// fill(255,150);
    // rect(0,0,width,height);
    background(255);
    for (var i = 0; i < num_bodies; i++){
        y_init[4*i + 1] = sliders[2*i].getVal();
        y_init[4*i + 3] = sliders[2*i+1].getVal();
        // console.log(y_init[4*i + 1]);
        var mass_i = sliders_m[i].getVal();
        masses[i] = mass_i; //sliders_m[i].getVal();
        balls[i].change_size(mass_i, mass_i); // new x and y size 
    }
    sim.update_masses(masses);
    var counter = 0 ;
    if (start == true){
        while (counter < rate) {
            sim.RungeKuttaStep(h); // ,masses_init);
            counter += 1;
        }
    }
    // console.log(sim.y);
    //println(sim.y);
    for (var j=0; j < num_bodies; j++){
        var xy = sim.get_xy(j);
        // console.log(xy);
        balls[j].change_xy(xy[0],xy[1]);
        balls[j].render();
    }
    // fill(255);
    // rect(0,0,200,height);
    for (var j=0; j < num_bodies; j++){
        sliders[2*j].render();
        sliders[2*j +1].render();
        sliders_m[j].render();
    }    
}

function keyTyped() {
	// console.log("Key Pressed");
	console.log(key);
	if (key === "r") {
		sim.reset_y(y_init) ; 
		start = false ;
	} else if (key === "s") {
		// console.log("pressed s");
		start = true ;
	}
	return false ;
}

function mousePressed() {
	if (start == false ){
		for (var i = 0; i < balls.length; i ++){
			var ball_i = balls[i] ; 
			if (ball_i.checkMouse()){
				console.log("Ball clicked!");
				ball_i.set_locked(true);
			}else{
				ball_i.set_locked(false);
			}
		}
	}
}

function mouseDragged(){
	for (var i=0; i < num_bodies; i++){
		var ball_i = balls[i] ;
		var sx = sliders[2*i];
        var sy = sliders[2*i +1];
        var mi = sliders_m[i];
		if (ball_i.get_locked() == true){
            ball_i.change_xy(mouseX, mouseY);
            var y_cur = sim.grab_y();
            y_cur[4*i] = mouseX;
            y_cur[4*i+2] = mouseY;
            sim.reset_y(y_cur);
        }
        else if (sx.checkMouse()){
            sx.setX(mouseX);
            sx.render();
        }
        else if (sy.checkMouse()){
            sy.setX(mouseX);
            sy.render();
        }
        else if (mi.checkMouse()){
            mi.setX(mouseX);
            //masses[i] = (double) mi.getVal();
            //println(masses[i]);
            mi.render();
        }
	}
}

function HelperFunctions () {

	this.add_arrays = function (array1, array2){

    	var final_array = [] ;
       	if (array1.length != array2.length){
        	console.log("Error: arrays not of equal length");
        	return final_array;
       	}
        for (var j=0; j < array1.length ; j++){
        	final_array.push(array1[j] + array2[j]); 
       	}
       	return final_array;
    }
    
    this.mult_array = function (array, factor){
    	for (var i=0; i < array.length; i++){
        	array[i] = factor*array[i]; 
      	}
      	return array;
    }
}

