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