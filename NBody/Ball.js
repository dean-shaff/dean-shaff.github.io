function Ball(x, y, size_x, size_y) {
	this.x = x ;
	this.y = y ; 
	var size_x_min = 20;
    var size_y_min = 20;
    var factor = 4.0;

	this.constructor1 = function() {
		this.size_x = size_x_min;
		this.size_y = size_y_min;
	}

	this.constructor2 = function (size_x, size_y) {
		this.size_x = size_x/factor + size_x_min;
		this.size_y = size_y/factor + size_y_min;
	}

	if (size_x === undefined && size_y === undefined) {
		this.constructor1();
	} else {
		this.constructor2(size_x, size_y);
	}

	var locked = false;
    
   	this.checkMouse = function(){
        if (mouseX > this.x - this.size_x && mouseX < this.x + this.size_x && 
            mouseY > this.y - this.size_y && mouseY < this.y + this.size_y){
                return true;      
            }else{
                return false;
            }
    }

    this.set_locked = function(val){
        this.locked = val;   
    }
    
    this.get_locked = function(){
         return this.locked;   
    }
    
    this.render = function(){
        noStroke();
        fill(0);
        ellipse(this.x, this.y, this.size_x, this.size_y);
    }
    
    this.change_xy = function(x_new, y_new){
        this.x = x_new ;
        this.y = y_new ; 
    }
    
    this.change_size = function (size_new_x, size_new_y){
        //if (size_new_x < size_x_min){
        //    size_x = size_x_min;   
        //}
        //else if (size_new_y < size_y_min){
        //    size_y = size_y_min;   
        //}
        //size_x = (float) Math.sqrt(size_new_x);
        //size_y = (float) Math.sqrt(size_new_y);
        this.size_x = size_new_x/factor + size_x_min;
        this.size_y = size_new_y/factor + size_y_min;
    }
}