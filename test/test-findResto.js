/*
 * (c) William Belle, 2019.
 * See the LICENSE file for more details.
 */

const should = require('chai').should();
const rewire = require('rewire');

const epflMenuApi = require('../src/index.js');

describe('epfl-menu-api findResto', function () {
  this.timeout(10000);

  it('should contains at least 5 restos', function () {
    return epflMenuApi.findResto().then((restos) => {
      const enoughRestos = Object.keys(restos).length > 4;
      enoughRestos.should.equal(true);
    });
  });

  it('should find resto id 22', function () {
    return epflMenuApi.findResto(22).then((restos) => {
      restos[0].restoName.should.equal('Le Corbusier');
      restos[0].plan.should.equal('SG0166');
    });
  });

  it('should fail with a wrong service url', (done) => {
    const epflMenuApiMock = rewire('../src/index.js');
    epflMenuApiMock.__set__('RESTOS_URL', 'foobar');
    const result = epflMenuApiMock.findResto();
    result.then((response) => {
      should.fail();
      done();
    }).catch((reason) => done());
  });
});
