/*
 * (c) William Belle, 2019.
 * See the LICENSE file for more details.
 */

const should = require('chai').should();
const rewire = require('rewire');

const epflMenuApi = require('../src/index.js');

describe('epfl-menu-api findMenu', function () {
  this.timeout(10000);

  it('should contains at least 5 menus', function () {
    return epflMenuApi.findMenu().then((menus) => {
      var enoughMenus = Object.keys(menus).length > 4;
      enoughMenus.should.equal(true);
    });
  });

  it('should fail with a wrong service url', (done) => {
    let epflMenuApiMock = rewire('../src/index.js');
    epflMenuApiMock.__set__('MENUS_URL', 'foobar');
    let result = epflMenuApiMock.findMenu();
    result.then((response) => {
      should.fail();
      done();
    }).catch((reason) => done());
  });
});
