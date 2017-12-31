const Hotel = require('../app/hotel');

let hotel;

describe('Hotel', () => {
    beforeEach(() => {
        hotel = new Hotel('Klingon BnB');
    });

    describe('#save()', () => {
        it('should save without error', done => {
            // TODO
        });
    });
});
