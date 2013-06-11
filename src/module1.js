/* global Gruntdemo */
Gruntdemo.Module  = function(x, y) {
   this.init(x, y);
};

Gruntdemo.Module.prototype.init = function(x, y) {
  this.x = x;
  this.y = y;
};

Gruntdemo.Module.someFunction = function(c) {
  return this.x + this.y + c;
};

