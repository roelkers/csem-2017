const chai = require('chai');
const assert = chai.assert;

let array;

describe('Array Methods', () => {
    beforeEach(() => {
        array = [0, 1, 4, 9];
    });

    describe('#reduce()', () => {
        it('should return sum of array items', () => {
            let result = array.reduce((a, b) => a + b, 0);
            assert.equal(result, 14);
        });
    });

    describe('#map()', () => {
        it('should return an array with square-rooted values', () => {
            let result = array.map(Math.sqrt);
            assert.equal(result, [0, 1, 2, 3]);
        });
    });
});
