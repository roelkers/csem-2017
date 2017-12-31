const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const should = chai.should();
const double = require('../app/double');

describe('Promises', () => {
    describe('#double()', () => {
        it('chaining double(1) with double should eventually return a result of 4', () => {
            // TODO
        });
    });
});
