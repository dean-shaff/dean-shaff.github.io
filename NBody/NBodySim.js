function NBodySim (G, mass_array, y_init) {
	//There is something going on here where I can't 
	this.masses = mass_array.slice(0);
	// console.log(masses) ; 
	this.G = G ; 
	this.y_init = y_init.slice(0); ; 
	// console.log(this.y_init);
	this.numBodies = mass_array.length ; 
	this.y = y_init.slice(0) ;  // need the 0 to slice properly
	// console.log(this.y.length);
    var helper = new HelperFunctions();

    this.RungeKuttaStep = function(h){
    	// console.log(this.y);
        var k1 = this.y_prime(this.y);
        var k2 = this.y_prime(helper.add_arrays(this.y,helper.mult_array(k1,h/2)));
        var k3 = this.y_prime(helper.add_arrays(this.y,helper.mult_array(k2,h/2)));
        var k4 = this.y_prime(helper.add_arrays(this.y,helper.mult_array(k3,h)));
        for (var i=0; i < this.y.length; i++){
          this.y[i] = this.y[i] + h/6*(k1[i] + 2*k2[i] + 2*k3[i] + k4[i]) ; 
        }
    }
    
    this.squared_part = function (body1, body2, y_cur){
        /*
        body1 is the number of the first body
        body2 is the number of the second body 
        should be zero indexed. 
        */

        var x1 = y_cur[body1*4];  
        var x2 = y_cur[body2*4]; 
       	var y1 = y_cur[body1*4 + 2];
        var y2 = y_cur[body2*4 + 2]; 
        var squared_part_ = Math.pow((Math.pow((x1-x2),2.) + Math.pow((y1-y2),2.)),1.5);
        return squared_part_ ; 
    }
    
    
    this.y_prime = function (y_){
    	// console.log(masses);
    	// console.log(this.masses);
    	// delay(1000);
       var y_prime_ = new Array(4*this.numBodies) ; 
       for (var i=0; i < this.numBodies; i++){
               var y_prime_val_x = 0.0 ;
               var y_prime_val_y = 0.0 ; 
               for (var j=0; j < this.numBodies; j++){
                   if (j != i) {
                       var squared_part = this.squared_part(i,j,y_);
                       // console.log(this.G, this.masses[j], y_[4*i], y_[4*j]);
                       y_prime_val_x = y_prime_val_x - this.G*this.masses[j]*(y_[4*i] - y_[4*j])/squared_part ; 
                       y_prime_val_y = y_prime_val_y - this.G*this.masses[j]*(y_[4*i+2] - y_[4*j+2])/squared_part ; 
                       // console.log(y_prime_val_x, y_prime_val_y);
                       // delay(1000);

                   }
               y_prime_[4*i] = y_[4*i+1]; // new x velocity value
               y_prime_[4*i+2] = y_[4*i+3]; // new y velocity value 
               y_prime_[4*i+1] = y_prime_val_x; // the new x value 
               y_prime_[4*i+3] = y_prime_val_y; // the new y value
               }            
            }
        // console.log(y_prime_);
        return y_prime_;

    }
    
    this.get_xy = function(body){
    	//Body is the body we're talking about 
        var xy = [0.0,0.0];
        xy[0] = this.y[4*body];
        xy[1] = this.y[4*body + 2];
        return xy;
    }
    
    this.get_vel = function(body) {
        var vel = [0.0, 0.0] ;
        vel[0] = this.y[4*body + 1] ; 
        vel[1] = this.y[4*body + 3] ;
        return vel ;
    }

    this.reset_y = function(y_new){
        this.y = y_new.slice(0);
        console.log(this.y);
        console.log(this.masses);
        // for (var i=0; i < this.y.length; i++){
            // this.y[i] = y_new[i];
        // }

    }
    
    this.update_masses = function(masses_new){
        this.masses = masses_new.slice(0);
        // for (var i=0; i<this.numBodies;i++){
        //     this.masses[i] = masses_new[i];    
        // }   
    }
    this.grab_y = function(){
        return this.y;       
    }
}


function delay(time) {
	var tCur = millis() ; // current time 
	while (millis() - tCur < time){

	}
}; 