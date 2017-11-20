/*
 * Implement a Polygon class with the following properties:
 * 1. A constructor that takes an array of integer side lengths.
 * 2. A 'perimeter' method that returns the sum of the Polygon's side lengths.
 */
 class Polygon {

    constructor(sides){
        this.sidelengths = sides;
        //console.log(sides);
    }
    perimeter() {
        var sum = 0;
        for(var i =0; i< this.sidelengths.length; i++){
            sum += this.sidelengths[i];
        }
        return sum;
    }
}
