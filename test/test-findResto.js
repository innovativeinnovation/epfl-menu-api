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
      var enoughRestos = Object.keys(restos).length > 4;
      enoughRestos.should.equal(true);
    });
  });

  it('should fail with a wrong service url', (done) => {
    let epflMenuApiMock = rewire('../src/index.js');
    epflMenuApiMock.__set__('RESTOS_URL', 'foobar');
    let result = epflMenuApiMock.findResto();
    result.then((response) => {
      should.fail();
      done();
    }).catch((reason) => done());
  });
});
