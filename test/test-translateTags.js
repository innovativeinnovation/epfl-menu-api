/*
 * (c) William Belle, 2019-2020.
 * See the LICENSE file for more details.
 */

require('chai').should();

const epflMenuApi = require('../src/index.js');

describe('epfl-menu-api translateTags', function () {
  this.timeout(10000);

  it('should throw an exception with undefined', function () {
    (function () {
      epflMenuApi.translateTags(undefined);
    }).should.throw('Not a valid tags');
  });

  it('should throw an exception with ""', function () {
    (function () {
      epflMenuApi.translateTags('');
    }).should.throw('Not a valid tags');
  });

  it('should translate tags "Poisson,Viande,Chinois,Toto"', function () {
    const tags = epflMenuApi.translateTags('Poisson,Viande,Chinois,Toto');
    tags.should.equal('Fish,Meat,Chinese,Toto');
  });
});
