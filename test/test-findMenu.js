/*
 * (c) William Belle, 2019-2021.
 * See the LICENSE file for more details.
 */

const should = require('chai').should();
const rewire = require('rewire');

const epflMenuApi = require('../src/index.js');

describe('epfl-menu-api findMenu', function () {
  this.timeout(10000);

  it('should throw an exception with the date "30/02/2019"', () => {
    return epflMenuApi.findMenu({
      date: '30/02/2019'
    }).then(() => {
    }).catch((err) => err.message.should.equal('Not a valid date'));
  });

  it('should throw an exception with the language "de"', () => {
    return epflMenuApi.findMenu({
      language: 'de'
    }).then(() => {
    }).catch((err) => err.message.should.equal('Language not supported'));
  });

  it('should throw an exception with the part of the day "morning"', () => {
    return epflMenuApi.findMenu({
      partOfDay: 'morning'
    }).then(() => {
    }).catch(
      (err) => err.message.should.equal('Part of the day not supported')
    );
  });

  it('should throw an exception with the tag "Cheese"', () => {
    return epflMenuApi.findMenu({
      tags: 'Cheese'
    }).then(() => {
    }).catch(
      (err) => err.message.should.equal('Not a valid tags')
    );
  });

  it('should throw an exception with the restoId "Cafétéria BC"', () => {
    return epflMenuApi.findMenu({
      restoId: 'Cafétéria BC'
    }).then(() => {
    }).catch(
      (err) => err.message.should.equal('Not a valid restoId')
    );
  });

  it('should throw an exception with the restoId "999999"', () => {
    return epflMenuApi.findMenu({
      restoId: 999999
    }).then(() => {
    }).catch(
      (err) => err.message.should.equal('Not a valid restoId')
    );
  });

  it('should contains at least 5 menus on 16/08/2021', function () {
    return epflMenuApi.findMenu({
      date: '16/08/2021',
      tags: 'ViANde,Chicken,  Pizza '
    }).then((menus) => {
      const enoughMenus = Object.keys(menus).length > 4;
      enoughMenus.should.equal(true);
    });
  });

  it('should contains at least 1 menus on 16/08/2021', function () {
    return epflMenuApi.findMenu({
      date: '16/08/2021',
      restoId: 19,
      tags: 'Végétarien'
    }).then((menus) => {
      const enoughMenus = Object.keys(menus).length > 0;
      enoughMenus.should.equal(true);
    });
  });

  it('should parse menus of 16/08/2021', function () {
    return epflMenuApi.findMenu({
      date: '16/08/2021',
      language: 'fr'
    }).then((menus) => {
      const enoughMenus = Object.keys(menus).length > 4;
      enoughMenus.should.equal(true);
    });
  });

  it('should fail with a wrong service url', (done) => {
    const epflMenuApiMock = rewire('../src/index.js');
    epflMenuApiMock.__set__('MENUS_URL', 'foobar');
    const result = epflMenuApiMock.findMenu();
    result.then((response) => {
      should.fail();
      done();
    }).catch((reason) => done());
  });
});
