const Hotel = require('../app/hotel');

let hotel;
let retries = 3

describe('Hotel', () => {
    beforeEach(() => {
        hotel = new Hotel('Klingon BnB');
    });

    describe('#save()', () => {
        it('should save without error', function(done) {
            this.retries(retries);
            hotel.save()
            .then(()=>{
              done();
            }
            )
        });
    });
});
