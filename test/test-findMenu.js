/*
 * (c) William Belle, 2019.
 * See the LICENSE file for more details.
 */

const should = require('chai').should();
const rewire = require('rewire');

const epflMenuApi = require('../src/index.js');

describe('epfl-menu-api findMenu', function () {
  this.timeout(10000);

  it('should throw an exception with an invalid date', () => {
    return epflMenuApi.findMenu({
      date: '30/02/2019'
    }).then(() => {
    }).catch((err) => err.message.should.equal('Not a valid date'));
  });

  it('should throw an exception with a language not supported', () => {
    return epflMenuApi.findMenu({
      language: 'de'
    }).then(() => {
    }).catch((err) => err.message.should.equal('Language not supported'));
  });

  it('should throw an exception with a part of the day not supported', () => {
    return epflMenuApi.findMenu({
      'partOfDay': 'morning'
    }).then(() => {
    }).catch(
      (err) => err.message.should.equal('Part of the day not supported')
    );
  });

  it('should contains at least 5 menus', function () {
    return epflMenuApi.findMenu({
      date: '18/04/2019',
      restoId: '22',
      tags: 'Viande,Volaille,Pizza'
    }).then((menus) => {
      var enoughMenus = Object.keys(menus).length > 4;
      enoughMenus.should.equal(true);
    });
  });

  it('should parse menus of 07/05/2019', function () {
    return epflMenuApi.findMenu({
      date: '07/05/2019',
      language: 'fr'
    }).then((menus) => {
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
