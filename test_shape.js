var Shape = require('./shape');
var cir = Shape.createCircle();

cir.radius = 4;
console.log(cir.area());

var rect = Shape.createRectangle();
rect.width = 3;
rect.height = 10;
console.log(rect.area());