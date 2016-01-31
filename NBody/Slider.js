function Slider (x_pos,x_p_i,y_pos, val_low, val_high, size_x, name) {
    // this.x_pos = x_p;
    this.x_pos_init = x_pos ;
  	this.y_pos = y_pos; 
  	this.val_low = val_low ; 
  	this.val_high = val_high;
  	this.size_x = size_x ;
  	this.name = name ;
  	

  	var el_size = 30 ; // the size of the ellipse.
    var padding_x = 20; // for the text spacing 
    var curVal ;
    
    this.checkMouse = function(){
       if (mouseX > x_pos - el_size && mouseX < x_pos + el_size 
           && mouseY > this.y_pos - el_size && mouseY < this.y_pos + el_size){
               return true;
           }else{
               return false ; 
           }
    }

    this.getVal = function(){
        // console.log(this.x_pos, this.x_pos_init, this.x_pos_init+this.size_x, this.val_low, this.val_high);
        curVal = map(x_pos, this.x_pos_init, this.x_pos_init+this.size_x, this.val_low, this.val_high);
        // console.log(curVal);
        return curVal ;
    } 

    this.render = function() {
        // console.log(this.x_pos, this.x_pos_init);
       fill(0);
       text(name, this.x_pos_init-(size_x/2.5), y_pos, this.x_pos_init);
       text(this.getVal(),this.x_pos_init+this.size_x+padding_x, this.y_pos); 
       strokeWeight(2);
       stroke(0);
       line(this.x_pos_init, this.y_pos, this.x_pos_init+this.size_x, this.y_pos);
       fill(255);
       ellipse(x_pos, this.y_pos,el_size,el_size);  
       noStroke();
       
    }
    this.setX = function(x){
        if (x > this.x_pos_init + this.size_x){
            x_pos = this.x_pos_init + this.size_x;
        }
        else if (x < this.x_pos_init){
            x_pos = this.x_pos_init;
        }
        else{
            x_pos = x;
        }
        //render();
    }

    this.setVal = function(val){
       if (val > this.val_high){
           curVal = this.val_high; 
       }
       else if (val < val_low){
           curVal = this.val_low;
       }
       else{
           curVal = val;
       }
       x_pos = map(curVal,this.val_low, this.val_high, this.x_pos_init, this.x_pos_init+this.size_x);   
       // this.render();
    }
}