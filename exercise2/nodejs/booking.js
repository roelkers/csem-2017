const events = require('events');

let em = new events.EventEmitter();
let bookings = [];

function performBooking(newBooking) {
  bookings.push(newBooking);
}

// TODO: Attach an event handler (callback)
// that listens for 'booking' events.
em.on("booking",(input)=>performBooking(input));

// standard input and output streams also
// use events
process.stdin.on('readable', () => {
  let input = process.stdin.read();
  if (input !== null) {
    let tInput = input.toString().trim();

    if (tInput === 'show') {
      console.log('Bookings: [',bookings.join(','),']');
    } else if (tInput === 'exit') {
      process.exit(0);
    } else {
      em.emit('booking',input);
    }
  }
});
