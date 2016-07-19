function Vector(x,y,x_len,y_len) {

	this.x = x ;
	this.y = y ;
	this.x_len = x_len ; 
	this.y_len = y_len ; 
	var t1 ; 
	var t2 ; 
	var t3 ; 
	var locked = false ; 

	this.set_locked = function(val){
		this.locked = val ;
	}

	this.get_locked = function(val){
		return this.locked ;
	}

	this.calc_arrow = function() {
		/*
		Calculate the position of the points on the triangle
		*/

		var endx = this.x + this.x_len ;
		var endy = this.y + this.y_len ; 
		var theta = this.angle() ;
		theta = theta - ( Math.PI) / 2. ;
		if (endx < this.x){
			theta = theta + Math.PI; // to keep the sucker from flipping. 
			// arctan only goes from -pi/2 to pi/2
		}
		// console.log(theta);
		var magnitude = this.mag() ; 
		var pt1 = this.rotate(-0.08*magnitude, 0, theta) ; 
		var pt2 = this.rotate(0.08*magnitude, 0, theta) ; 
		var pt3 = this.rotate(0, 0.15*magnitude, theta) ;

		this.t1 = [endx + pt1[0], endy + pt1[1]] ;
		this.t2 = [endx + pt2[0], endy + pt2[1]] ;
		this.t3 = [endx + pt3[0], endy + pt3[1]] ;
	}

	this.render = function(){
		/*
		Draw an arrow that corresponds to the vector
		*/
		var magnitude = this.mag(); 
		stroke(0);
		strokeWeight(0.07*magnitude);
		// strokeWeight(5);
		fill(0);
		var endx = this.x + this.x_len ;
		var endy = this.y + this.y_len ; 

		this.calc_arrow();

		// console.log(t1, t2, t3);
		// console.log(this.mag());
		triangle(this.t1[0], this.t1[1], this.t2[0], this.t2[1], this.t3[0], this.t3[1]);
		
		line(this.x,this.y,endx, endy); 
		noStroke();
	}

	this.rotate = function(x,y,theta){
		/*
		Rotate a line (x,y) by angle theta
		*/
		var rotated = new Array(2);
		var x_new = Math.cos(theta)*x - Math.sin(theta)*y ; 
		var y_new = Math.sin(theta)*x + Math.cos(theta)*y ; 
		rotated[0] = x_new;
		rotated[1] = y_new ; 
		return rotated;  
	}

	this.angle = function() {

		return Math.atan(this.y_len / this.x_len) ; 

	}

	this.mag = function() {
		/*
		Return the magnitude of the vector 
		*/
		return Math.pow(Math.pow(this.x_len,2.) + Math.pow(this.y_len,2.),0.5)
	}

	this.change_xy = function(x_new, y_new){
		/*
		Set the position of the vector 
		*/
		this.x = x_new ; 
		this.y = y_new ; 
	}

	this.change_len = function(x_len_new, y_len_new) {
		/*
		Set the x and y length components of the vector 
		*/
		this.x_len = x_len_new ; 
		this.y_len = y_len_new ; 
	}

	this.get_len = function(){

		return [this.x_len, this.y_len];
	}

	this.checkMouse = function() { 

		var xs = [this.t1[0], this.t2[0], this.t3[0]] ; 
		var ys = [this.t1[1], this.t2[1], this.t3[1]] ;

		var minx = Math.min.apply(null, xs) ; 
		var miny = Math.min.apply(null, ys) ;  
		var maxx = Math.max.apply(null, xs) ; 
		var maxy = Math.max.apply(null, ys) ;  

		// console.log(minx, miny, maxx, maxy) ;
		if (mouseX > minx && mouseX < maxx &&
			mouseY > miny && mouseY < maxy) {
			return true ;
		}else{
			return false; 
		}


	}

	this.calc_arrow() ; 

 }