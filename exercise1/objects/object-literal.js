// Object constructor style object creation

function Cat(){
  this.meow = 'meowww';
}

Cat.prototype.speak = function(){
  return this.meow;
}

function loudCat(loud){
  Cat.call(this);
  this.loud = loud;
}

loudCat.prototype = Object.create(Cat.prototype);
loudCat.prototype.constructor = loudCat;

loudCat.prototype.shout = function(){
  return this.meow.toUpperCase() + '!!';
}

loudCat.prototype.speak = function () {
  if (this.loud) {
    return this.shout();
  } else {
    return this.meow;
  }
};

myLoudCat = new loudCat(true);

console.log(myLoudCat.speak());
myLoudCat.loud = false;
console.log(myLoudCat.speak());
