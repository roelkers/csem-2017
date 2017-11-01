class MarsFlight{
  constructor(outbounddate, speed) {
    this.speed = speed || 1; // default speed is 1
    this.outbounddate = outbounddate || 'February 19, 2017'; // the departure date
    this.originplace = 'Earth'; // the departure location
    this.destinationplace = 'Mars'; // the destination location
  }
  duration(){
    return (63070000000 / this.speed);
  }
  durationInDays() {
    return Math.round(this.duration() / (1000 * 60 * 60 * 24));
  };
  getInboundDate() {
    return new Date(Date.parse(this.outbounddate) + this.duration());
  };
};

class FastMarsFlight extends MarsFlight{
  constructor(outbounddate) {
    // Call the parent constructor
    // Fast flights with 3X normal speed
    super(outbounddate, 3);
  }
};

var plannedDeparture = 'February 20, 2017';
var marsFlight = new MarsFlight(plannedDeparture);
var fastMarsFlight = new FastMarsFlight(plannedDeparture);

console.log('The RyanAir Mars flight will take ca. ' + marsFlight.durationInDays() + ' days (ETA: ' + marsFlight.getInboundDate() + ').');

console.log('Maybe we should upgrade to Elon Emirates and fly there in ' + fastMarsFlight.durationInDays() + ' days.');
