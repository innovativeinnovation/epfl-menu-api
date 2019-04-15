/*
 * (c) William Belle, 2019.
 * See the LICENSE file for more details.
 */

require('chai').should();

const epflMenuApi = require('../src/index.js');

describe('epfl-menu-api findMenu', () => {
  it('should contains at least 5 menus', function () {
    return epflMenuApi.findMenu().then((menus) => {
      var enoughMenus = Object.keys(menus).length > 4;
      enoughMenus.should.equal(true);
    });
  });
});
