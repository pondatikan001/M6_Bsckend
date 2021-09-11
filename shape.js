function Shape(){
    this.X = 0;
    this.Y = 0;
}



Shape.prototype.move = (x,y) =>{
    this.X = x;
    this.Y = y;
    return X;
}

function Rectangle(){
    this.width  = 0;
    this.height = 0;

}




Rectangle.prototype = new Shape();
Rectangle.prototype.__proto__ = Shape.prototype;

Rectangle.prototype.area = function() {
    return this.width * this.height;
}


function Circle(){
    this.radius = 0;
}

Circle.prototype = new Shape();
Circle.prototype.__proto__ = Shape.prototype;

Circle.prototype.area = function(){
    return 3.14 * this.radius * this.radius;
}

module.exports = {}
exports.Shape = () =>{
    return new Shape();
}
