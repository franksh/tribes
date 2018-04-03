

function ClickSignal () {
  Phaser.Signal.call(this);

  // this.add(this.myCallback, this);

}

ClickSignal.prototype = Object.create(Phaser.Signal.prototype);
ClickSignal.prototype.constructor = Phaser.Signal;

ClickSignal.prototype.myCallback = function() {
  console.log("test");
}

/*
On Mouse click
*/
ClickSignal.prototype.clicked = function(pointer, eventcontext) {
  console.log("clicked general");
  console.log(pointer);
  console.log(eventcontext);
}

ClickSignal.prototype.clickedUnit = function(unit, pointer) {
  console.log("clicked unit");
  console.log(unit);
  console.log(pointer);
}
